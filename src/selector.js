Engine.include('/components/component.transform2d.js');
Engine.include('/components/component.sprite.js');

Engine.include('/engine/engine.object2d.js');

Engine.initObject('Selector', 'Object2D',
function() {
    var Selector = Object2D.extend(
        {
            width: null,
            height: null,
            color: '#ffdd00',
            shape: null,
            selected: 0,

            sprites: null,
            
            constructor: function(color, selected, width, height) {
                this.base("Selector");
                this.color = color;

                this.sprites = HamsterDrop.spriteLoader.exportAll('hamster');

                this.add(Transform2DComponent.create('move'));

                var standSprite = this.sprites['stand'];
                this.add(SpriteComponent.create('draw', standSprite));

                this.width = width;
                this.height = height;
                this.setBoundingBox(standSprite.getBoundingBox());

                this.setPosition(Point2D.create(width * selected, 0));

            },

            destroy: function() {
                for (var s in this.sprites) {
                    this.sprites[s].destroy();
                }
                this.sprites = null;
            },

            setSprite: function(name) {
                this.getComponent('draw').setSprite(this.sprites[name]);  
            },

            update: function(renderContext, time) {
                renderContext.pushTransform();

                this.base(renderContext, time);
                
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

            moveRight: function() {
                this.setSprite('right');
                this.selected += 1;
                if (this.selected >= HamsterDrop.gridWidth)
                    this.selected = HamsterDrop.gridWidth - 1;
                this.scheduleForward();
            },

            moveLeft: function() {
                this.setSprite('left');
                this.selected -= 1;
                if (this.selected < 0)
                    this.selected = 0;
                this.scheduleForward();
            },

            scheduleForward: function() {
                var that = this;
                clearTimeout(this.forwardTimeout);
                this.forwardTimeout = setTimeout(function() {
                                                     that.setSprite('stand');
                                                 }, 250);
            },

            move: function() {
                this.setPosition(Point2D.create(this.width * this.selected, 0));
		    },

            draw: function(renderContext) {
			    // Generate a rectangle to represent our object
			    var pos = this.getPosition();

			    // Set the color to draw with
			    renderContext.setFillStyle(this.color);
			    renderContext.drawFilledRectangle(this.shape);
                renderContext.setFillStyle('black');
                renderContext.drawText(Point2D.create(0, this.height / 2), '"Selector"');
		    },

            getClassName: function() {
                return 'Selector';
            }

        });
    return Selector;
});
