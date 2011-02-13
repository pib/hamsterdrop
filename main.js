var gamejs = require('gamejs');

gamejs.preload(['images/hamster/png', 'images/hamsterball.png']);

function main() {
    var display = gamejs.display.setMode([640, 480]);
    
}

gamejs.ready(main);