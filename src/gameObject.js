Engine.include('/components/component.transform2d.js');
Engine.include('/components/component.keyboardinput.js');
Engine.include('/engine/engine.object2d.js');

Engine.initObject('GameObject', 'Object2D',
function() {
    var GameObject = Object2D.extend(
        {
            width: 50,
            height: 50,
            color: '#ffff00',
            moveVec: null,
            shape: null,
            
            constructor: function() {
                this.base("GameObject");

                this.add(Transform2DComponent.create('move'));
                this.add(KeyboardInputComponent.create('input'));

                var fBox = HamsterDrop.getFieldBox().get();
                var start = HamsterDrop.getFieldBox().getCenter();
                start.sub(Point2D.create(25, 25));

                this.shape = Rectangle2D.create(0, 0, this.width, this.height);

                this.setPosition(start);

                this.moveVec = Vector2D.create(0, 0);
            },

            onKeyDown: function(keyCode) {
                switch(keyCode) {
                case EventEngine.KEYCODE_LEFT_ARROW:
                    this.moveVec.setX(-4);
                    break;
                case EventEngine.KEYCODE_RIGHT_ARROW:
                    this.moveVec.setX(4);
                    break;
                case EventEngine.KEYCODE_UP_ARROW:
                    this.moveVec.setY(-4);
                    break;
                case EventEngine.KEYCODE_DOWN_ARROW:
                    this.moveVec.setY(4);
                    break;
                }
                return false;
            },

            onKeyUp: function(keyCode) {
                switch(keyCode) {
                case EventEngine.KEYCODE_LEFT_ARROW:
                case EventEngine.KEYCODE_RIGHT_ARROW:
                    this.moveVec.setX(0);
                    break;
                case EventEngine.KEYCODE_UP_ARROW:
                case EventEngine.KEYCODE_DOWN_ARROW:
                    this.moveVec.setY(0);
                    break;
                }
                return false;
            },

            update: function(renderContext, time) {
                renderContext.pushTransform();

                this.base(renderContext, time);
                
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

			    this.setPosition(pos);
		    },
            draw: function(renderContext) {
			    // Generate a rectangle to represent our object
			    var pos = this.getPosition();

			    // Set the color to draw with
			    renderContext.setFillStyle(this.color);
			    renderContext.drawFilledRectangle(this.shape);
		    },

            getClassName: function() {
                return 'GameObject';
            }

        });
    return GameObject;
});
