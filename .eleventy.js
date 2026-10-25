// Eleventy 3.x configuration. Minimal, no JS bundling.
// Build output goes to _site/ which is the GitHub Pages publish root.
// Source layout:
//   src/                         page files (markdown + njk)
//   src/_layouts/                templates wrapping page content
//   src/_includes/               partials (header, footer, ...)
//   src/_data/site.json          site-wide variables (title, baseUrl, ...)
//   src/assets/                  static assets (CSS, images, fonts)

import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

// --- Path prefix -----------------------------------------------------------
// GitHub Pages serves this repo as a PROJECT site, i.e. under a subpath:
//   https://cndjc8b88t-debug.github.io/FlatSixDynamics/
// So every internal link/asset must be prefixed with "/FlatSixDynamics/".
//
// EleventyHtmlBasePlugin rewrites all root-absolute hrefs/srcs in the built
// HTML to include this prefix, and the {{ "/x/" | url }} filter is available
// in templates if you ever need it explicitly.
//
// Override at build time:  PATH_PREFIX="/FlatSixDynamics/" npm run build
// Local serve (root):      PATH_PREFIX="/" npm run serve
//
// Switching to a root custom domain (flatsixdynamics.com) later: just set
// PATH_PREFIX="/" (or drop the env var and change the default below to "/").
const PATH_PREFIX = process.env.PATH_PREFIX || "/";

export default function (eleventyConfig) {
    // Static passthrough — CSS, images, favicons go to _site untouched.
    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
    eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

    // Rewrites root-absolute links/assets in the HTML to honour pathPrefix.
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    // Date filter used in footer ("© 2026 ...").
    eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

    return {
        pathPrefix: PATH_PREFIX,
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "_layouts",
            data: "_data"
        },
        // Markdown gets the default njk pre-processing so we can use
        // {% block %} / {{ site.title }} inside .md files.
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: ["md", "njk", "html"]
    };
}
