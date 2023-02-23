// vite.config.ts
import { sveltekit } from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/@sveltejs+kit@1.8.3_svelte@3.55.1+vite@4.1.4/node_modules/@sveltejs/kit/src/exports/vite/index.js";

// src/plugins/themes/utils.ts
function themeNames(themes) {
  const names = Object.keys(themes);
  return Object.fromEntries(names.map((name) => [name, name]));
}

// src/lib/utils/themes.ts
var THEME_PALETTES = {
  light: {
    bg: {
      "000": "hsl(54, 20%, 100%)",
      100: "hsl(55, 20%, 97%)",
      300: "hsl(56, 18%, 94%)",
      500: "hsl(57, 15%, 90%)",
      700: "hsl(59, 12%, 86%)",
      900: "hsl(60, 11%, 81%)"
    },
    fg: {
      "000": "hsl(140, 6%, 27%)",
      100: "hsl(141, 7%, 22%)",
      300: "hsl(142, 8%, 17%)",
      500: "hsl(143, 9%, 12%)",
      700: "hsl(144, 10%, 7%)",
      900: "hsl(145, 0%, 1%)"
    },
    primary: {
      100: "hsl(145, 31%, 54%)",
      300: "hsl(146, 32%, 48%)",
      500: "hsl(147, 33%, 40%)",
      700: "hsl(148, 34%, 30%)",
      900: "hsl(149, 35%, 18%)"
      // 100: 'hsl(145, 55%, 75%)',
      // 300: 'hsl(146, 54%, 62%)',
      // 500: 'hsl(147, 53%, 50%)',
      // 700: 'hsl(148, 55%, 40%)',
      // 900: 'hsl(149, 56%, 29%)',
    },
    secondary: {
      100: "hsl(243, 86%, 81%)",
      300: "hsl(244, 83%, 77%)",
      500: "hsl(245, 77%, 72%)",
      700: "hsl(246, 74%, 66%)",
      900: "hsl(247, 66%, 58%)"
    },
    success: {
      100: "hsl(83, 71%, 74%)",
      300: "hsl(83, 72%, 68%)",
      500: "hsl(83, 73%, 60%)",
      700: "hsl(83, 74%, 49%)",
      900: "hsl(83, 80%, 44%)"
    },
    error: {
      100: "hsl(5, 90%, 78%)",
      300: "hsl(5, 85%, 70%)",
      500: "hsl(5, 80%, 62%)",
      700: "hsl(5, 74%, 54%)",
      900: "hsl(5, 70%, 46%)"
    }
  },
  dark: {
    bg: {
      "000": "hsl(200, 13%, 5%)",
      100: "hsl(199, 12%, 7%)",
      300: "hsl(198,11%, 9%)",
      500: "hsl(197,10%, 12%)",
      700: "hsl(196, 9%, 14%)",
      900: "hsl(195, 8%, 16%)"
    },
    fg: {
      "000": "hsl(60, 9%, 72%)",
      100: "hsl(59, 10%, 76%)",
      300: "hsl(57, 12%, 80%)",
      500: "hsl(56, 15%, 83%)",
      700: "hsl(55, 18%, 86%)",
      900: "hsl(54, 20%, 90%)"
    },
    primary: {
      100: "hsl(149, 35%, 18%)",
      300: "hsl(148, 34%, 30%)",
      500: "hsl(147, 33%, 40%)",
      700: "hsl(146, 34%, 48%)",
      900: "hsl(145, 36%, 54%)"
      // 100: 'hsl(149, 56%, 24%)',
      // 300: 'hsl(148, 55%, 30%)',
      // 500: 'hsl(147, 53%, 40%)',
      // 700: 'hsl(146, 54%, 52%)',
      // 900: 'hsl(145, 56%, 64%)',
    },
    secondary: {
      100: "hsl(247, 66%, 58%)",
      300: "hsl(246, 74%, 66%)",
      500: "hsl(245, 77%, 72%)",
      700: "hsl(244, 83%, 77%)",
      900: "hsl(243, 86%, 81%)"
    },
    success: {
      100: "hsl(83, 71%, 74%)",
      300: "hsl(83, 72%, 68%)",
      500: "hsl(83, 73%, 60%)",
      700: "hsl(83, 74%, 49%)",
      900: "hsl(83, 80%, 44%)"
    },
    error: {
      100: "hsl(5, 90%, 78%)",
      300: "hsl(5, 85%, 70%)",
      500: "hsl(5, 80%, 62%)",
      700: "hsl(5, 74%, 54%)",
      900: "hsl(5, 70%, 46%)"
      // 100: 'hsl(5, 66%, 50%)',
      // 300: 'hsl(4, 76%, 59%)',
      // 500: 'hsl(3, 84%, 66%)',
      // 700: 'hsl(3, 88%, 72%)',
      // 900: 'hsl(2, 90%, 78%)',
    }
  }
  // user: {
  // 	bg: {
  // 		'000': 'hsl(34, 10%, 98%)',
  // 		100: 'hsl(35, 11%, 96%)',
  // 		300: 'hsl(36, 12%, 93%)',
  // 		500: 'hsl(37, 13%, 89%)',
  // 		700: 'hsl(39, 14%, 85%)',
  // 		900: 'hsl(40, 15%, 80%)',
  // 	},
  // 	fg: {
  // 		'000': 'hsl(160, 12%, 7%)',
  // 		100: 'hsl(161, 14%, 8%)',
  // 		300: 'hsl(162,16%, 10%)',
  // 		500: 'hsl(163,18%, 12%)',
  // 		700: 'hsl(164, 19%, 14%)',
  // 		900: 'hsl(165, 20%, 16%)',
  // 	},
  // 	primary: {
  // 		100: 'hsl(138, 65%, 30%)',
  // 		300: 'hsl(137, 54%, 39%)',
  // 		500: 'hsl(136, 43%, 50%)',
  // 		700: 'hsl(136, 44%, 62%)',
  // 		900: 'hsl(137, 45%, 72%)',
  // 	},
  // 	secondary: {
  // 		100: 'hsl(247, 66%, 58%)',
  // 		300: 'hsl(246, 74%, 66%)',
  // 		500: 'hsl(245, 77%, 72%)',
  // 		700: 'hsl(244, 83%, 77%)',
  // 		900: 'hsl(243, 86%, 81%)',
  // 	},
  // 	success: {
  // 		100: 'hsl(83, 71%, 74%)',
  // 		300: 'hsl(83, 72%, 68%)',
  // 		500: 'hsl(83, 73%, 60%)',
  // 		700: 'hsl(83, 74%, 49%)',
  // 		900: 'hsl(83, 80%, 44%)',
  // 	},
  // 	error: {
  // 		100: 'hsl(2, 90%, 78%)',
  // 		300: 'hsl(3, 88%, 72%)',
  // 		500: 'hsl(3, 84%, 66%)',
  // 		700: 'hsl(4, 76%, 59%)',
  // 		900: 'hsl(5, 66%, 50%)',
  // 	},
  // },
};
var THEMES = themeNames(THEME_PALETTES);

// src/plugins/icons/index.ts
import { paramCase } from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/change-case@4.1.2/node_modules/change-case/dist/index.js";

// src/lib/utils/modifiers.ts
function debounce(f, timeout = 250) {
  let timer;
  let cache;
  function d(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cache = f(...args);
      return cache;
    }, timeout);
    return cache;
  }
  d.cancel = function() {
    clearTimeout(timer);
  };
  return d;
}

// src/plugins/icons/index.ts
import toPath from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/element-to-path@1.2.1/node_modules/element-to-path/dist/element-to-path.cjs.js";
import { readdirSync, readFileSync as readFileSync2, writeFile } from "fs";
import { extname, parse, resolve as resolve2 } from "path";
import prettier from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/prettier@2.8.4/node_modules/prettier/index.js";
import { svgPathProperties } from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/svg-path-properties@1.1.0/node_modules/svg-path-properties/dist/svg-path-properties.cjs.js";
import { parse as parseSvg } from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/svgson@5.2.1/node_modules/svgson/dist/svgson.cjs.js";

