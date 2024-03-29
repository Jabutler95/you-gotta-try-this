import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  ingredientName: String,
  quantity: String, 
  unit: {
    type: String, 
    enum: ['milliliter(s)', 'liter(s)', 'deciliter(s)', 'teaspoon(s)', 'tablespoon(s)', 'fluid ounce(s)', 'gill(s)', 'cup(s)', 'pint(s)', 'quart(s)', 'gallon(s)', 'milligram(s)', 'gram(s)', 'kilogram(s)', 'pound(s)', 'ounce(s)', ' ', ]
  }
}, {
  timestamps: true
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export {
  Ingredient
}
