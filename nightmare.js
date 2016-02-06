const nightmare = require('nightmare');
const vo = require('vo');
const fs = require('fs');
const dataUriToBuffer = require('data-uri-to-buffer');

vo(function*() {
    const night = nightmare({ show: false });
    const saveSvgAsPngPath = require.resolve('save-svg-as-png');

    yield night
        .goto('http://bl.ocks.org/mbostock/raw/7341714/')
        .inject('js', saveSvgAsPngPath)
        .wait('.chart g')
        .evaluate(() => {
            const chart = document.querySelector('.chart');

            window.dataURIs = {};

            window.svgAsPngUri(chart, {}, (uri) => window.dataURIs.png = uri);
            window.svgAsDataUri(chart, {}, (uri) => window.dataURIs.svg = uri);
        });

    const dataURIs = yield night
        .wait(() => window.dataURIs.png && window.dataURIs.svg, 100)
        .evaluate(() => window.dataURIs);

    yield night.end();

    return dataURIs;
})((err, dataURIs) => {
    if (err) return console.log(err);

    const buffers = {
        svg: dataUriToBuffer(dataURIs.svg),
        png: dataUriToBuffer(dataURIs.png),
    };

    fs.writeFile('test-nightmare.svg', buffers.svg, () => console.log('wrote test-nightmare.svg'));
    fs.writeFile('test-nightmare.png', buffers.png, () => console.log('wrote test-nightmare.png'));
});
