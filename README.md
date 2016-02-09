chart-export-example
====================

> An example of using various Node tools to create an SVG / PNG export from a D3 SVG+CSS chart

/!\ The most effective approach has been packaged into a library, available at https://github.com/ThibWeb/export-svg-chart.

## Example export

http://bl.ocks.org/mbostock/raw/7341714/ becomes (PNG and SVG):

![Example export PNG](test-nightmare.png)

[SVG version](test-nightmare.svg)

## Relevant links

- https://github.com/exupero/saveSvgAsPng
- https://github.com/tmpvar/jsdom
- https://www.npmjs.com/package/svg2png
- https://github.com/segmentio/nightmare
- https://github.com/TooTallNate/node-data-uri-to-buffer
- https://github.com/Automattic/node-canvas
- http://fabricjs.com/
- https://www.smashingmagazine.com/2014/05/love-generating-svg-javascript-move-to-server/
- https://d3export.housegordon.org/

## With Nightmare / Electron

> TL;DR; More heavyweight than jsdom but works flawlessly. Uses http://www.chromium.org/developers/content-module.

- Point the browser to the page with the chart to export.
- Inject `saveSvgAsPng` onto the page.
- Get the SVG & PNG data URIs.

## With jsdom

>TL;DR; SVG exports work, PNG exports are more complicated.

- Getting the SVG data uri with `saveSvgAsPng` works.
- Getting the PNG data uri doesn't, because jsdom's implementation of images is just a stub at the moment.
- To circumvent that, it is possible to use `node-canvas`'s implementation, however it relies on Cairo, which doesn't support loading SVG files.
- This issue can apparently be overcome by using `fabric` (it has a SVG to canvas parser), however Fabric doesn't support Node 4+ yet (compilation errors). This means that it would be necessary to step back to jsdom 3. I haven't tried this yet.

Another option is to use something like `svg2png`, but this relies on `phantom`. It seems a bit weird to use both jsdom and phantom.

## Caveats

- The rendering is handled by [Electron](http://electron.atom.io/), if something isn't supported there isn't much to do about it.
- The chart to SVG & SVG to PNG features are handled by [saveSvgAsPng](https://github.com/exupero/saveSvgAsPng). This codebase is easier to contribute to.
- saveSvgAsPng doesn't support inlining of font face definitions ([yet](https://github.com/exupero/saveSvgAsPng/pull/29)).
- If the chart is styled with ancestor selectors that are outside of it, the selectors need to be re-mapped when they are inlined.
