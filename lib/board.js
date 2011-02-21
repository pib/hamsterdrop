var gamejs = require('gamejs'),
    Ball = require('./ball').Ball;

gamejs.preload(['images/gray.png', 'images/rightarrow.png', 'images/leftarrow.png']);

function GrayBlock(x, y) {
    GrayBlock.superConstructor.apply(this, arguments);
    this.rect = new gamejs.Rect([x, y, 40, 40]);
    this.image = gamejs.image.load('images/gray.png');
}
gamejs.utils.objects.extend(GrayBlock, gamejs.sprite.Sprite);

function LeftArrowBlock(x, y) {
    LeftArrowBlock.superConstructor.apply(this, arguments);
    this.rect = new gamejs.Rect([x, y, 40, 40]);
    this.image = gamejs.image.load('images/leftarrow.png');
}
gamejs.utils.objects.extend(LeftArrowBlock, gamejs.sprite.Sprite);

function RightArrowBlock(x, y) {
    RightArrowBlock.superConstructor.apply(this, arguments);
    this.rect = new gamejs.Rect([x, y, 40, 40]);
    this.image = gamejs.image.load('images/rightarrow.png');
}
gamejs.utils.objects.extend(RightArrowBlock, gamejs.sprite.Sprite);

function Board(game) {
    this.game = game;
    this.objects = new gamejs.sprite.Group();
    this.waiting = false;
    this.grid = [];
    for (var x=0; x < game.cols; x++) {
        var col = new Array();
        for (var y=0; y < game.rows; y++) {
            var r = Math.floor(Math.random() * 20 + 1);
            var block = null;
            if (y > 2 && y < this.game.rows - 3) {
                if (r === 1) {
                    block = new GrayBlock(game.CELL_SIZE * x, game.CELL_SIZE * y);
                } else if (r === 2) {
                    block = new LeftArrowBlock(game.CELL_SIZE * x, game.CELL_SIZE * y);
                } else if (r === 3) {
                    block = new RightArrowBlock(game.CELL_SIZE * x, game.CELL_SIZE * y);
                }
            }
            col.push(block);
            if (block) {
                this.objects.add(block);
            }
        }
        this.grid.push(col);
    }
}
Board.prototype = {
    update: function(ms) {
        this.objects.update(ms);
        if (this.dropping) this.drop_step();
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
        this.objects.draw(display);
    }
};

Board.prototype.dropBall = function(ball, col, row, callback) {
    this.objects.add(ball);
    ball.stand();
    this.dropping = {
        ball: ball,
        done: false,
        x: col, y: row,
        callback: callback || function() {}
    };
};

// This is where all the dropping action happens.
Board.prototype.drop_step = function() {
    if (this.waiting) return;

    var d = this.dropping;

    if (d.done) {
        // We're done dropping!
        this.dropping = null;
        d.callback(d);
        
    } else if (d.y < this.game.rows - 1) {
        // Basic case. If we're not at the bottom, see what we should do

        var below = this.grid[d.x][d.y + 1];

        // If there's nothing below, drop down one.
        if (!below) this.move_down(d);
        else if (below instanceof GrayBlock || below instanceof Ball) {
            d.done = true;
            this.grid[d.x][d.y] = d.ball;
        } else if (below instanceof LeftArrowBlock) {
            d.ball.left();
            this.roll(d, -1, below);
        } else if (below instanceof RightArrowBlock) {
            d.ball.right();
            this.roll(d, 1, below);
        }

    } else if (!d.done) {
        // We're at the bottom slide off the screen, up the score for the current player.
        this.roll_off(d);
        this.game.points(d.y);

    }
};

Board.prototype.roll = function(drop, dir, block) {
    var original_x = drop.x;
    var next = drop.x + dir;
    if (next < 0 || next >= this.game.cols-1 || this.grid[next][drop.y]) {
        drop.done = true;
        drop.ball.stand();
        this.grid[drop.x][drop.y] = drop.ball;
        return;
    }
    this.waiting = true;
    drop.x += dir;
    var that = this;
    drop.ball.animateTo({
                            x: drop.x * this.game.CELL_SIZE,
                            y: drop.y * this.game.CELL_SIZE,
                            ms: 200,
                            callback: function() {
                                that.waiting = false;
                                drop.ball.stand();
                                var new_block;
                                if (block instanceof RightArrowBlock)
                                    new_block = new LeftArrowBlock(block.rect.left, block.rect.top);
                                else
                                    new_block = new RightArrowBlock(block.rect.left, block.rect.top);
                                
                                that.objects.remove(block);
                                that.objects.add(new_block);
                                that.grid[original_x][drop.y + 1] = new_block;
                            }
                        });
};

Board.prototype.move_down = function(drop) {
    this.waiting = true;
    drop.y += 1;
    var that = this;
    drop.ball.animateTo({
                            x: drop.x * this.game.CELL_SIZE,
                            y: drop.y * this.game.CELL_SIZE,
                            ms: 200,
                            callback: function() { that.waiting = false; }
                        });
};

Board.prototype.roll_off = function(drop) {
    this.waiting = true;
    drop.done = true;
    var x, ms;
    if (drop.ball.color == 'blue') {
        drop.ball.left();
        x = -this.game.CELL_SIZE, ms = drop.x * 200;
    } else {
        drop.ball.right();
        x = this.game.width, ms = (this.game.cols - drop.x) * 200;
    }
    var that = this;
    drop.ball.animateTo({
                            x: x,
                            y: drop.y * this.game.CELL_SIZE,
                            ms: ms,
                            callback: function() { that.waiting = false; }
                        });
};

exports.Board = Board;