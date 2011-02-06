Engine.include('/rendercontexts/context.canvascontext.js');

Engine.load('/src/gameObject.js');

Engine.initObject('HamsterDrop', 'Game',
function() {
    var HamsterDrop = Game.extend(
        {
           
            constructor: null,
            renderContext: null,
            engineFPS: 30,
            
            fieldBox: null,
            fieldWidth: 480,
            fieldHeight: 480,

            setup: function() {
                Engine.setFPS(this.engineFPS);

                this.fieldBox = Rectangle2D.create(0, 0, this.fieldWidth, this.fieldHeight);
                this.renderContext = CanvasContext.create('PlayField', this.fieldWidth, this.fieldHeight);
                this.renderContext.setBackgroundColor('black');

                Engine.getDefaultContext().add(this.renderContext);

                this.renderContext.add(GameObject.create());
            },

            teardown: function() {
                this.renderContext.destroy();
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