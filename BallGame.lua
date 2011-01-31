local entities = require('entities')
local Game = require('Game')
local BallGame = Game:new()

function BallGame:init()
   self.players = {
      entities.BallSet:new({player=1, color={0, 0, 255}}),
      entities.BallSet:new({player=2, color={255, 0, 0}})
   }
   self.current = 1
   
   self:addEntity(self.players[1], 0, 0)
   self:addEntity(self.players[2], 0, 0)
   self:addEntity(entities.Floor:new(), 400, 590)
end

function BallGame:endTurn()
   self.current = self.current + 1
   if self.current > #self.players then
      self.current = 1
   end
end

function BallGame:keypressed(key, unicode)
   if key == 'right' then
      self.players[self.current]:right()
   elseif key == 'left' then
      self.players[self.current]:left()
   elseif key == 'down' then
      self.players[self.current]:drop()
   end
end

return BallGame