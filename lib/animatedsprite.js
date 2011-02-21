var gamejs = require('gamejs');

function AnimatedSprite() {
    AnimatedSprite.superConstructor.apply(this, arguments);
    this.frames = null;
    this.ms_per_frame = 100;
    this._counter = 0;
    this.current_frame = -1;
    return this;
}
gamejs.utils.objects.extend(AnimatedSprite, gamejs.sprite.Sprite);

AnimatedSprite.prototype.setFrames = function(frames) {
    this.frames = frames;
    this.current_frame = 0;
    this.image = this.frames[this.current_frame];
};

AnimatedSprite.prototype.update = function(ms) {
    if (this.frames.length > 1) {
        this._counter += ms;
        if (this._counter >= this.ms_per_frame) {
            this._counter -= this.ms_per_frame;
            this.current_frame++;
            if (this.current_frame >= this.frames.length) {
                this.current_frame = 0;
            }
            this.image = this.frames[this.current_frame];
        }
    }

    if (this.animating) {
        var a = this.animating;
        a.ms_so_far += ms;
        var slice = ms / a.ms, dx = slice * a.x_dist, dy = slice * a.y_dist;
        this.rect.moveIp(dx, dy);

        if (a.ms_so_far >= a.ms) {
            this.rect.left = a.x;
            this.rect.top = a.y;
            a.callback(a);
            this.animating = null;
        }
    }
};

var sheets = {};

AnimatedSprite.defineSheet = AnimatedSprite.prototype.defineSheet = function(config) {
    sheets[config.name] = config;
};

AnimatedSprite.prototype.getSheetFrames = function(sheet, animation) {
    var conf = sheets[sheet];
    if (!conf.frames) {
        conf.frames = {_full: gamejs.image.load(conf.file)};
        for (var name in conf.animations) {
            var anim = conf.animations[name];
            var frames = [];
            var dstRec = new gamejs.Rect(0, 0, anim.width, anim.height);
            var srcRec = new gamejs.Rect(anim.x, anim.y, anim.width, anim.height);
            for (var i=0; i < anim.frames; i++) {
                var frame = new gamejs.Surface(anim.width, anim.height);
                frame.blit(conf.frames._full, dstRec, srcRec);
                srcRec.left += anim.width;
                frames.push(frame);
            }
            conf.frames[name] = frames;
        }
    }
    return conf.frames[animation];
};

AnimatedSprite.prototype.animateTo = function(conf) {
    conf.x_dist = conf.x - this.rect.left;
    conf.y_dist = conf.y - this.rect.top;
    conf.ms = conf.ms || 100;
    conf.callback = conf.callback || function() {};
    conf.ms_so_far = 0;
    this.animating = conf;
};

exports.AnimatedSprite = AnimatedSprite;
