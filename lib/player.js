var gamejs = require('gamejs'),
    Ball = require('./ball').Ball,
    Hamster = require('./hamster').Hamster;

gamejs.preload(['images/hamster.png', 'images/hamsterball.png']);

function clamp(val, min, max) {
    if (val < min) return min;
    else if (val > max) return max;
    return val;
}

function Player(game, player) {
    this.game = game;
    this.color = player;
    this.points = 0;
    this.waiting = false;
    this.hamster = new Hamster();
    this.hamster.column = player == 'red' ? game.cols - 1 : 0;
    this.hamster.rect = new gamejs.Rect([this.hamster.column * this.game.CELL_SIZE, 0, 40, 40]);
    this.balls = new Array(game.cols);
    for (var i=0; i < game.cols; i++) {
        this.balls[i] = new Ball(player);
        this.balls[i].rect = new gamejs.Rect([i * 40, 40, 40, 40]);
    }
}
Player.prototype = {
    update: function(ms) {
        for (var i=0, len=this.balls.length; i < len; i++) {
            if (this.balls[i]) {
                this.balls[i].update(ms);
            }
        }
        this.hamster.update(ms);
        this.handle_input();
    },

    handle_input: function() {
        if (this.waiting) return;

        gamejs.event.get().forEach(
          function(event) {
             if (event.type === gamejs.event.KEY_DOWN) {
                 // Ignore extra key events if we're still handling another one
                 if (this.waiting) return;

                 if (event.key === gamejs.event.K_RIGHT) {
                     this.hamster.right();
                     this.move_hamster(1);
                 } else if (event.key == gamejs.event.K_LEFT) {
                     this.hamster.left();
                     this.move_hamster(-1);
                 } else if (event.key == gamejs.event.K_DOWN) {
                     this.drop_hamster();
                 }
             } 
          }, this);
    },

    move_hamster: function(dir) {
        this.waiting = true;
        this.hamster.column = clamp(this.hamster.column + dir, 0, this.game.cols - 1);
        var that = this;
        this.hamster.animateTo({
                                   x: this.hamster.column * this.game.CELL_SIZE,
                                   y: 0,
                                   ms: 200,
                                   callback: function() { that.waiting = false; that.hamster.stand(); }
                               });        
    },
        
    drop_hamster: function() {
        var i = this.hamster.column, ball = this.balls[i];
        if (ball) {
            this.waiting = true;
            var that = this;
            this.balls[i] = null;
            this.game.board.dropBall(ball, i, 1, function() {
                                         that.waiting = false;
                                         that.game.nextTurn();
                                     });
        }
    },

    draw: function(display) {
        for (var i=0, len=this.balls.length; i < len; i++) {
            if (this.balls[i]) {
                this.balls[i].draw(display);
            }
        }
        this.hamster.draw(display);
    }
};

exports.Player = Player;