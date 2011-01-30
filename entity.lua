local Entity = {}

function Entity:new(o)
   o = o or {}
   setmetatable(o, self)
   self.__index = self
   return o
end

function Entity:init(world, x, y)
   self.body = love.physics.newBody(world.physics, x, y, 0, 0)
   self.shapes = {}
end


function Entity:draw()
   if world.bounding_boxes then
      for shape in self.shapes do
         local x1, y1, x2, y2, x3, y3, x4, y4 = shape:getBoundingBox()
         local boxwidth = x3 - x2
         local boxheight = y2 - y1
         love.graphics.setColor(200, 200, 200)
         love.graphics.rectangle('line', self.body:getX() - boxwidth/2,
                                 self.body:getY() - boxheight/2,
                                 boxwidth, boxheight)
      end
   end
end


local Ball = Entity:new()


function Ball:init(world, x, y)
   local radius = self.radius or 50
   Entity.init(self, world, x, y)
   table.insert(self.shapes, love.physics.newCircleShape(self.body, 0, 0, radius))
   self.body:setMassFromShapes()
   self.fill = {255, 255, 255}
   self.outline = {0, 0, 0}
end


function Ball:draw()
   Entity.draw(self)

   love.graphics.setColor(self.fill[1], self.fill[2], self.fill[3])
   love.graphics.circle('fill', self.body:getX(), self.body:getY(),
                        self.shapes[1]:getRadius(), 20)

   love.graphics.setColor(self.outline[1], self.outline[2], self.outline[3])
   love.graphics.circle('line', self.body:getX(), self.body:getY(),
                        self.shapes[1]:getRadius(), 20)
end


local Floor = Entity:new()

function Floor:init(world, x, y)
   self.width = 800
   self.height = 20
   Entity.init(self, world, x, y)
   table.insert(self.shapes, love.physics.newRectangleShape(self.body, 0, 0,
                                                            self.width, self.height, 0))
end

function Floor:draw()
   Entity.draw(self)
   love.graphics.setColor(255, 200, 200)
   love.graphics.rectangle('fill', self.body:getX() - self.width / 2, 
                           self.body:getY() - self.height / 2, 800, 20)
end

return {
   Entity = Entity,
   Ball = Ball,
   Floor = Floor
}