Engine.include('/components/component.transform2d.js');
Engine.include('/engine/engine.object2d.js');

Engine.initObject('Ball', 'Object2D',
function() {
    var Ball = Object2D.extend(
        {
            width: null,
            height: null,
            color: '#ffdd00',
            moveVec: null,
            shape: null,
            dropping: false,
            notify: null,
            
            constructor: function(color, width, height, x, y) {
                this.base("Ball");
                this.color = color;

                this.add(Transform2DComponent.create('move'));

                this.width = width;
                this.height = height;
                this.shape = Rectangle2D.create(0, 0, this.width, this.height);

                this.setPosition(Point2D.create(x, y));

                this.moveVec = Vector2D.create(0, 2);
            },

            drop: function(notifiee, callback) {
                this.dropping = true;
                this.notify = {notifiee: notifiee, callback: callback};
            },

            update: function(renderContext, time) {
                renderContext.pushTransform();

                this.base(renderContext, time);
                
                if (this.dropping)
                    this.move();
                
                this.draw(renderContext);

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
			    if ((pos.x + this.width > fieldBox.r) || (pos.x < 0)) {
                    this.moveVec.setX(0);
                    if (pos.x + this.width > fieldBox.r) {
                        pos.setX(fieldBox.r - this.width - 1);
                    }
                    if (pos.x < 0) {
                        pos.setX(0);
                    }
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

                if (this.moveVec.x == 0 && this.moveVec.y == 0) {
                    this.notify.callback.call(this.notify.notifiee);
                    this.dropping = false;
                }

			    this.setPosition(pos);
		    },
            draw: function(renderContext) {
			    // Generate a rectangle to represent our object
			    var pos = this.getPosition();

			    // Set the color to draw with
			    renderContext.setFillStyle(this.color);
			    renderContext.drawFilledRectangle(this.shape);
                renderContext.setFillStyle('black');
                renderContext.drawText(Point2D.create(0, this.height / 2), '"Ball"');
		    },

            getClassName: function() {
                return 'Ball';
            }

        });
    return Ball;
});
