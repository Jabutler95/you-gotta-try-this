import { Recipe } from "../models/recipe.js"
import { Ingredient } from "../models/ingredient.js"

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

function newRecipe(req, res) {
  res.render('recipes/new', {
    title: 'Add Recipe'
  })
}

function create(req, res) {
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes/new')
  })
}

function show(req, res){
  Recipe.findById(req.params.recipeId)
  .then(recipe => {
    res.render('recipes/show', {
      recipe: recipe,
      title: 'Recipe Detials'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
export {
  index,
  newRecipe as new,
  create,
  show,
  
}