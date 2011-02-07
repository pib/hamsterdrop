Engine.include('/components/component.transform2d.js');
Engine.include('/components/component.sprite.js');
Engine.include('/engine/engine.object2d.js');

Engine.initObject('Ball', 'Object2D',
function() {
    var Ball = Object2D.extend(
        {
            width: null,
            height: null,
            color: null,
            moveVec: null,
            shape: null,
            state: 'sitting',
            notify: null,
            speed: 6,
            
            constructor: function(color, width, height, x, y) {
                this.base("Ball");
                this.color = color;

                this.add(Transform2DComponent.create('move'));
                this.sprites = HamsterDrop.spriteLoader.exportAll('hamsterball');
                this.add(SpriteComponent.create('draw', this.sprites[color]));

                this.width = width;
                this.height = height;
                this.shape = Rectangle2D.create(0, 0, this.width, this.height);

                this.setPosition(Point2D.create(x, y));
                this.setBoundingBox(this.sprites['blue'].getBoundingBox());

                this.moveVec = Vector2D.create(0, this.speed);
            },

            drop: function(notifiee, callback) {
                this.state = 'dropping';
                this.setSprite(this.color + 'stand');
                this.notify = {notifiee: notifiee, callback: callback};
            },

            update: function(renderContext, time) {
                renderContext.pushTransform();

                this.base(renderContext, time);
                
                if (this.state != 'sitting')
                    this.move();
                
                renderContext.popTransform();
            },

            getPosition: function() {
                return this.getComponent('move').getPosition();
            },

            setPosition: function(point) {
                this.base(point);
                this.getComponent('move').setPosition(point);
            },

            move: function() {
			    var pos = this.getPosition();
			    pos.add(this.moveVec);

			    // Determine if we hit a "wall" of our playfield
			    var fieldBox = HamsterDrop.getFieldBox().get();
			    if ((pos.x > fieldBox.r) || (pos.x < -this.width)) {
                    this.moveVec.setX(0);
			    }
			    if ((pos.y + this.height > fieldBox.b) || (pos.y < 0)) {
                    this.moveVec.setY(0);
                    if (pos.y + this.height > fieldBox.b) {
                        pos.setY(fieldBox.b - this.height - 1);
                    }
                    if (pos.y < 0) {
                        pos.setY(0);
                    }
			    }

                if (this.state == 'dropping' && this.moveVec.y == 0) {
                    this.doneDropping();
                } else if (this.state == 'sliding' && this.moveVec.x == 0) {
                    this.done();
                }

			    this.setPosition(pos);
		    },

            doneDropping: function() {
                var gridY = Math.floor(HamsterDrop.fieldHeight / this.height);

                HamsterDrop.addScore(gridY);

                if (gridY == HamsterDrop.gridHeight) {
                    this.state = 'sliding';
                    if (HamsterDrop.current_player == 0) {
                        this.moveVec.setX(-this.speed);
                        this.setSprite(this.color + 'left');
                    } else {
                        this.moveVec.setX(this.speed);
                        this.setSprite(this.color + 'right');
                    }
                } else {
                    this.done();
                }
            },

            setSprite: function(name) {
                this.getComponent('draw').setSprite(this.sprites[name]);  
            },

            done: function() {
                this.state = 'sitting';
                this.notify.callback.call(this.notify.notifiee);
            },

            getClassName: function() {
                return 'Ball';
            }

        });
    return Ball;
});
