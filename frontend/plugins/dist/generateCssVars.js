import convert from "color-convert";
import { transformSync } from "esbuild";
import { readFileSync, writeFile } from "fs";
import path from "path";
import prettier from "prettier";
const OUTPUT_DIR = path.resolve("src", "styles");
const UTILS_FILES = {
  colors: path.resolve("src", "utils", "colors.ts"),
  sizes: path.resolve("src", "utils", "sizes.ts")
};
const PRETTIER_CONFIG = JSON.parse(readFileSync(path.resolve(".prettierrc")).toString());
function extractColorComponents(colorString) {
  let matched;
  matched = colorString.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)?.slice(1)?.map((comp) => parseInt(comp, 10));
  if (matched) {
    return { r: matched[0], g: matched[1], b: matched[2] };
  }
  matched = colorString.match(/^hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\s*\)$/i)?.slice(1);
  if (matched) {
    matched.length = 3;
    const rgb = convert.hsl.rgb(matched.map((v, i) => i === 0 ? v : v.indexOf("%") > -1 ? parseInt(v) : parseFloat(v) * 100));
    return { r: rgb[0], g: rgb[1], b: rgb[2] };
  }
  matched = colorString.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)?.slice(1)?.map((comp) => parseInt(comp, 16));
  if (matched) {
    return { r: matched[0], g: matched[1], b: matched[2] };
  }
  matched = colorString.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)?.slice(1)?.map((comp) => 17 * parseInt(comp, 16));
  if (matched) {
    return { r: matched[0], g: matched[1], b: matched[2] };
  }
  throw new Error("No valid matching format found for provided colorString");
}
export default function generateCssVarsPlugin() {
  async function generateCssVars() {
    process.stdout.write("Generating css variables from provided ts assets");
    const { sizes } = await import("data:text/javascript;base64," + Buffer.from(transformSync(readFileSync(UTILS_FILES.sizes).toString("utf-8"), { loader: "ts" }).code).toString("base64"));
    const cssSizes = Object.entries(sizes).map(([name, val]) => `--size-${name}: ${val}px`).join("; ") + "; ";
    const { colors } = await import("data:text/javascript;base64," + Buffer.from(transformSync(readFileSync(UTILS_FILES.colors).toString("utf-8"), { loader: "ts" }).code).toString("base64"));
    const cssColors = Object.entries(colors).map(([group, shades]) => Object.entries(shades).map(([shade, def]) => `--color-${group}-${shade}: ${def}; --rgb-${group}-${shade}: ${Object.values(extractColorComponents(def)).join(", ")}`)).reduce((accumulated, current) => [...accumulated, ...current]).join("; ") + "; ";
    writeFile(path.resolve(OUTPUT_DIR, "vars.css"), prettier.format(`/*
 * \u26A0\uFE0F WARNING \u26A0\uFE0F
 *
 * This file was generated from the utils found at ./src/utils.
 * All changes added manually here will be lost on next execution of the generator script.
 * Last generated on: ${new Date()}
 *
 * \u26A0\uFE0F WARNING \u26A0\uFE0F
 */

					:root {
						${cssColors}
						${cssSizes}
					}
				`, { parser: "css", ...PRETTIER_CONFIG }), (err) => {
      if (err)
        return console.error("Error occured when trying to generate css vars file.", err);
    });
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write("Successfuly generated new css variables :)");
    process.stdout.write("\n");
  }
  return [
    {
      name: "generate-css-vars-dev",
      apply: "serve",
      configureServer(server) {
        async function listener(abspath) {
          if (Object.values(UTILS_FILES).includes(abspath)) {
            generateCssVars();
          }
        }
        server.watcher.on("add", listener);
        server.watcher.on("change", listener);
      }
    },
    {
      name: "generate-css-vars-build",
      apply: "build",
      async buildStart() {
        try {
          generateCssVars();
        } catch (error) {
          console.error("Error occured while trying to generate icons.", error);
        }
      }
    }
  ];
}
