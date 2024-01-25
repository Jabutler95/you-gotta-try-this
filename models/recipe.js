import mongoose from 'mongoose'


const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String, 
}, {
  timestamps: true
})

const recipeSchema =  new Schema({
  recipeName: String, 
  ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  instructions: String,
  comments: [commentSchema]
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}