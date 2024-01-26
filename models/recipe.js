import mongoose from 'mongoose'


const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String, 
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

// Ice box code 
// const tagShema = new Schema({
//   name: 
// })

const recipeSchema =  new Schema({
  recipeName: String, 
  ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  instructions: String,
  comments: [commentSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  // tags: [tagSchema]
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}