var gamejs = require('gamejs'),
    Game = require('./lib/game').Game;

function main() {
    var game = new Game(gamejs.display.getSurface(), 16, 12);
    //game.debug = true;
    gamejs.display.setMode([game.width, game.height]);
    gamejs.display.setCaption("Hamsta Drop!");
    
    gamejs.time.fpsCallback(game.loop, game, 20);
}
gamejs.ready(main);