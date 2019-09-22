class Car < ApplicationRecord
  validates_uniqueness_of :vin
  serialize :tasks
  def to_json
    {
        "vin": self.vin,
        "make": self.make,
        "model": self.model,
        "color": self.color,
        "mileage": self.mileage,
        "dop": self.dop,
        "apiId": "v1",
        "id": self.id,
        "inspectedStatus": self.inspectedStatus,
        tasks: self.tasks
    }
  end
end
