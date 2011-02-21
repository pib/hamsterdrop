var gamejs = require('gamejs'),
    AnimatedSprite = require('./animatedsprite').AnimatedSprite;

AnimatedSprite.defineSheet({
    name: 'hamsterball',
    file: 'images/hamsterball.png',
    animations: {
        blue: {width: 40, height: 40, x: 0, y: 0, frames: 1},
        blue_stand: {width: 40, height: 40, x: 40, y: 0, frames: 1},
        blue_right: {width: 40, height: 40, x: 0, y: 40, frames: 2},
        blue_left: {width: 40, height: 40, x: 0, y: 80, frames: 2},
        red: {width: 40, height: 40, x: 80, y: 0, frames: 1},
        red_stand: {width: 40, height: 40, x: 120, y: 0, frames: 1},
        red_right: {width: 40, height: 40, x: 80, y: 40, frames: 2},
        red_left: {width: 40, height: 40, x: 80, y: 80, frames: 2}
    }
});

function Ball(color) {
    Ball.superConstructor.apply(this, arguments);
    this.color = color;
    this.setFrames(this.getSheetFrames('hamsterball', color));
}
gamejs.utils.objects.extend(Ball, AnimatedSprite);

Ball.prototype.empty = function() {
    this.setFrames(this.getSheetFrames('hamsterball', this.color));
};

Ball.prototype.stand = function() {
    this.setFrames(this.getSheetFrames('hamsterball', this.color + '_stand'));
};

Ball.prototype.right = function() {
    this.setFrames(this.getSheetFrames('hamsterball', this.color + '_right'));
};

Ball.prototype.left = function() {
    this.setFrames(this.getSheetFrames('hamsterball', this.color + '_left'));
};


exports.Ball = Ball;