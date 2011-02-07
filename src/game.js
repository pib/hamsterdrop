Engine.include('/rendercontexts/context.canvascontext.js');
Engine.include('/components/component.notifier.js');
Engine.include('/resourceloaders/loader.sprite.js');

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
            grid: null,

            obj: null,
            
            players: [],

            current_player: -1,
            spriteLoader: null,

            setup: function() {
                
                Engine.setFPS(this.engineFPS);

                this.fieldBox = Rectangle2D.create(0, 0, this.fieldWidth, this.fieldHeight);
                this.renderContext = CanvasContext.create('PlayField', this.fieldWidth, this.fieldHeight);
                this.renderContext.setBackgroundColor('black');

                Engine.getDefaultContext().add(this.renderContext);
                
                this.spriteLoader = SpriteLoader.create();

                this.spriteLoader.load('hamster', this.getFilePath('resources/hamster.sprite.json'));
                this.spriteLoader.load('hamsterball', this.getFilePath('resources/hamsterball.sprite.json'));

                Timeout.create('resourceWait', 250, function() {
                                   if (HamsterDrop.spriteLoader.isReady()) {
                                       this.destroy();
                                       HamsterDrop.startGame();
                                   } else {
                                       this.restart();
                                   }
                               });
            },

            teardown: function() {
                this.renderContext.destroy();
            },

            startGame: function() {
                this.grid = GameGrid.create(this.gridWidth, this.gridHeight);
                this.renderContext.add(this.grid);

                this.players.push({balls: BallHolder.create(0, 'blue'), score: 0});
                this.renderContext.add(this.players[0].balls);
                this.players.push({balls: BallHolder.create(1, 'red'), score: 0});
                this.renderContext.add(this.players[1].balls);

                this.current_player = 0;
            },

            addScore: function(gridY) {
                this.players[this.current_player].score += gridY * gridY;
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