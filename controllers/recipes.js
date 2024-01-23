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
  Ingredient.find({})
    .then(ingredients => {
      res.render('recipes/new', {
        title: 'Add Recipe',
        ingredients: ingredients  // Include ingredients data in the render
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/recipes/new');
    });
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

function show(req, res) {
  Recipe.findById(req.params.recipeId)
  .populate('items')
  .then(recipe => {
    Ingredient.find({_id: {$nin: recipe.ingredients}})
    .then(ingredients => {
      res.render('recipes/show', {
        recipe: recipe,
        title: 'Recipe Detail',
        ingredients: ingredients
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Recipe.findById(req.params.recipeId)
  .then(recipe => {
    res.render('recipes/edit', {
      recipe:recipe,
      title: 'Edit Recipe'
    })
  })
}

export {
  index,
  newRecipe as new,
  create,
  show,
  edit,
  
}