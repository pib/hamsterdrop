Engine.include('/components/component.host.js');
Engine.include('/components/component.notifier.js');
Engine.include('/components/component.transform2d.js');
Engine.include('/components/component.keyboardinput.js');
Engine.include('/engine/engine.object2d.js');

Engine.load('/src/ball.js');
Engine.load('/src/selector.js');

var TL = Point2D.create(0, 0);
var OFFSCREEN = Point2D.create(0, -100);

Engine.initObject('BallHolder', 'Object2D',
function() {
    var BallHolder = Object2D.extend(
        {
            player_number: null,
            balls: [],
            ballCount: null,
            selector: null,
            
            constructor: function(player_number, player_color) {
                this.player_number = player_number;
                this.color = player_color;
                this.base("BallHolder");

                this.add(Transform2DComponent.create('move'));
                this.add(KeyboardInputComponent.create('input'));

                var holder = HostComponent.create('holder');
                this.add(holder);

                var fBox = HamsterDrop.getFieldBox().get();

                this.setPosition(OFFSCREEN);

                var ballWidth = HamsterDrop.fieldWidth / HamsterDrop.gridWidth,
                    ballHeight = HamsterDrop.fieldWidth / HamsterDrop.gridWidth;
                this.ballCount = HamsterDrop.gridWidth;

                this.selector = Selector.create(player_color, 0, ballWidth, ballHeight);
                holder.add('selector', this.selector);

                for (var i=0, left=0; i < this.ballCount; i++, left += ballWidth) {
                    var ball = Ball.create(player_color, ballWidth, ballHeight, left, ballHeight);
                    this.balls.push(ball);
                    holder.add('ball' + i, ball);
                }
            },

            onKeyDown: function(charCode) {
                switch (charCode) {
                case EventEngine.KEYCODE_LEFT_ARROW:
                    this.selector.moveLeft();
                    break;
                case EventEngine.KEYCODE_RIGHT_ARROW:
                    this.selector.moveRight();
                    break;
                case EventEngine.KEYCODE_DOWN_ARROW:
                    this.drop();
                    break;
                }
            },

            drop: function() {
                var selected = selector.selected;
                if (this.balls[selected]) {
                    this.getComponent('holder').remote(this.balls[selected]);                    
                }
            },

            update: function(renderContext, time) {
                this.base(renderContext, time);

                if (HamsterDrop.current_player == this.player_number) {
                    this.setPosition(TL);
                } else {
                    this.setPosition(OFFSCREEN);
                }
            },

            getClassName: function() {
                return 'BallHolder';
            },

            getPosition: function () {
                return this.getComponent('move').getPosition();
            },

            setPosition: function(point) {
                this.base(point);
                this.getComponent('move').setPosition(point);
            }

        });
    return BallHolder;
});
