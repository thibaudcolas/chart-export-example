chart-export-example
====================

> An example of using various Node tools to create an SVG / PNG export from a D3 SVG+CSS chart

## Example export

http://bl.ocks.org/mbostock/raw/7341714/ becomes:

![Example export](test-nightmare.png)

## Relevant links

- https://github.com/exupero/saveSvgAsPng
- https://github.com/tmpvar/jsdom
- https://www.npmjs.com/package/svg2png
- https://github.com/segmentio/nightmare
- https://github.com/TooTallNate/node-data-uri-to-buffer
- https://github.com/Automattic/node-canvas
- http://fabricjs.com/
- https://www.smashingmagazine.com/2014/05/love-generating-svg-javascript-move-to-server/

## Last findings

## With jsdom

>TL;DR; SVG exports work, PNG exports are more complicated.

- Getting the SVG data uri with `saveSvgAsPng` works.
- Getting the PNG data uri doesn't, because jsdom's implementation of images is just a stub at the moment.
- To circumvent that, it is possible to use `node-canvas`'s implementation, however it relies on Cairo, which doesn't support loading SVG files.
- This issue can apparently be overcome by using `fabric` (it has a SVG to canvas parser), however Fabric doesn't support Node 4+ yet (compilation errors). This means that it would be necessary to step back to jsdom 3. I haven't tried this yet.

Another option is to use something like `svg2png`, but this relies on `phantom`. It seems a bit weird to use both jsdom and phantom.

## With Nightmare / Electron

- Client-side: saveSvgAsPng, except IE (https://github.com/Quartz/Chartbuilder/blob/master/src/js/components/ChartExport.jsx)
- Server-side: Electron (Nightmare) + saveSvgAsPng? Client-side code + Nightmare one-liner to trigger generation & retrieve URI
