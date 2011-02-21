local Entity = require 'entities.Entity'
local Ball = require 'entities.Ball'

local BallSet = Entity:new()

function BallSet:init(game, x, y)
   Entity.init(self, game, x, y)

   self.player = self.player or 1
   self.color = self.color or {0, 0, 255}
   self.selected = 1
   self.always_draw = {}

   self.balls = {}
   for i = 0, 28 do
      local x = (27.5 * i) + 14
      local y = 50
      local new_ball = Ball:new()
      new_ball.fill = self.color
      new_ball.label = i
      table.insert(self.balls, new_ball)
      new_ball:init(game, x, y)
      new_ball.shapes[1]:setSensor(true)
      new_ball.body:setMass(0, 0, 0, 0)
   end
end

function BallSet:draw()
   if game.current == self.player then
      for i, ball in ipairs(self.balls) do
         ball:draw()
      end
      love.graphics.triangle('line',
                             27.5 * (self.selected - 1), 10,
                             27.5 * self.selected, 10,
                             27.5 * self.selected - 13.25, 35)
   else
      for i, ball in ipairs(self.always_draw) do
         ball:draw()
      end      
   end
end

function BallSet:right()
   self.selected = self.selected + 1
   if self.selected > #self.balls then
      self.selected = 1
   end
end
function BallSet:left()
   self.selected = self.selected - 1
   if self.selected < 1 then
      self.selected = #self.balls
   end
end

function BallSet:drop()
   if self.balls[self.selected].body:getMass() then
      self.balls[self.selected].shapes[1]:setSensor(false)
      self.balls[self.selected].body:setMassFromShapes()
      table.insert(self.always_draw, self.balls[self.selected])
      self.game:endTurn()
   end
end

return BallSet