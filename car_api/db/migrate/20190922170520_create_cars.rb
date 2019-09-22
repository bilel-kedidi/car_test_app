class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :cars do |t|
      t.string :vin
      t.string :make
      t.string :model
      t.string :color
      t.string :mileage
      t.string :dop
      t.boolean :inspectedStatus

      t.timestamps
    end
  end
end
