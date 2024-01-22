import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientsSchema = new Schema({
  name: String,
  unit: Number,
  measurement: String
})

const recipeSchema =  new Schema({
  name: String, 
  ingredients: [ingredientsSchema],
  instructions: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}