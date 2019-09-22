class AddNoteToCar < ActiveRecord::Migration[5.2]
  def change
    add_column :cars, :tasks, :text
  end
end
