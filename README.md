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

- Client-side: saveSvgAsPng, except IE (https://github.com/Quartz/Chartbuilder/blob/master/src/js/components/ChartExport.jsx)
- Server-side: Electron (Nightmare) + saveSvgAsPng? Client-side code + Nightmare one-liner to trigger generation & retrieve URI
