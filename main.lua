local BallGame = require 'BallGame'

function love.load()
   love.graphics.setBackgroundColor(104, 136, 248)
   love.graphics.setLineStyle('smooth')
   love.graphics.setLineWidth(1)

   game = BallGame:new{width=800, height=600, ppm=16, gravity=120}
end

function love.update(dt)
   game:update(dt)
end

function love.draw()
   game:draw()
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
   elseif key == 'b' then
      game.bounding_boxes = not game.bounding_boxes
   end
   game:keypressed(key, unicode)
end