// src/plugins/common.ts
import { readFileSync } from "fs";
import { resolve } from "path";
var PRETTIER_CONFIG = JSON.parse(readFileSync(resolve(".prettierrc")).toString());

// src/plugins/icons/index.ts
var __vite_injected_original_dirname = "/Users/macbookpro/Documents/Dev/nplex/frontend/src/plugins/icons";
var __vite_injected_original_filename = "/Users/macbookpro/Documents/Dev/nplex/frontend/src/plugins/icons/index.ts";
var OUTPUT_FILE = resolve2("src", "lib", "utils", "icons.ts");
var SOURCE_DIR = resolve2(__vite_injected_original_dirname, "assets");
var COMMENT = `/*
* \u26A0\uFE0F WARNING \u26A0\uFE0F
*
* This file was generated by the icons vite-plugin. All changes added manually here will be lost on next iteration run of plugin's generators.
*
* Generated at: ${new Date()}
*
* \u26A0\uFE0F WARNING \u26A0\uFE0F
*/`;
function extractSvgPaths(svg) {
  const paths = [];
  if (["path", "rect", "line", "polyline", "polygon", "circle", "ellipse"].includes(svg.name)) {
    const d = svg.name === "path" ? svg.attributes.d : toPath(svg);
    const pathProps = new svgPathProperties(d);
    paths.push({
      d,
      type: svg.attributes.type ?? "primary",
      fill: !!svg.attributes.fill,
      stroke: !!svg.attributes.stroke,
      length: Math.ceil(pathProps.getTotalLength())
    });
  }
  if (svg.children.length) {
    for (const child of svg.children) {
      paths.push(...extractSvgPaths(child));
    }
  }
  return paths;
}
function plugin() {
  const writeIcons = debounce(async () => {
    try {
      const promises = readdirSync(SOURCE_DIR).filter((f) => extname(f).toLocaleLowerCase() === ".svg").map(async (fname) => {
        const svg = await parseSvg(readFileSync2(resolve2(SOURCE_DIR, fname)).toString());
        const name = paramCase(parse(fname).name);
        const { width, height, viewBox } = svg.attributes;
        const paths = extractSvgPaths(svg);
        return {
          name,
          width,
          height,
          viewBox,
          paths
        };
      });
      const parsed = (await Promise.all(promises)).reduce(
        (acc, { name, ...props }) => ({ ...acc, [name]: props }),
        {}
      );
      const statements = [COMMENT, `export const icons = ${JSON.stringify(parsed)}`];
      const formatted = prettier.format(statements.join("\n\n"), {
        parser: "typescript",
        ...PRETTIER_CONFIG
      });
      writeFile(OUTPUT_FILE, formatted, (error) => {
        if (error)
          throw error;
        else
          console.info("Successfully generated new icons from svg assets!");
      });
    } catch (error) {
      console.error("Error generating new icons", error);
    }
  }, 250);
  return {
    name: "nplex-icons",
    configureServer(server) {
      async function watch(abspath) {
        const isSvgIcon = abspath.startsWith(SOURCE_DIR) && extname(abspath).toLocaleLowerCase() === ".svg";
        if (isSvgIcon || abspath === __vite_injected_original_filename) {
          writeIcons();
        }
      }
      server.watcher.on("add", watch);
      server.watcher.on("change", watch);
    },
    buildStart: {
      async handler() {
        writeIcons();
      }
    }
  };
}

// src/plugins/themes/index.ts
import { colord } from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/colord@2.9.3/node_modules/colord/index.mjs";
import { writeFile as writeFile2 } from "fs";
import { resolve as resolve3 } from "path";
import prettier2 from "file:///Users/macbookpro/Documents/Dev/nplex/frontend/node_modules/.pnpm/prettier@2.8.4/node_modules/prettier/index.js";

// src/lib/utils/object.ts
function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function flatten(source) {
  return Object.entries(source).reduce((acc, [k, v]) => {
    if (isObject(v)) {
      return [
        ...acc,
        ...flatten(v).map(([k1, v1]) => {
          return [[k, ...k1], v1];
        })
      ];
    }
    return [...acc, [[k], v]];
  }, []);
}

// src/plugins/themes/index.ts
var OUTPUT_STYLES = resolve3("src", "lib", "styles", "themes.css");
var COMMENT2 = `/*
* \u26A0\uFE0F WARNING \u26A0\uFE0F
*
* This file was generated by the styles vite-plugin. All changes added manually here will be lost on next iteration run of plugin's generators.
*
* Generated at: ${new Date()}
*
* \u26A0\uFE0F WARNING \u26A0\uFE0F
*/`;
function fade(color) {
  const { r, g, b } = colord(color).toRgb();
  return `${r}, ${g}, ${b}`;
}
function vars(object, format) {
  return flatten(object).map(([keys, val]) => {
    const [k, v] = format(keys.join("-"), val);
    return `--${k}: ${v}`;
  }).join("; ");
}
function plugin2(themes) {
  function writeStyles() {
    try {
      const statements = [
        COMMENT2,
        ...Object.entries(themes).map(([t, c]) => {
          return `[data-theme="${t}"] {
						${vars(c, (k, v) => ["color-" + k, v])};
						${vars(c, (k, v) => ["rgb-" + k, fade(v + "")])};
					}`;
        })
      ];
      const formatted = prettier2.format(statements.join("\n\n"), {
        parser: "css",
        ...PRETTIER_CONFIG
      });
      writeFile2(OUTPUT_STYLES, formatted, (error) => {
        if (error)
          throw error;
        else
          console.info("Style themes globals generated successfully.");
      });
    } catch (error) {
      console.error("Error generating theme.", error);
    }
  }
  return {
    name: "nplex-themes",
    config() {
      writeStyles();
    },
    buildStart() {
      writeStyles();
    }
  };
}

