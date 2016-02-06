var fs = require('fs');
var jsdom = require('jsdom');
var saveSvgAsPng = require('save-svg-as-png');
var dataUriToBuffer = require('data-uri-to-buffer');

var chart = require('./chart');

jsdom.env({
    html: '<html><head><link rel="stylesheet" href="http://localhost:1337/chart.css" /></head><body><svg class="chart"></svg></body></html>',
    features: {
        FetchExternalResources: ['link', 'img'],
        ProcessExternalResources: true,
    },
    done: function(err, window) {
        global.window = window;
        global.document = window.document;
        global.Canvas = require('canvas');
        global.Image = Canvas.Image;

        var numbers = [ 4, 8, 15, 16, 23, 42 ];

        chart(document.querySelector('.chart'), numbers);

        saveSvgAsPng.svgAsDataUri(document.querySelector('.chart'), {}, function(uri) {
            var buffer = dataUriToBuffer(uri);

            fs.writeFile('test-jsdom.svg', buffer, function() {
                console.log('wrote test-jsdom.svg');
            });
        });

        window.close();
    },
})
