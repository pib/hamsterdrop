var gamejs = require('gamejs'),
    AnimatedSprite = require('./animatedsprite').AnimatedSprite;

AnimatedSprite.defineSheet({
    name: 'hamster',
    file: 'images/hamster.png',
    animations: {
        stand: {width: 40, height: 40, x: 80, y: 0, frames: 1},
        right: {width: 40, height: 40, x: 0, y: 0, frames: 2},
        left: {width: 40, height: 40, x: 120, y: 0, frames: 2}
    }
});

function Hamster() {
    Hamster.superConstructor.apply(this, arguments);
    this.setFrames(this.getSheetFrames('hamster', 'right'));
}
gamejs.utils.objects.extend(Hamster, AnimatedSprite);

exports.Hamster = Hamster;