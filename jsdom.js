var fs = require('fs');
var jsdom = require('jsdom');
var saveSvgAsPng = require('save-svg-as-png');
var dataUriToBuffer = require('data-uri-to-buffer');
// var svg2png = require('svg2png');

var chart = require('./chart');

global.document = jsdom.jsdom('<html><head><link rel="stylesheet" href="chart.css" /></head><body><svg class="chart"></svg></body></html>');
global.window = global.document.defaultView;
global.Image = global.window.Image;

global.Canvas = require('canvas');

var numbers = [ 4, 8, 15, 16, 23, 42 ];

chart(document.querySelector('.chart'), numbers);

saveSvgAsPng.svgAsDataUri(document.querySelector('.chart'), {}, function(uri) {
    var buffer = dataUriToBuffer(uri);

    console.log(uri);
    console.log(buffer.toString());

    fs.writeFile('test-jsdom.svg', buffer, function() {
        console.log('wrote test-jsdom.svg');
    });
});
