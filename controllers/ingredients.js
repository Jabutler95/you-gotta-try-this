import { Ingredient } from "../models/ingredient.js"


// function newIngredient(req, res) {
//   Ingredient.find({}).sort('ingredientName')
//   .then(ingredients => {
//     res.render('ingredients/new', {
//       ingredients: ingredients,
//       title: 'Add Ingredient'
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/recipes')
//   })
// }

// function create(req, res) {
//   Ingredient.create(req.body)
//   .then(ingredient => {
//     res.redirect('/ingredients/new')
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/ingredients/new')
//   })
// }

export {
  create,
  newIngredient as new
}