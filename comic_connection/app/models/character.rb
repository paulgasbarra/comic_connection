class Character < ActiveRecord::Base
  serialize :character_enemies
  serialize :character_friends
  serialize :teams
  serialize :powers
end
