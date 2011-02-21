var gamejs = require('gamejs');

function Board(game) {
    this.game = game;
    for (var x=0; x > game.cols; x++) {
        this.push(new Array(game.rows));
    }
}
Board.prototype = {
    update: function(ms) {
    },
    draw: function(display) {
        if (this.game.debug) {
            var width = this.game.width;
            var height = this.game.height;
            var grid_size = this.game.CELL_SIZE;
            for (var i=0; i < this.game.cols; i++) {
                var offset = i * grid_size;
                gamejs.draw.line(display, '#ff0000', [offset, 0], [offset, height]);
            }
            for (var j=0; j < this.game.rows; j++) {
                var offset = j * grid_size;
                gamejs.draw.line(display, '#ff0000', [0, offset], [width, offset]);                    
            }
        }
    }
};
Board.prototype.prototype = Array;

exports.Board = Board;