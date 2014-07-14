class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.integer :character_id
      t.string :name
      t.integer :count_of_issue_appearances
      t.string :image
      t.text :deck
      t.text :character_enemies
      t.text :character_friends
      t.text :powers
      t.text :teams

      t.timestamps
    end
  end
end
