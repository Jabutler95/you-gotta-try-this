import mongoose from 'mongoose'


const Schema = mongoose.Schema

// const ingredientsSchema = new Schema({
//   ingredientName: String,
//   quantity: String, 
//   unit: {
//     type: String, 
//     enum: ['millileter(s)', 'liter(s)', 'deciliter(s)', 'teaspoon(s)', 'tablespoon(s)', 'fluid ounce(s)', 'gill(s)', 'cup(s)', 'pint(s)', 'quart(s)', 'gallon(s)', 'milligram(s)', 'gram(s)', 'kilogram(s)', 'pound(s)', 'ounce(s)']
//   }
// })

const recipeSchema =  new Schema({
  recipeName: String, 
  // ingredients: [ingredientsSchema]
  ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  instructions: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}