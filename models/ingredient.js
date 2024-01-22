import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  ingredientName: String,
  quantity: Number, 
  enum: ['millileter(s)', 'liter(s)', 'deciliter(s)', 'teaspoon(s)', 'tablespoon(s)', 'fluid ounce(s)', 'gill(s)', 'cup(s)', 'pint(s)', 'quart(s)', 'gallon(s)', 'milligram(s)', 'gram(s)', 'kilogram(s)', 'pound(s)', 'ounce(s)']

})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export {
  Ingredient
}
