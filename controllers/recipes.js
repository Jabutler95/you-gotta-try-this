import { Recipe } from "../models/recipe.js"

function index(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes: recipes,
      title: 'All Recipes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newRecipe (req, res) {
  res.render('recipes/new', {
    title: 'Add Recipe'
  })
}

export {
  index,
  newRecipe as new,
  
}