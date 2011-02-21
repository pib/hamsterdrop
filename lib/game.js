var gamejs = require('gamejs'),
    Board = require('./board').Board,
    Player = require('./player').Player;

function Game(display, cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.width = this.CELL_SIZE * cols;
    this.height = this.CELL_SIZE * rows;

    this.display = display;
    this.players = [new Player(this, 'blue'), new Player(this, 'red')];
    this.board = new Board(this);
    this.current_player = 0;
}
Game.prototype = {
    CELL_SIZE: 40,

    loop: function(ms) {
        this.update(ms);
        this.draw(this.display);
    },
    update: function(ms) {
        this.display.fill('#ffffff');
        this.board.update(ms);
        this.players[this.current_player].update(ms);
    },
    draw: function(display) {
        this.board.draw(display);
        this.players[this.current_player].draw(display);
    },

    points: function(points) {
        this.players[this.current_player].score += points * 20;
    },

    nextTurn: function() {
        this.current_player = !this.current_player && 1 || 0;
    }
};

exports.Game = Game;