local world = require 'world'
local entity = require 'entity'

function love.load()
   love.graphics.setBackgroundColor(104, 136, 248)
   love.graphics.setLineStyle('smooth')
   love.graphics.setLineWidth(1)

   gameworld = world.World:new(800, 600, 16, 120)
   gameworld:addEntity(entity.Ball:new{radius=20}, 400, 50)
   gameworld:addEntity(entity.Ball:new{radius=20}, 50, 50)
   gameworld:addEntity(entity.Floor:new(), 400, 590)
end

function love.update(dt)
   gameworld:update(dt)
end

function love.draw()
   gameworld:draw()
end

function love.keypressed(key, unicode)
   if key == 'print' then
      screen = love.image.newEncodedImageData(love.graphics.newScreenshot(), 'bmp')
      love.filesystem.setIdentity('dropballs')
      saved = love.filesystem.write('screenshot.bmp', screen)
      if saved then
         print ('saved screenshot in '..love.filesystem.getSaveDirectory())
      else
         print 'not saved for some reason'
      end
   end
end