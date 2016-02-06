global.Canvas = require('canvas');
var fs = require('fs');
var jsdom = require('jsdom');
var saveSvgAsPng = require('save-svg-as-png');
var dataUriToBuffer = require('data-uri-to-buffer');
var svg2png = require('svg2png');

var chart = require('./chart');

global.document = jsdom.jsdom('<html><body><svg class="chart" viewBox="0 0 420 300"></svg></body></html>');
global.window = global.document.defaultView;
global.Image = global.window.Image;

var numbers = [ 4, 8, 15, 16, 23, 42 ];

chart(document.querySelector('.chart'), numbers);

saveSvgAsPng.svgAsDataUri(document.querySelector('.chart'), {}, function(uri) {
    console.log(uri);
    var buffer = dataUriToBuffer(uri);

    // var canvas = new global.Canvas(420, 300, 'svg');
    // var ctx = canvas.getContext('2d');

    // var img = new Image();
    // img.onload = function() {
    //     console.log('load');
    //     ctx.drawImage(img, 0, 0);

    //     var dataUrl = canvas.toDataURL('image/png');

    //     console.log(dataUrl);
    //     SOME_EXIT_CONDITION = true;
    // };

    // img.src = buffer;
    //

    svg2png(buffer, { width: 300, height: 400 })
        .then(function(buff) {
            return fs.writeFileSync('test.png', buff);
        })
        .catch(e => console.error(e));
});
