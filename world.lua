world = {}

local World = {}


function World:addEntity(entity, x, y)
   table.insert(self.entities, entity)
   entity:init(self, x, y)
end


function World:update(dt)
   self.physics:update(dt)
end


function World:draw()
   for i,entity in ipairs(self.entities) do
      entity:draw()
   end
end


function World:new(width, height, ppm, gravity)
   local world = {
      physics = love.physics.newWorld(0, 0, width*2, height*2, 0, gravity, true),
      entities = {},
      bounding_boxes = false
   }
   setmetatable(world, self)
   self.__index = self
   return world
end

return {
   World = World
}