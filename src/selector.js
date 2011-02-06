Engine.include('/components/component.transform2d.js');
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
            
            constructor: function(color, selected, width, height) {
                this.base("Selector");
                this.color = color;

                this.add(Transform2DComponent.create('move'));

                this.width = width;
                this.height = height;
                this.shape = Rectangle2D.create(0, 0, this.width, this.height);

                this.setPosition(Point2D.create(width * selected, 0));

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

            moveRight: function() {
                this.selected += 1;
                if (this.selected >= HamsterDrop.gridWidth)
                    this.selected = HamsterDrop.gridWidth - 1;
            },

            moveLeft: function() {
                this.selected -= 1;
                if (this.selected < 0)
                    this.selected = 0;
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
