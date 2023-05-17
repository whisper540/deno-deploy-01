import { Plugin } from "$fresh/server.ts";
import { virtualSheet } from "twind/sheets";

import { Options, setup, STYLE_ELEMENT_ID } from "./demo/shared.ts";
export type { Options };

export default function demo(options: Options): Plugin {
    const sheet = virtualSheet();
    setup(options, sheet);
    const main = `data:application/javascript,import hydrate from "${
        new URL("./demo/main.ts", import.meta.url).href
    }";
    import options from "${options.selfURL}";
    export default function(state) { hydrate(options, state); }
    `;
    return {
        name: "demo",
        entrypoints: { "main": main },
        render(ctx) {
            sheet.reset(undefined);
            const res = ctx.render();
            const cssTexts = [...sheet.target];
            const snapshot = sheet.reset();
            const scripts = [];
            let cssText: string;
            if (res.requiresHydration) {
                const precedences = snapshot[1] as number[];
                cssText = cssTexts.map((cssText, i) =>
                    `${cssText}/*${precedences[i].toString(36)}*/`
                ).join("\n");
                const mappings: (string | [string, string])[] = [];
                for (
                    const [key, value] of (snapshot[3] as Map<string, string>).entries()
                    ) {
                    if (key === value) {
                        mappings.push(key);
                    } else {
                        mappings.push([key, value]);
                    }
                }
                scripts.push({ entrypoint: "main", state: mappings });
            } else {
                cssText = cssTexts.join("\n");
            }
            return {
                scripts,
                styles: [{ cssText, id: STYLE_ELEMENT_ID }],
            };
        },
    };
}
