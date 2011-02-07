Engine.include('/components/component.host.js');
Engine.include('/engine/engine.object2d.js');

Engine.initObject('GameGrid', 'Object2D',
function() {
    var GameGrid = Object2D.extend(
        {
            balls: null,

            constructor: function(player_number, player_color) {
                this.balls = [];
                this.base("GameGrid");

                this.add(HostComponent.create('holder'));
            },

            update: function(renderContext, time) {
                renderContext.pushTransform();

                this.base(renderContext, time);
                renderContext.popTransform();
            },

            addBall: function(obj) {
                this.getComponent('holder').add(obj);
            },

            removeBall: function(obj) {
                this.getComponent('holder').remove(obj);
            },

            getClassName: function() {
                return 'GameGrid';
            }
        });
    return GameGrid;
});
