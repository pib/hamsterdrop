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
            
            players: [],

            current_player: 0,

            setup: function() {
                
                Engine.setFPS(this.engineFPS);

                this.fieldBox = Rectangle2D.create(0, 0, this.fieldWidth, this.fieldHeight);
                this.renderContext = CanvasContext.create('PlayField', this.fieldWidth, this.fieldHeight);
                this.renderContext.setBackgroundColor('black');

                Engine.getDefaultContext().add(this.renderContext);

                this.players.push(BallHolder.create(0, 'blue'));
                this.renderContext.add(this.players[0]);
                this.players.push(BallHolder.create(1, 'red'));
                this.renderContext.add(this.players[1]);

                this.startGame();
            },

            teardown: function() {
                this.renderContext.destroy();
            },

            startGame: function() {

            },

            nextTurn: function() {
                if (this.current_player == 0)
                    this.current_player = 1;
                else
                    this.current_player = 0;
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