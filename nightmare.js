const nightmare = require('nightmare');
const vo = require('vo');
const fs = require('fs');
const dataUriToBuffer = require('data-uri-to-buffer');

const config = {
    url: 'http://bl.ocks.org/mbostock/raw/7341714/',
    selector: '.chart',
};

vo(function*() {
    const night = nightmare({ show: false });
    const saveSvgAsPngPath = require.resolve('save-svg-as-png');

    yield night
        .goto(config.url)
        .inject('js', saveSvgAsPngPath)
        .wait((selector) => {
            const chart = document.querySelector(selector);

            return chart && chart.innerHTML;
        }, config.selector)
        .evaluate((selector) => {
            const chart = document.querySelector(selector);

            window.dataURIs = {};

            window.svgAsPngUri(chart, {}, uri => window.dataURIs.png = uri);
            window.svgAsDataUri(chart, {}, uri => window.dataURIs.svg = uri);
        }, config.selector);

    const dataURIs = yield night
        .wait(() => window.dataURIs.png && window.dataURIs.svg)
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
