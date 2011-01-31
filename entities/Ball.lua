local Entity = require 'entities.Entity'
local Ball = Entity:new()


function Ball:init(game, x, y)
   local radius = self.radius or 12
   Entity.init(self, game, x, y)
   table.insert(self.shapes, love.physics.newCircleShape(self.body, 0, 0, radius))
   self.body:setMassFromShapes()
   self.fill = self.fill or {255, 255, 255}
   self.outline = self.outline or {0, 0, 0}
end


function Ball:draw()
   love.graphics.setColor(self.fill[1], self.fill[2], self.fill[3])
   love.graphics.circle('fill', self.body:getX(), self.body:getY(),
                        self.shapes[1]:getRadius(), 20)

   love.graphics.setColor(self.outline[1], self.outline[2], self.outline[3])
   love.graphics.circle('line', self.body:getX(), self.body:getY(),
                        self.shapes[1]:getRadius(), 20)

   Entity.draw(self)
end


return Ball