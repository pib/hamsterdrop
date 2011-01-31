local Entity = {
   hidden = false
}

function Entity:new(o)
   o = o or {}
   setmetatable(o, self)
   self.__index = self
   return o
end

function Entity:init(game, x, y)
   self.game = game
   self.body = love.physics.newBody(game.world, x, y, 0, 0)
   self.shapes = {}
end

function Entity:draw()
   if self.label then
      love.graphics.print(self.label, self.body:getX(), self.body:getY())
   end
   if self.game.bounding_boxes then
      for i, shape in ipairs(self.shapes) do
         local x1, y1, x2, y2, x3, y3, x4, y4 = shape:getBoundingBox()
         local boxwidth = x3 - x2
         local boxheight = y2 - y1
         love.graphics.setColor(255, 0, 0)
         love.graphics.rectangle('line', self.body:getX() - boxwidth/2,
                                 self.body:getY() - boxheight/2,
                                 boxwidth, boxheight)
      end
   end
end

function Entity:hide()
   self.hidden = true
end

function Entity:show()
   self.hidden = false
end

return Entity