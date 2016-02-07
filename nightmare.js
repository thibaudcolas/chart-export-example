const nightmare = require('nightmare');
const vo = require('vo');
const fs = require('fs');
const dataUriToBuffer = require('data-uri-to-buffer');

const saveSvgAsPngPath = require.resolve('save-svg-as-png');

const config = {
    url: 'http://bl.ocks.org/mbostock/raw/7341714/',
    selector: '.chart',
};

const night = nightmare({ show: false });

vo(function*() {
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
        }, config.selector)
        .wait(() => window.dataURIs.png && window.dataURIs.svg);

    const dataURIs = yield night
        .evaluate(() => window.dataURIs)
        .end();

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
