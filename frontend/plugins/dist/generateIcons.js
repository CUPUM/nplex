import toPath from "element-to-path";
import { readdirSync, readFileSync, writeFile } from "fs";
import path from "path";
import prettier from "prettier";
import { parse } from "svgson";
const ICONS_DIR = path.resolve("src", "utils", "icons", "svgs");
const OUTPUT_DIR = path.resolve("src", "utils", "icons");
const PRETTIER_CONFIG = JSON.parse(readFileSync(path.resolve(".prettierrc")).toString());
const PATH_TYPES = ["primary", "secondary"];
async function extractSvgPaths(svg) {
  const strokes = [];
  const fills = [];
  if (["path", "rect", "line", "polyline", "polygon", "circle", "ellipse"].includes(svg.name)) {
    const d = svg.name === "path" ? svg.attributes.d : toPath(svg);
    if (svg.attributes.stroke) {
      strokes.push({ d, type: svg.attributes.type || PATH_TYPES[0] });
    } else if (svg.attributes.fill) {
      fills.push({ d, type: svg.attributes.type || PATH_TYPES[0] });
    }
  }
  if (svg.children.length) {
    for await (const child of svg.children) {
      const childPaths = await extractSvgPaths(child);
      strokes.push(...childPaths.strokes);
      fills.push(...childPaths.fills);
    }
  }
  return { strokes, fills };
}
export default function generateIconsPlugin() {
  async function generateIcons() {
    process.stdout.write("Generating icons' definition from provided svg assets...");
    const promises = readdirSync(ICONS_DIR).filter((f) => path.extname(f).toLocaleLowerCase() === ".svg").map(async (file) => {
      const svg = await parse(readFileSync(path.resolve(ICONS_DIR, file)).toString());
      const name = path.parse(file).name.replace(/\s/g, "-");
      const { width, height, viewBox } = svg.attributes;
      const { strokes, fills } = await extractSvgPaths(svg);
      return {
        name,
        width,
        height,
        viewBox,
        strokes,
        fills
      };
    });
    Promise.all(promises).then((arr) => {
      const iconsDefinitions = arr.reduce((acc, { name, ...props }) => ({ ...acc, [name]: props }), {});
      writeFile(path.resolve(OUTPUT_DIR, "icons.ts"), prettier.format(`/**
						* \u26A0\uFE0F WARNING \u26A0\uFE0F
						*
						* This file was generated from the svg assets found at ./src/utils/icons.
						* All changes added manually here will be lost on next execution of the generator script
						* 
						* Last generated on: ${new Date()}
						*
						* \u26A0\uFE0F WARNING \u26A0\uFE0F
						*/
						export const icons = ${JSON.stringify(iconsDefinitions)}
					`, { parser: "babel-ts", ...PRETTIER_CONFIG }), (err) => {
        if (err)
          return console.error("Error occured when trying to generate icons' definition.", err);
      });
    });
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write("Successfuly generated new icons' definition :)");
    process.stdout.write("\n");
  }
  return [
    {
      name: "generate-icons-dev",
      apply: "serve",
      configureServer(server) {
        async function listener(abspath) {
          if (abspath.startsWith(path.resolve("src", "utils", "icons")) && path.extname(abspath).toLocaleLowerCase() === ".svg") {
            generateIcons();
          }
        }
        server.watcher.on("add", listener);
        server.watcher.on("change", listener);
      }
    },
    {
      name: "generate-icons-build",
      apply: "build",
      async buildStart() {
        try {
          generateIcons();
        } catch (error) {
          console.error("Error occured while trying to generate icons.", error);
        }
      }
    }
  ];
}
