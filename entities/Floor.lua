local Entity = require 'entities.Entity'
local Floor = Entity:new()

function Floor:init(game, x, y)
   self.width = 800
   self.height = 20
   Entity.init(self, game, x, y)
   table.insert(self.shapes, love.physics.newRectangleShape(self.body, 0, 0,
                                                            self.width, self.height, 0))
end

function Floor:draw()
   Entity.draw(self)
   love.graphics.setColor(255, 200, 200)
   love.graphics.rectangle('fill', self.body:getX() - self.width / 2, 
                           self.body:getY() - self.height / 2, 800, 20)
end

return Floor