Engine.include('/rendercontexts/context.canvascontext.js');
Engine.include('/components/component.notifier.js');

Engine.load('/src/gameGrid.js');
Engine.load('/src/ballHolder.js');

Engine.initObject('HamsterDrop', 'Game',
function() {
    var HamsterDrop = Game.extend(
        {
           
            constructor: null,
            renderContext: null,
            engineFPS: 30,
            
            fieldBox: null,
            fieldWidth: 640,
            fieldHeight: 480,

            gridWidth: 16,
            gridHeight: 12,

            obj: null,
            
            player1: null,
            player2: null,

            current_player: 1,

            setup: function() {
                Engine.setFPS(this.engineFPS);

                this.fieldBox = Rectangle2D.create(0, 0, this.fieldWidth, this.fieldHeight);
                this.renderContext = CanvasContext.create('PlayField', this.fieldWidth, this.fieldHeight);
                this.renderContext.setBackgroundColor('black');

                Engine.getDefaultContext().add(this.renderContext);

                this.player1 = BallHolder.create(1, 'blue');
                this.renderContext.add(this.player1);
                this.player2 = BallHolder.create(2, 'red');
                this.renderContext.add(this.player2);

                this.startGame();
            },

            teardown: function() {
                this.renderContext.destroy();
            },

            startGame: function() {

            },

            getRenderContext: function() {
                return this.renderContext;
            },

            getFieldBox: function() {
                return this.fieldBox;
            }
        });
    return HamsterDrop;
});