local Game = {}

function Game:addEntity(entity, x, y)
   table.insert(self.entities, entity)
   entity:init(self, x, y)
end


function Game:update(dt)
   self.world:update(dt)
end


function Game:draw()
   for i, entity in ipairs(self.entities) do
      if not entity.hidden then
         entity:draw()
      end
   end
end

function Game:keypressed(key, unicode)
   
end

function Game:init()
end


function Game:new(o)
   o = o or {}
   o.width = o.width or 800
   o.height = o.height or 600
   o.ppm = o.ppm or 16
   o.gravity = o.gravity or 120

   o.world = love.physics.newWorld(0, 0, o.width*2, o.height*2, 0, o.gravity, true)
   --o.world:setMeter(o.ppm)
   o.entities = {}
   o.bounding_boxes = false

   setmetatable(o, self)
   self.__index = self
   o:init()
   return o
end

return Game