
require('babel-polyfill');
require('babel-register');

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

var argv = process.argv;
if(argv.length>2){
    process.env.DIST_PAGES = argv[2];
}
// for (var i = 0; i < argv.length; i++) {
//     if (argv[i].indexOf('--folders=') == 0) {
//         var val = argv[i].substr(argv[i].indexOf('=') + 1);
//         if (val) {
//             process.env.DIST_PAGES = val;
//         }
//     }
// }

const config = require('./webpack.config');

function build(){
    doing = true;
    console.log('build start');
    setTimeout(function () { 
        let start = +new Date;
        webpack(config, function (err, stats) {
            if (err) {
                console.log('[err] ', err);
            } 
            let time = (+new Date) - start;
            console.log(`build completed: ${time}ms`);
            doing = false;
        }); 
    }, 200);
}

let doing = false;
function watchFile() {
    fs.watch(path.join(__dirname, '../src'), {
        persistent: true,
        recursive: true,
        encoding: 'utf8'
    }, function (eventType, filename) {
        if (!doing) {
            build();
        }
    });
}
build();
setTimeout(watchFile, 3000);

