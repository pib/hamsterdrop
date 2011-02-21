var gamejs = require('gamejs'),
    Ball = require('./ball').Ball,
    Hamster = require('./hamster').Hamster;

gamejs.preload(['images/hamster.png', 'images/hamsterball.png']);

function Player(game, player) {
    this.game = game;
    this.color = player;
    this.hamster_position = player == 'red' ? game.cols - 1 : 0;
    this.hamster = new Hamster();
    this.balls = new Array(game.cols);
    for (var i=0; i < game.cols; i++) this.balls[i] = new Ball(player);
}
Player.prototype = {
    update: function(ms) {
        for (var i=0, len=this.balls.length; i < len; i++) {
            this.balls[i].update(ms);
        }
        this.hamster.update(ms);       
    },
    draw: function(display) {
        for (var i=0, len=this.balls.length; i < len; i++) {
            this.balls[i].rect = new gamejs.Rect([i * 40, 40, 40, 40]);
            this.balls[i].draw(display);
        }
        this.hamster.rect = new gamejs.Rect([this.hamster_position * 40, 0, 40, 40]);
        this.hamster.draw(display);
    }
};

exports.Player = Player;