// vite.config.ts
var config = {
  server: {
    port: process.env.PORT ? +process.env.PORT : 3e3
  },
  plugins: [plugin(), plugin2(THEME_PALETTES), , sveltekit()],
  ssr: {
    // https://github.com/airjp73/remix-validated-form/issues/141
    noExternal: ["zod-form-data"]
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3BsdWdpbnMvdGhlbWVzL3V0aWxzLnRzIiwgInNyYy9saWIvdXRpbHMvdGhlbWVzLnRzIiwgInNyYy9wbHVnaW5zL2ljb25zL2luZGV4LnRzIiwgInNyYy9saWIvdXRpbHMvbW9kaWZpZXJzLnRzIiwgInNyYy9wbHVnaW5zL2NvbW1vbi50cyIsICJzcmMvcGx1Z2lucy90aGVtZXMvaW5kZXgudHMiLCAic3JjL2xpYi91dGlscy9vYmplY3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjsvLyBAdHMtaWdub3JlOm5leHQtbGluZVxuaW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgVEhFTUVfUEFMRVRURVMgfSBmcm9tICcuL3NyYy9saWIvdXRpbHMvdGhlbWVzJztcbmltcG9ydCBpY29ucyBmcm9tICcuL3NyYy9wbHVnaW5zL2ljb25zJztcbmltcG9ydCB0aGVtZXMgZnJvbSAnLi9zcmMvcGx1Z2lucy90aGVtZXMnO1xuXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XG5cdHNlcnZlcjoge1xuXHRcdHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgPyArcHJvY2Vzcy5lbnYuUE9SVCA6IDMwMDAsXG5cdH0sXG5cdHBsdWdpbnM6IFtpY29ucygpLCB0aGVtZXMoVEhFTUVfUEFMRVRURVMpIC8qIGhvdWRpbmkoKSAqLywgLCBzdmVsdGVraXQoKV0sXG5cdHNzcjoge1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9haXJqcDczL3JlbWl4LXZhbGlkYXRlZC1mb3JtL2lzc3Vlcy8xNDFcblx0XHRub0V4dGVybmFsOiBbJ3pvZC1mb3JtLWRhdGEnXSxcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hY2Jvb2twcm8vRG9jdW1lbnRzL0Rldi9ucGxleC9mcm9udGVuZC9zcmMvcGx1Z2lucy90aGVtZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvc3JjL3BsdWdpbnMvdGhlbWVzL3V0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvc3JjL3BsdWdpbnMvdGhlbWVzL3V0aWxzLnRzXCI7dHlwZSBTaGFkZUtleTxUIGV4dGVuZHMgbnVtYmVyIHwgJzAwMCc+ID0gVCB8IGAke1R9YDtcblxuLyoqXG4gKiBEaWN0YXRlcyB0aGUgc2hhcGUgb2YgZXhoYXVzdGl2ZSBjb2xvciB0aGVtZSBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IHR5cGUgVGhlbWUgPSB7XG5cdFtuZXV0cmFsIGluICdiZycgfCAnZmcnXToge1xuXHRcdFtzaGFkZSBpbiBTaGFkZUtleTwnMDAwJyB8IDEwMCB8IDMwMCB8IDUwMCB8IDcwMCB8IDkwMD5dOiBzdHJpbmc7XG5cdH07XG59ICYge1xuXHRbY29sb3IgaW4gJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnc3VjY2VzcycgfCAnZXJyb3InXToge1xuXHRcdFtzaGFkZSBpbiBTaGFkZUtleTwxMDAgfCAzMDAgfCA1MDAgfCA3MDAgfCA5MDA+XTogc3RyaW5nO1xuXHR9O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gZW51bS1saWtlIG9iamVjdCB0byByZXRyaWV2ZSB0aGVtZSBuYW1lcyAoaS5lLiB0aGVtZXMnIHJlY29yZCBrZXlzKS4gVGhlIHRoZW1lc1xuICogYXJndW1lbnQgbXVzdCBiZSBhbiBgYXMgY29uc3RgIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRoZW1lTmFtZXM8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIFRoZW1lPj4odGhlbWVzOiBUKSB7XG5cdGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXModGhlbWVzKTtcblx0cmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhuYW1lcy5tYXAoKG5hbWUpID0+IFtuYW1lLCBuYW1lXSkpIGFzIHsgW0sgaW4ga2V5b2YgVF06IEsgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hY2Jvb2twcm8vRG9jdW1lbnRzL0Rldi9ucGxleC9mcm9udGVuZC9zcmMvbGliL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3NyYy9saWIvdXRpbHMvdGhlbWVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvc3JjL2xpYi91dGlscy90aGVtZXMudHNcIjsvLyBIZXJlIGltcG9ydHMgY2Fubm90IHVzZSBwYXRoIGFsaWFzIGFzIHRoZSBtb2R1bGUgaXMgaW1wb3J0ZWQgaW4gdml0ZS5jb25maWdcbmltcG9ydCB0eXBlIHsgVmFsdWVPZiB9IGZyb20gJ3RzLWVzc2VudGlhbHMnO1xuaW1wb3J0IHsgdGhlbWVOYW1lcywgdHlwZSBUaGVtZSB9IGZyb20gJy4uLy4uL3BsdWdpbnMvdGhlbWVzL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRIRU1FX1BBTEVUVEVTID0ge1xuXHRsaWdodDoge1xuXHRcdGJnOiB7XG5cdFx0XHQnMDAwJzogJ2hzbCg1NCwgMjAlLCAxMDAlKScsXG5cdFx0XHQxMDA6ICdoc2woNTUsIDIwJSwgOTclKScsXG5cdFx0XHQzMDA6ICdoc2woNTYsIDE4JSwgOTQlKScsXG5cdFx0XHQ1MDA6ICdoc2woNTcsIDE1JSwgOTAlKScsXG5cdFx0XHQ3MDA6ICdoc2woNTksIDEyJSwgODYlKScsXG5cdFx0XHQ5MDA6ICdoc2woNjAsIDExJSwgODElKScsXG5cdFx0fSxcblx0XHRmZzoge1xuXHRcdFx0JzAwMCc6ICdoc2woMTQwLCA2JSwgMjclKScsXG5cdFx0XHQxMDA6ICdoc2woMTQxLCA3JSwgMjIlKScsXG5cdFx0XHQzMDA6ICdoc2woMTQyLCA4JSwgMTclKScsXG5cdFx0XHQ1MDA6ICdoc2woMTQzLCA5JSwgMTIlKScsXG5cdFx0XHQ3MDA6ICdoc2woMTQ0LCAxMCUsIDclKScsXG5cdFx0XHQ5MDA6ICdoc2woMTQ1LCAwJSwgMSUpJyxcblx0XHR9LFxuXHRcdHByaW1hcnk6IHtcblx0XHRcdDEwMDogJ2hzbCgxNDUsIDMxJSwgNTQlKScsXG5cdFx0XHQzMDA6ICdoc2woMTQ2LCAzMiUsIDQ4JSknLFxuXHRcdFx0NTAwOiAnaHNsKDE0NywgMzMlLCA0MCUpJyxcblx0XHRcdDcwMDogJ2hzbCgxNDgsIDM0JSwgMzAlKScsXG5cdFx0XHQ5MDA6ICdoc2woMTQ5LCAzNSUsIDE4JSknLFxuXHRcdFx0Ly8gMTAwOiAnaHNsKDE0NSwgNTUlLCA3NSUpJyxcblx0XHRcdC8vIDMwMDogJ2hzbCgxNDYsIDU0JSwgNjIlKScsXG5cdFx0XHQvLyA1MDA6ICdoc2woMTQ3LCA1MyUsIDUwJSknLFxuXHRcdFx0Ly8gNzAwOiAnaHNsKDE0OCwgNTUlLCA0MCUpJyxcblx0XHRcdC8vIDkwMDogJ2hzbCgxNDksIDU2JSwgMjklKScsXG5cdFx0fSxcblx0XHRzZWNvbmRhcnk6IHtcblx0XHRcdDEwMDogJ2hzbCgyNDMsIDg2JSwgODElKScsXG5cdFx0XHQzMDA6ICdoc2woMjQ0LCA4MyUsIDc3JSknLFxuXHRcdFx0NTAwOiAnaHNsKDI0NSwgNzclLCA3MiUpJyxcblx0XHRcdDcwMDogJ2hzbCgyNDYsIDc0JSwgNjYlKScsXG5cdFx0XHQ5MDA6ICdoc2woMjQ3LCA2NiUsIDU4JSknLFxuXHRcdH0sXG5cdFx0c3VjY2Vzczoge1xuXHRcdFx0MTAwOiAnaHNsKDgzLCA3MSUsIDc0JSknLFxuXHRcdFx0MzAwOiAnaHNsKDgzLCA3MiUsIDY4JSknLFxuXHRcdFx0NTAwOiAnaHNsKDgzLCA3MyUsIDYwJSknLFxuXHRcdFx0NzAwOiAnaHNsKDgzLCA3NCUsIDQ5JSknLFxuXHRcdFx0OTAwOiAnaHNsKDgzLCA4MCUsIDQ0JSknLFxuXHRcdH0sXG5cdFx0ZXJyb3I6IHtcblx0XHRcdDEwMDogJ2hzbCg1LCA5MCUsIDc4JSknLFxuXHRcdFx0MzAwOiAnaHNsKDUsIDg1JSwgNzAlKScsXG5cdFx0XHQ1MDA6ICdoc2woNSwgODAlLCA2MiUpJyxcblx0XHRcdDcwMDogJ2hzbCg1LCA3NCUsIDU0JSknLFxuXHRcdFx0OTAwOiAnaHNsKDUsIDcwJSwgNDYlKScsXG5cdFx0fSxcblx0fSxcblx0ZGFyazoge1xuXHRcdGJnOiB7XG5cdFx0XHQnMDAwJzogJ2hzbCgyMDAsIDEzJSwgNSUpJyxcblx0XHRcdDEwMDogJ2hzbCgxOTksIDEyJSwgNyUpJyxcblx0XHRcdDMwMDogJ2hzbCgxOTgsMTElLCA5JSknLFxuXHRcdFx0NTAwOiAnaHNsKDE5NywxMCUsIDEyJSknLFxuXHRcdFx0NzAwOiAnaHNsKDE5NiwgOSUsIDE0JSknLFxuXHRcdFx0OTAwOiAnaHNsKDE5NSwgOCUsIDE2JSknLFxuXHRcdH0sXG5cdFx0Zmc6IHtcblx0XHRcdCcwMDAnOiAnaHNsKDYwLCA5JSwgNzIlKScsXG5cdFx0XHQxMDA6ICdoc2woNTksIDEwJSwgNzYlKScsXG5cdFx0XHQzMDA6ICdoc2woNTcsIDEyJSwgODAlKScsXG5cdFx0XHQ1MDA6ICdoc2woNTYsIDE1JSwgODMlKScsXG5cdFx0XHQ3MDA6ICdoc2woNTUsIDE4JSwgODYlKScsXG5cdFx0XHQ5MDA6ICdoc2woNTQsIDIwJSwgOTAlKScsXG5cdFx0fSxcblx0XHRwcmltYXJ5OiB7XG5cdFx0XHQxMDA6ICdoc2woMTQ5LCAzNSUsIDE4JSknLFxuXHRcdFx0MzAwOiAnaHNsKDE0OCwgMzQlLCAzMCUpJyxcblx0XHRcdDUwMDogJ2hzbCgxNDcsIDMzJSwgNDAlKScsXG5cdFx0XHQ3MDA6ICdoc2woMTQ2LCAzNCUsIDQ4JSknLFxuXHRcdFx0OTAwOiAnaHNsKDE0NSwgMzYlLCA1NCUpJyxcblx0XHRcdC8vIDEwMDogJ2hzbCgxNDksIDU2JSwgMjQlKScsXG5cdFx0XHQvLyAzMDA6ICdoc2woMTQ4LCA1NSUsIDMwJSknLFxuXHRcdFx0Ly8gNTAwOiAnaHNsKDE0NywgNTMlLCA0MCUpJyxcblx0XHRcdC8vIDcwMDogJ2hzbCgxNDYsIDU0JSwgNTIlKScsXG5cdFx0XHQvLyA5MDA6ICdoc2woMTQ1LCA1NiUsIDY0JSknLFxuXHRcdH0sXG5cdFx0c2Vjb25kYXJ5OiB7XG5cdFx0XHQxMDA6ICdoc2woMjQ3LCA2NiUsIDU4JSknLFxuXHRcdFx0MzAwOiAnaHNsKDI0NiwgNzQlLCA2NiUpJyxcblx0XHRcdDUwMDogJ2hzbCgyNDUsIDc3JSwgNzIlKScsXG5cdFx0XHQ3MDA6ICdoc2woMjQ0LCA4MyUsIDc3JSknLFxuXHRcdFx0OTAwOiAnaHNsKDI0MywgODYlLCA4MSUpJyxcblx0XHR9LFxuXHRcdHN1Y2Nlc3M6IHtcblx0XHRcdDEwMDogJ2hzbCg4MywgNzElLCA3NCUpJyxcblx0XHRcdDMwMDogJ2hzbCg4MywgNzIlLCA2OCUpJyxcblx0XHRcdDUwMDogJ2hzbCg4MywgNzMlLCA2MCUpJyxcblx0XHRcdDcwMDogJ2hzbCg4MywgNzQlLCA0OSUpJyxcblx0XHRcdDkwMDogJ2hzbCg4MywgODAlLCA0NCUpJyxcblx0XHR9LFxuXHRcdGVycm9yOiB7XG5cdFx0XHQxMDA6ICdoc2woNSwgOTAlLCA3OCUpJyxcblx0XHRcdDMwMDogJ2hzbCg1LCA4NSUsIDcwJSknLFxuXHRcdFx0NTAwOiAnaHNsKDUsIDgwJSwgNjIlKScsXG5cdFx0XHQ3MDA6ICdoc2woNSwgNzQlLCA1NCUpJyxcblx0XHRcdDkwMDogJ2hzbCg1LCA3MCUsIDQ2JSknLFxuXHRcdFx0Ly8gMTAwOiAnaHNsKDUsIDY2JSwgNTAlKScsXG5cdFx0XHQvLyAzMDA6ICdoc2woNCwgNzYlLCA1OSUpJyxcblx0XHRcdC8vIDUwMDogJ2hzbCgzLCA4NCUsIDY2JSknLFxuXHRcdFx0Ly8gNzAwOiAnaHNsKDMsIDg4JSwgNzIlKScsXG5cdFx0XHQvLyA5MDA6ICdoc2woMiwgOTAlLCA3OCUpJyxcblx0XHR9LFxuXHR9LFxuXHQvLyB1c2VyOiB7XG5cdC8vIFx0Ymc6IHtcblx0Ly8gXHRcdCcwMDAnOiAnaHNsKDM0LCAxMCUsIDk4JSknLFxuXHQvLyBcdFx0MTAwOiAnaHNsKDM1LCAxMSUsIDk2JSknLFxuXHQvLyBcdFx0MzAwOiAnaHNsKDM2LCAxMiUsIDkzJSknLFxuXHQvLyBcdFx0NTAwOiAnaHNsKDM3LCAxMyUsIDg5JSknLFxuXHQvLyBcdFx0NzAwOiAnaHNsKDM5LCAxNCUsIDg1JSknLFxuXHQvLyBcdFx0OTAwOiAnaHNsKDQwLCAxNSUsIDgwJSknLFxuXHQvLyBcdH0sXG5cdC8vIFx0Zmc6IHtcblx0Ly8gXHRcdCcwMDAnOiAnaHNsKDE2MCwgMTIlLCA3JSknLFxuXHQvLyBcdFx0MTAwOiAnaHNsKDE2MSwgMTQlLCA4JSknLFxuXHQvLyBcdFx0MzAwOiAnaHNsKDE2MiwxNiUsIDEwJSknLFxuXHQvLyBcdFx0NTAwOiAnaHNsKDE2MywxOCUsIDEyJSknLFxuXHQvLyBcdFx0NzAwOiAnaHNsKDE2NCwgMTklLCAxNCUpJyxcblx0Ly8gXHRcdDkwMDogJ2hzbCgxNjUsIDIwJSwgMTYlKScsXG5cdC8vIFx0fSxcblx0Ly8gXHRwcmltYXJ5OiB7XG5cdC8vIFx0XHQxMDA6ICdoc2woMTM4LCA2NSUsIDMwJSknLFxuXHQvLyBcdFx0MzAwOiAnaHNsKDEzNywgNTQlLCAzOSUpJyxcblx0Ly8gXHRcdDUwMDogJ2hzbCgxMzYsIDQzJSwgNTAlKScsXG5cdC8vIFx0XHQ3MDA6ICdoc2woMTM2LCA0NCUsIDYyJSknLFxuXHQvLyBcdFx0OTAwOiAnaHNsKDEzNywgNDUlLCA3MiUpJyxcblx0Ly8gXHR9LFxuXHQvLyBcdHNlY29uZGFyeToge1xuXHQvLyBcdFx0MTAwOiAnaHNsKDI0NywgNjYlLCA1OCUpJyxcblx0Ly8gXHRcdDMwMDogJ2hzbCgyNDYsIDc0JSwgNjYlKScsXG5cdC8vIFx0XHQ1MDA6ICdoc2woMjQ1LCA3NyUsIDcyJSknLFxuXHQvLyBcdFx0NzAwOiAnaHNsKDI0NCwgODMlLCA3NyUpJyxcblx0Ly8gXHRcdDkwMDogJ2hzbCgyNDMsIDg2JSwgODElKScsXG5cdC8vIFx0fSxcblx0Ly8gXHRzdWNjZXNzOiB7XG5cdC8vIFx0XHQxMDA6ICdoc2woODMsIDcxJSwgNzQlKScsXG5cdC8vIFx0XHQzMDA6ICdoc2woODMsIDcyJSwgNjglKScsXG5cdC8vIFx0XHQ1MDA6ICdoc2woODMsIDczJSwgNjAlKScsXG5cdC8vIFx0XHQ3MDA6ICdoc2woODMsIDc0JSwgNDklKScsXG5cdC8vIFx0XHQ5MDA6ICdoc2woODMsIDgwJSwgNDQlKScsXG5cdC8vIFx0fSxcblx0Ly8gXHRlcnJvcjoge1xuXHQvLyBcdFx0MTAwOiAnaHNsKDIsIDkwJSwgNzglKScsXG5cdC8vIFx0XHQzMDA6ICdoc2woMywgODglLCA3MiUpJyxcblx0Ly8gXHRcdDUwMDogJ2hzbCgzLCA4NCUsIDY2JSknLFxuXHQvLyBcdFx0NzAwOiAnaHNsKDQsIDc2JSwgNTklKScsXG5cdC8vIFx0XHQ5MDA6ICdoc2woNSwgNjYlLCA1MCUpJyxcblx0Ly8gXHR9LFxuXHQvLyB9LFxufSBhcyBjb25zdCBzYXRpc2ZpZXMgUmVjb3JkPHN0cmluZywgVGhlbWU+O1xuXG5leHBvcnQgY29uc3QgVEhFTUVTID0gdGhlbWVOYW1lcyhUSEVNRV9QQUxFVFRFUyk7XG5cbmV4cG9ydCB0eXBlIFRoZW1lTmFtZSA9IFZhbHVlT2Y8dHlwZW9mIFRIRU1FUz47XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvc3JjL3BsdWdpbnMvaWNvbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvc3JjL3BsdWdpbnMvaWNvbnMvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21hY2Jvb2twcm8vRG9jdW1lbnRzL0Rldi9ucGxleC9mcm9udGVuZC9zcmMvcGx1Z2lucy9pY29ucy9pbmRleC50c1wiO2ltcG9ydCB7IHBhcmFtQ2FzZSB9IGZyb20gJ2NoYW5nZS1jYXNlJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzL21vZGlmaWVycyc7XG4vLyBAdHMtaWdub3JlOm5leHQtbGluZVxuaW1wb3J0IHRvUGF0aCBmcm9tICdlbGVtZW50LXRvLXBhdGgnO1xuaW1wb3J0IHsgcmVhZGRpclN5bmMsIHJlYWRGaWxlU3luYywgd3JpdGVGaWxlIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgZXh0bmFtZSwgcGFyc2UsIHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBwcmV0dGllciBmcm9tICdwcmV0dGllcic7XG5pbXBvcnQgeyBzdmdQYXRoUHJvcGVydGllcyB9IGZyb20gJ3N2Zy1wYXRoLXByb3BlcnRpZXMnO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VTdmcsIHR5cGUgSU5vZGUgfSBmcm9tICdzdmdzb24nO1xuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IFBSRVRUSUVSX0NPTkZJRyB9IGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9VVFBVVF9GSUxFID0gcmVzb2x2ZSgnc3JjJywgJ2xpYicsICd1dGlscycsICdpY29ucy50cycpO1xuY29uc3QgU09VUkNFX0RJUiA9IHJlc29sdmUoX19kaXJuYW1lLCAnYXNzZXRzJyk7XG5jb25zdCBTVkdfUEFUSF9UWVBFUyA9IFsncHJpbWFyeScsICdzZWNvbmRhcnknXSBhcyBjb25zdDtcbmNvbnN0IENPTU1FTlQgPSBgLypcXG4qIFx1MjZBMFx1RkUwRiBXQVJOSU5HIFx1MjZBMFx1RkUwRlxcbipcXG4qIFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIGJ5IHRoZSBpY29ucyB2aXRlLXBsdWdpbi4gQWxsIGNoYW5nZXMgYWRkZWQgbWFudWFsbHkgaGVyZSB3aWxsIGJlIGxvc3Qgb24gbmV4dCBpdGVyYXRpb24gcnVuIG9mIHBsdWdpbidzIGdlbmVyYXRvcnMuXFxuKlxcbiogR2VuZXJhdGVkIGF0OiAke25ldyBEYXRlKCl9XFxuKlxcbiogXHUyNkEwXHVGRTBGIFdBUk5JTkcgXHUyNkEwXHVGRTBGXFxuKi9gO1xuXG4vKipcbiAqIFBhcnNlIGEgZ2l2ZW4gc3ZnJ3MgcGF0aHMgYW5kIHJldHVybiBpdCBub3JtYWxpemVkLCB3aGVyZSBldmVyeSBub24tcGF0aCBzdmcgZWxlbWVudCAocmVjdCxcbiAqIGNpcmNsZSwgZXRjLikgaXMgY29udmVydGVkIHRvIGEgcGF0aCwgcmV0dXJuZWQgYXMgYXJyYXlzIG9mIHN0cm9rZXMgYW5kIGZpbGxzIHBhdGhzJyBgZGBcbiAqIGF0dHJpYnV0ZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RTdmdQYXRocyhzdmc6IElOb2RlKSB7XG5cdGNvbnN0IHBhdGhzOiB7XG5cdFx0ZDogc3RyaW5nO1xuXHRcdHR5cGU6IGtleW9mIHR5cGVvZiBTVkdfUEFUSF9UWVBFUztcblx0XHRmaWxsOiBib29sZWFuO1xuXHRcdHN0cm9rZTogYm9vbGVhbjtcblx0XHRsZW5ndGg6IG51bWJlcjtcblx0fVtdID0gW107XG5cblx0aWYgKFsncGF0aCcsICdyZWN0JywgJ2xpbmUnLCAncG9seWxpbmUnLCAncG9seWdvbicsICdjaXJjbGUnLCAnZWxsaXBzZSddLmluY2x1ZGVzKHN2Zy5uYW1lKSkge1xuXHRcdGNvbnN0IGQgPSBzdmcubmFtZSA9PT0gJ3BhdGgnID8gc3ZnLmF0dHJpYnV0ZXMuZCA6IHRvUGF0aChzdmcpO1xuXHRcdGNvbnN0IHBhdGhQcm9wcyA9IG5ldyBzdmdQYXRoUHJvcGVydGllcyhkKTtcblx0XHRwYXRocy5wdXNoKHtcblx0XHRcdGQsXG5cdFx0XHR0eXBlOiAoc3ZnLmF0dHJpYnV0ZXMudHlwZSBhcyBrZXlvZiB0eXBlb2YgU1ZHX1BBVEhfVFlQRVMpID8/ICdwcmltYXJ5Jyxcblx0XHRcdGZpbGw6ICEhc3ZnLmF0dHJpYnV0ZXMuZmlsbCxcblx0XHRcdHN0cm9rZTogISFzdmcuYXR0cmlidXRlcy5zdHJva2UsXG5cdFx0XHRsZW5ndGg6IE1hdGguY2VpbChwYXRoUHJvcHMuZ2V0VG90YWxMZW5ndGgoKSksXG5cdFx0fSk7XG5cdH1cblx0aWYgKHN2Zy5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIHN2Zy5jaGlsZHJlbikge1xuXHRcdFx0cGF0aHMucHVzaCguLi5leHRyYWN0U3ZnUGF0aHMoY2hpbGQpKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHBhdGhzO1xufVxuXG4vKipcbiAqIFBsdWdpbiB0byBoYW5kbGUgYW5kIGF1dG9tYXRlIGdlbmVyYXRpb24gb2YgaWNvbnMnIHRzIGRlZmluaXRpb24gZnJvbSBzdmcgYXNzZXRzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbHVnaW4oKTogUGx1Z2luIHtcblx0Y29uc3Qgd3JpdGVJY29ucyA9IGRlYm91bmNlKGFzeW5jICgpID0+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcHJvbWlzZXMgPSByZWFkZGlyU3luYyhTT1VSQ0VfRElSKVxuXHRcdFx0XHQuZmlsdGVyKChmKSA9PiBleHRuYW1lKGYpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICcuc3ZnJylcblx0XHRcdFx0Lm1hcChhc3luYyAoZm5hbWUpID0+IHtcblx0XHRcdFx0XHRjb25zdCBzdmcgPSBhd2FpdCBwYXJzZVN2ZyhyZWFkRmlsZVN5bmMocmVzb2x2ZShTT1VSQ0VfRElSLCBmbmFtZSkpLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBwYXJhbUNhc2UocGFyc2UoZm5hbWUpLm5hbWUpO1xuXHRcdFx0XHRcdGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgdmlld0JveCB9ID0gc3ZnLmF0dHJpYnV0ZXM7XG5cdFx0XHRcdFx0Y29uc3QgcGF0aHMgPSBleHRyYWN0U3ZnUGF0aHMoc3ZnKTtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRcdHdpZHRoLFxuXHRcdFx0XHRcdFx0aGVpZ2h0LFxuXHRcdFx0XHRcdFx0dmlld0JveCxcblx0XHRcdFx0XHRcdHBhdGhzLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRjb25zdCBwYXJzZWQgPSAoYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpKS5yZWR1Y2UoXG5cdFx0XHRcdChhY2MsIHsgbmFtZSwgLi4ucHJvcHMgfSkgPT4gKHsgLi4uYWNjLCBbbmFtZV06IHByb3BzIH0pLFxuXHRcdFx0XHR7fVxuXHRcdFx0KTtcblxuXHRcdFx0Y29uc3Qgc3RhdGVtZW50cyA9IFtDT01NRU5ULCBgZXhwb3J0IGNvbnN0IGljb25zID0gJHtKU09OLnN0cmluZ2lmeShwYXJzZWQpfWBdO1xuXG5cdFx0XHRjb25zdCBmb3JtYXR0ZWQgPSBwcmV0dGllci5mb3JtYXQoc3RhdGVtZW50cy5qb2luKCdcXG5cXG4nKSwge1xuXHRcdFx0XHRwYXJzZXI6ICd0eXBlc2NyaXB0Jyxcblx0XHRcdFx0Li4uUFJFVFRJRVJfQ09ORklHLFxuXHRcdFx0fSk7XG5cblx0XHRcdHdyaXRlRmlsZShPVVRQVVRfRklMRSwgZm9ybWF0dGVkLCAoZXJyb3IpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblx0XHRcdFx0ZWxzZSBjb25zb2xlLmluZm8oJ1N1Y2Nlc3NmdWxseSBnZW5lcmF0ZWQgbmV3IGljb25zIGZyb20gc3ZnIGFzc2V0cyEnKTtcblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBnZW5lcmF0aW5nIG5ldyBpY29ucycsIGVycm9yKTtcblx0XHR9XG5cdH0sIDI1MCk7XG5cblx0cmV0dXJuIHtcblx0XHRuYW1lOiAnbnBsZXgtaWNvbnMnLFxuXHRcdGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcblx0XHRcdGFzeW5jIGZ1bmN0aW9uIHdhdGNoKGFic3BhdGg6IHN0cmluZykge1xuXHRcdFx0XHRjb25zdCBpc1N2Z0ljb24gPVxuXHRcdFx0XHRcdGFic3BhdGguc3RhcnRzV2l0aChTT1VSQ0VfRElSKSAmJiBleHRuYW1lKGFic3BhdGgpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09ICcuc3ZnJztcblx0XHRcdFx0aWYgKGlzU3ZnSWNvbiB8fCBhYnNwYXRoID09PSBfX2ZpbGVuYW1lKSB7XG5cdFx0XHRcdFx0d3JpdGVJY29ucygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXJ2ZXIud2F0Y2hlci5vbignYWRkJywgd2F0Y2gpO1xuXHRcdFx0c2VydmVyLndhdGNoZXIub24oJ2NoYW5nZScsIHdhdGNoKTtcblx0XHR9LFxuXHRcdGJ1aWxkU3RhcnQ6IHtcblx0XHRcdGFzeW5jIGhhbmRsZXIoKSB7XG5cdFx0XHRcdHdyaXRlSWNvbnMoKTtcblx0XHRcdH0sXG5cdFx0fSxcblx0fTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hY2Jvb2twcm8vRG9jdW1lbnRzL0Rldi9ucGxleC9mcm9udGVuZC9zcmMvbGliL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3NyYy9saWIvdXRpbHMvbW9kaWZpZXJzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvc3JjL2xpYi91dGlscy9tb2RpZmllcnMudHNcIjsvKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBkZWJvdW5jZSBwYXNzZWQgZnVuY3Rpb24ncyBleGVjdXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZTxBcmdzIGV4dGVuZHMgYW55W10sIEYgZXh0ZW5kcyAoLi4uYXJnczogQXJncykgPT4gYW55Pihcblx0ZjogRixcblx0dGltZW91dCA9IDI1MFxuKSB7XG5cdGxldCB0aW1lcjogYW55O1xuXHRsZXQgY2FjaGU6IFJldHVyblR5cGU8Rj47XG5cblx0ZnVuY3Rpb24gZCguLi5hcmdzOiBQYXJhbWV0ZXJzPEY+KSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHR0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0Y2FjaGUgPSBmKC4uLmFyZ3MpO1xuXHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdH0sIHRpbWVvdXQpO1xuXHRcdHJldHVybiBjYWNoZTtcblx0fVxuXG5cdGQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuXHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdH07XG5cblx0cmV0dXJuIGQ7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gd3JhcHBlciB0byB0aHJvdHRsZSB0aGUgcGFzc2VkIGZ1bmN0aW9uJ3MgZXhlY3V0aW9uIHJhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZTxBcmdzIGV4dGVuZHMgYW55W10sIEYgZXh0ZW5kcyAoLi4uYXJnczogQXJncykgPT4gUmV0dXJuVHlwZTxGPj4oXG5cdGY6IEYsXG5cdHRpbWVvdXQgPSAyNTBcbikge1xuXHRsZXQgdGltZXI6IGFueTtcblx0bGV0IGxhc3Q6IG51bWJlcjtcblx0bGV0IGNhY2hlOiBSZXR1cm5UeXBlPEY+O1xuXG5cdGZ1bmN0aW9uIHQoLi4uYXJnczogUGFyYW1ldGVyczxGPikge1xuXHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblx0XHRpZiAobGFzdCArIHRpbWVvdXQgPiBub3cpIHtcblx0XHRcdHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGNhY2hlID0gZiguLi5hcmdzKTtcblx0XHRcdFx0cmV0dXJuIGNhY2hlO1xuXHRcdFx0fSwgdGltZW91dCArIDEpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsYXN0ID0gbm93O1xuXHRcdFx0Y2FjaGUgPSBmKC4uLmFyZ3MpO1xuXHRcdH1cblx0XHRyZXR1cm4gY2FjaGU7XG5cdH1cblxuXHR0LmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHR9O1xuXG5cdHJldHVybiB0O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3NyYy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3NyYy9wbHVnaW5zL2NvbW1vbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3NyYy9wbHVnaW5zL2NvbW1vbi50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNvbnN0IFBSRVRUSUVSX0NPTkZJRyA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKHJlc29sdmUoJy5wcmV0dGllcnJjJykpLnRvU3RyaW5nKCkpO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3NyYy9wbHVnaW5zL3RoZW1lc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21hY2Jvb2twcm8vRG9jdW1lbnRzL0Rldi9ucGxleC9mcm9udGVuZC9zcmMvcGx1Z2lucy90aGVtZXMvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21hY2Jvb2twcm8vRG9jdW1lbnRzL0Rldi9ucGxleC9mcm9udGVuZC9zcmMvcGx1Z2lucy90aGVtZXMvaW5kZXgudHNcIjtpbXBvcnQgeyBjb2xvcmQgfSBmcm9tICdjb2xvcmQnO1xuaW1wb3J0IHsgd3JpdGVGaWxlIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHByZXR0aWVyIGZyb20gJ3ByZXR0aWVyJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBmbGF0dGVuIH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzL29iamVjdCc7XG5pbXBvcnQgeyBQUkVUVElFUl9DT05GSUcgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHR5cGUgeyBUaGVtZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBPVVRQVVRfU1RZTEVTID0gcmVzb2x2ZSgnc3JjJywgJ2xpYicsICdzdHlsZXMnLCAndGhlbWVzLmNzcycpO1xuY29uc3QgQ09NTUVOVCA9IGAvKlxcbiogXHUyNkEwXHVGRTBGIFdBUk5JTkcgXHUyNkEwXHVGRTBGXFxuKlxcbiogVGhpcyBmaWxlIHdhcyBnZW5lcmF0ZWQgYnkgdGhlIHN0eWxlcyB2aXRlLXBsdWdpbi4gQWxsIGNoYW5nZXMgYWRkZWQgbWFudWFsbHkgaGVyZSB3aWxsIGJlIGxvc3Qgb24gbmV4dCBpdGVyYXRpb24gcnVuIG9mIHBsdWdpbidzIGdlbmVyYXRvcnMuXFxuKlxcbiogR2VuZXJhdGVkIGF0OiAke25ldyBEYXRlKCl9XFxuKlxcbiogXHUyNkEwXHVGRTBGIFdBUk5JTkcgXHUyNkEwXHVGRTBGXFxuKi9gO1xuXG4vKipcbiAqIEdlbmVyYXRlIGZhZGVhYmxlIHJnYiBjb21wb25lbnRzIGZvciBhIGNvbG9yLlxuICovXG5mdW5jdGlvbiBmYWRlKGNvbG9yOiBzdHJpbmcpIHtcblx0Y29uc3QgeyByLCBnLCBiIH0gPSBjb2xvcmQoY29sb3IpLnRvUmdiKCk7XG5cdHJldHVybiBgJHtyfSwgJHtnfSwgJHtifWA7XG59XG5cbi8qKlxuICogQ29tcG9zZSBjc3MgY3VzdG9tIHByb3BlcnRpZXMuXG4gKi9cbmZ1bmN0aW9uIHZhcnMoXG5cdG9iamVjdDogb2JqZWN0LFxuXHRmb3JtYXQ6IChrOiBzdHJpbmcsIHY6IHN0cmluZyB8IG51bWJlcikgPT4gW2s6IHN0cmluZywgdjogc3RyaW5nIHwgbnVtYmVyXVxuKSB7XG5cdHJldHVybiBmbGF0dGVuKG9iamVjdClcblx0XHQubWFwKChba2V5cywgdmFsXSkgPT4ge1xuXHRcdFx0Y29uc3QgW2ssIHZdID0gZm9ybWF0KGtleXMuam9pbignLScpLCB2YWwpO1xuXHRcdFx0cmV0dXJuIGAtLSR7a306ICR7dn1gO1xuXHRcdH0pXG5cdFx0LmpvaW4oJzsgJyk7XG59XG5cbi8qKlxuICogUHJlcHJvY2VzcyBhIGdpdmVuIHJlY29yZCBvZiB0aGVtZXMgYW5kIG91dHB1dCB0aGUgY29ycmVzcG9uZGluZyBjc3MgdmFyaWFibGVzIGRlY2xhcmF0aW9uIGludG8gYVxuICogZ2xvYmFsIHN0eWxlIGZpbGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsdWdpbih0aGVtZXM6IFJlY29yZDxzdHJpbmcsIFRoZW1lPik6IFBsdWdpbiB7XG5cdGZ1bmN0aW9uIHdyaXRlU3R5bGVzKCkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBzdGF0ZW1lbnRzID0gW1xuXHRcdFx0XHRDT01NRU5ULFxuXHRcdFx0XHQuLi5PYmplY3QuZW50cmllcyh0aGVtZXMpLm1hcCgoW3QsIGNdKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIGBbZGF0YS10aGVtZT1cIiR7dH1cIl0ge1xuXHRcdFx0XHRcdFx0JHt2YXJzKGMsIChrLCB2KSA9PiBbJ2NvbG9yLScgKyBrLCB2XSl9O1xuXHRcdFx0XHRcdFx0JHt2YXJzKGMsIChrLCB2KSA9PiBbJ3JnYi0nICsgaywgZmFkZSh2ICsgJycpXSl9O1xuXHRcdFx0XHRcdH1gO1xuXHRcdFx0XHR9KSxcblx0XHRcdF07XG5cblx0XHRcdGNvbnN0IGZvcm1hdHRlZCA9IHByZXR0aWVyLmZvcm1hdChzdGF0ZW1lbnRzLmpvaW4oJ1xcblxcbicpLCB7XG5cdFx0XHRcdHBhcnNlcjogJ2NzcycsXG5cdFx0XHRcdC4uLlBSRVRUSUVSX0NPTkZJRyxcblx0XHRcdH0pO1xuXG5cdFx0XHR3cml0ZUZpbGUoT1VUUFVUX1NUWUxFUywgZm9ybWF0dGVkLCAoZXJyb3IpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcblx0XHRcdFx0ZWxzZSBjb25zb2xlLmluZm8oJ1N0eWxlIHRoZW1lcyBnbG9iYWxzIGdlbmVyYXRlZCBzdWNjZXNzZnVsbHkuJyk7XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgZ2VuZXJhdGluZyB0aGVtZS4nLCBlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRuYW1lOiAnbnBsZXgtdGhlbWVzJyxcblx0XHRjb25maWcoKSB7XG5cdFx0XHR3cml0ZVN0eWxlcygpO1xuXHRcdH0sXG5cdFx0YnVpbGRTdGFydCgpIHtcblx0XHRcdHdyaXRlU3R5bGVzKCk7XG5cdFx0fSxcblx0fTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hY2Jvb2twcm8vRG9jdW1lbnRzL0Rldi9ucGxleC9mcm9udGVuZC9zcmMvbGliL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFjYm9va3Byby9Eb2N1bWVudHMvRGV2L25wbGV4L2Zyb250ZW5kL3NyYy9saWIvdXRpbHMvb2JqZWN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWNib29rcHJvL0RvY3VtZW50cy9EZXYvbnBsZXgvZnJvbnRlbmQvc3JjL2xpYi91dGlscy9vYmplY3QudHNcIjtpbXBvcnQgdHlwZSB7IEFueVJlY29yZCB9IGZyb20gJyR0eXBlcy91dGlscyc7XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Q8VD4odmFsdWU6IFQpOiB2YWx1ZSBpcyBBbnlSZWNvcmQge1xuXHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlcyBhIGZvcm0gZGF0YSBpbnRvIGFuIG9iamVjdCB3aXRoIEpTT04ucGFyc2UnZCBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0RnJvbUZvcm1EYXRhPFQgZXh0ZW5kcyB7fSA9IGFueT4oZm9ybURhdGE6IEZvcm1EYXRhKSB7XG5cdHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0Wy4uLmZvcm1EYXRhLmVudHJpZXMoKV0ubWFwKChbaywgdl0pID0+IFtrLCB0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHYpIDogdl0pXG5cdCkgYXMgVDtcbn1cblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGV4cGVjdGluZyBhbiBvYmplY3QgYW5kIHJldHVybmluZyBhbiBhcnJheSBvZiBmbGF0dGVuZWQga2V5cyBhbmQgdGhlaXIgcGF0aC1lbmRcbiAqIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihzb3VyY2U6IFJlY29yZDxzdHJpbmcgfCBudW1iZXIsIGFueT4pOiBGbGF0dGVuZWQge1xuXHRyZXR1cm4gT2JqZWN0LmVudHJpZXMoc291cmNlKS5yZWR1Y2U8RmxhdHRlbmVkPigoYWNjLCBbaywgdl0pID0+IHtcblx0XHRpZiAoaXNPYmplY3QodikpIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdC4uLmFjYyxcblx0XHRcdFx0Li4uZmxhdHRlbih2KS5tYXAoKFtrMSwgdjFdKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIFtbaywgLi4uazFdLCB2MV0gYXMgRmxhdHRlbmVkW251bWJlcl07XG5cdFx0XHRcdH0pLFxuXHRcdFx0XTtcblx0XHR9XG5cdFx0cmV0dXJuIFsuLi5hY2MsIFtba10sIHZdXTtcblx0fSwgW10pO1xufVxudHlwZSBGbGF0dGVuZWQgPSBba2V5czogc3RyaW5nW10sIHZhbHVlOiBzdHJpbmcgfCBudW1iZXJdW107XG5cbi8vIC8qKlxuLy8gICogSGVscGVyIHRvIGRlZXAgbWVyZ2Ugb2JqZWN0cyBhbmQgb3ZlcmNvbWUgYE9iamVjdC5hc3NpZ25gIG9yIGB7Li4uYSwgLi4uYn1gIGlnbm9yaW5nIG5lc3RlZCBvYmplY3RzLiAqKlRvIGF2b2lkXG4vLyAgKiBhZmZlY3RpbmcgdGhlIG9yaWdpbmFsIGBiYXNlYCBvYmplY3QsIHNpbXBseSBwYXNzIGl0IGFzIGEgZGVzdHJ1Y3R1cmVkIGFzc2lnbm1lbnQ6IGB7Li4uYmFzZX1gKipcbi8vICAqXG4vLyAgKiBAcGFyYW0gYmFzZSBSZWZlcmVuY2Ugb2JqZWN0IHVzZWQgZm9yIHRoZSBiYXNlIHZhbHVlcy5cbi8vICAqIEBwYXJhbSBtb2RpZmljYXRpb25zIE1vZGlmaWNhdGlvbiBvYmplY3RzIHRvIGFwcGx5IG9uIHRvcCBvZiB0aGUgYmFzZS4gTW9kaWZpY2F0aW9ucyBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC5cbi8vICAqIEByZXR1cm5zIE1lcmdlZCBvYmplY3Qgb2YgdGhlIGJhc2Ugd2l0aCB0aGUgYXBwbGllZCBtb2RpZmljYXRpb25zLlxuLy8gICovXG4vLyBleHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmplY3RzPFQ+KGJhc2U6IFJlY29yZDxrZXlvZiBULCBhbnk+LCAuLi5tb2RpZmljYXRpb25zOiBSZWNvcmQ8YW55LCBhbnk+W10pIHtcbi8vIFx0aWYgKCFtb2RpZmljYXRpb25zKSB7XG4vLyBcdFx0cmV0dXJuIGJhc2U7XG4vLyBcdH1cbi8vIFx0Y29uc3QgbW9kaWYgPSBtb2RpZmljYXRpb25zLnNoaWZ0KCk7XG4vLyBcdGlmIChpc09iamVjdChiYXNlKSAmJiBpc09iamVjdChtb2RpZikpIHtcbi8vIFx0XHRmb3IgKGNvbnN0IGtleSBpbiBtb2RpZikge1xuLy8gXHRcdFx0aWYgKGlzT2JqZWN0KG1vZGlmW2tleV0pKSB7XG4vLyBcdFx0XHRcdGlmICghaXNPYmplY3QoYmFzZVtrZXldKSkge1xuLy8gXHRcdFx0XHRcdGJhc2Vba2V5XSA9IHt9O1xuLy8gXHRcdFx0XHR9XG4vLyBcdFx0XHRcdG1lcmdlT2JqZWN0cyhiYXNlW2tleV0sIG1vZGlmW2tleV0pO1xuLy8gXHRcdFx0fSBlbHNlIHtcbi8vIFx0XHRcdFx0YmFzZVtrZXldID0gbW9kaWZba2V5XTtcbi8vIFx0XHRcdH1cbi8vIFx0XHR9XG4vLyBcdH1cbi8vIFx0cmV0dXJuIGJhc2U7XG4vLyB9XG5cbi8qKlxuICogUmVtb3ZlIGtleXMgd2l0aCB2YWx1ZXMgZXF1YWwgdG8gbnVsbCwgJycsIG9yIHVuZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0gb2JqIE9iamVjdCB0byBiZSBjbGVhbmVkLlxuICogQHJldHVybnMgT2JqZWN0IHN0cmlwcGVkIG9mIGtleXMgd2l0aCBlbXB0eSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFbXB0eVByb3BzPFQgZXh0ZW5kcyBSZWNvcmQ8a2V5b2YgVCwgYW55Pj4ob2JqOiBUKTogUGFydGlhbDxUPiB7XG5cdHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0T2JqZWN0LmVudHJpZXMob2JqKVxuXHRcdFx0LmZpbHRlcigoW2ssIHZdKSA9PiB2ICE9PSBudWxsIHx8IHYgIT09ICcnIHx8IHYgIT09IHVuZGVmaW5lZClcblx0XHRcdC5tYXAoKFtrLCB2XSkgPT4gW1xuXHRcdFx0XHRrLFxuXHRcdFx0XHR0eXBlb2YgdiA9PT0gJ29iamVjdCcgPyByZW1vdmVFbXB0eVByb3BzKHYgYXMgUmVjb3JkPHN0cmluZyB8IG51bWJlciwgdW5rbm93bj4pIDogdixcblx0XHRcdF0pXG5cdCkgYXMgUGFydGlhbDxUPjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGlCQUFpQjs7O0FDa0JuQixTQUFTLFdBQTRDLFFBQVc7QUFDdEUsUUFBTSxRQUFRLE9BQU8sS0FBSyxNQUFNO0FBQ2hDLFNBQU8sT0FBTyxZQUFZLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0FBQzVEOzs7QUNsQk8sSUFBTSxpQkFBaUI7QUFBQSxFQUM3QixPQUFPO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDTjtBQUFBLElBQ0EsSUFBSTtBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ047QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNTjtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1YsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ047QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNOO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDTjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNMLElBQUk7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNOO0FBQUEsSUFDQSxJQUFJO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDTjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1IsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBO0FBQUE7QUFBQTtB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WUFBSTtBQUFPLGdCQUFNO0FBQUE7QUFDWixrQkFBUSxLQUFLLDhDQUE4QztBQUFBLE1BQ2pFLENBQUM7QUFBQSxJQUNGLFNBQVMsT0FBUDtBQUNELGNBQVEsTUFBTSwyQkFBMkIsS0FBSztBQUFBLElBQy9DO0FBQUEsRUFDRDtBQUVBLFNBQU87QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFDUixrQkFBWTtBQUFBLElBQ2I7QUFBQSxJQUNBLGFBQWE7QUFDWixrQkFBWTtBQUFBLElBQ2I7QUFBQSxFQUNEO0FBQ0Q7OztBTnBFQSxJQUFNLFNBQXFCO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ1AsTUFBTSxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPO0FBQUEsRUFDOUM7QUFBQSxFQUNBLFNBQVMsQ0FBQyxPQUFNLEdBQUdDLFFBQU8sY0FBYyxHQUFtQixFQUFFLFVBQVUsQ0FBQztBQUFBLEVBQ3hFLEtBQUs7QUFBQTtBQUFBLElBRUosWUFBWSxDQUFDLGVBQWU7QUFBQSxFQUM3QjtBQUNEO0FBRUEsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFsicmVhZEZpbGVTeW5jIiwgInJlc29sdmUiLCAicmVzb2x2ZSIsICJyZWFkRmlsZVN5bmMiLCAicmVzb2x2ZSIsICJ3cml0ZUZpbGUiLCAicmVzb2x2ZSIsICJwcmV0dGllciIsICJyZXNvbHZlIiwgIkNPTU1FTlQiLCAicGx1Z2luIiwgInByZXR0aWVyIiwgIndyaXRlRmlsZSIsICJwbHVnaW4iXQp9Cg==
