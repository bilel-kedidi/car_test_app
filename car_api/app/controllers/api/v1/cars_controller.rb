class Api::V1::CarsController < ApplicationController

  before_aciton :set_car, only: [:show, :update]

  def index
    render json: Car.all.map(&:to_json)
  end

  def show
    render json: @car.to_json
  end

  def update
    @car.attributes = car_params
    @car.save
    render json: @car.to_json
  end

  def create
    @car = Car.new(car_params)
    if @car.save
      render json: @car.to_json
    end
  end


  private

  def set_car
    @car = Car.find_by(vin: params[:vin])
  rescue ActiveRecord::RecordNotFound
    render json: []
    return
  end

  def car_params
    params.require(:car).permit!
  end
end
