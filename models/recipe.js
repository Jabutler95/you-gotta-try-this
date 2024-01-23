import mongoose from 'mongoose'


const Schema = mongoose.Schema

const recipeSchema =  new Schema({
  recipeName: String, 
  items: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  instructions: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}