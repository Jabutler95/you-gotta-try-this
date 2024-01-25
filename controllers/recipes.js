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
      ingredients: ingredients  
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/recipes/new');
  })
}

async function makeNewRecipe(req, res) {
  console.log(req.body)
  try {
    const ingredientIdList = await addIngredients(req, res)
    console.log(ingredientIdList)
    req.body.ingredients = ingredientIdList
    const recipe = await Recipe.create(req.body)
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/recipes')
  }
}

async function addIngredients(req, res) {
console.log('this is the body +++++',req.body)
const ingredientIdList = []
let idx = 0
if (Array.isArray(req.body.unit)) {
  for (let ingredient in req.body.ingredientName) {
      const newIngredientObject = {}
      newIngredientObject.ingredientName = req.body.ingredientName[idx]
      newIngredientObject.quantity = req.body.quantity[idx]
      newIngredientObject.unit = req.body.unit[idx]
      const ingredientToPush = await Ingredient.create(newIngredientObject)
      ingredientIdList.push(ingredientToPush._id)
      idx++
    }
  } else {
    const newIngredientObject = {}
    newIngredientObject.ingredientName = req.body.ingredientName
    newIngredientObject.quantity = req.body.quantity
    newIngredientObject.unit = req.body.unit
    const ingredientToPush = await Ingredient.create(newIngredientObject)
    ingredientIdList.push(ingredientToPush._id)
  }
  return ingredientIdList
}

async function update(req, res) {
  // console.log('this is the req body',req.body)
  try {
  const recipe = await Recipe.findById(req.params.recipeId)
  // console.log('recipe before push ===>',recipe);
  const ingredientIdList = await addIngredients(req, res)
  // console.log('ingredient id list ===>',ingredientIdList);
  recipe.ingredients.push(...ingredientIdList)
  // console.log('recipe after push ===>',recipe);
  recipe.save()
  res.redirect(`/recipes/${recipe._id}`)
  }
  catch (error) {
    console.log(error)
    res.redirect('/recipes')
  }
}

function show(req, res) {
  Recipe.findById(req.params.recipeId)
    .populate('ingredients')
    .then(recipe => {
      console.log(recipe)
      res.render('recipes/show', {
        recipe: recipe,
        title: 'Recipe Detail',
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}



function edit(req, res) {
  Recipe.findById(req.params.recipeId)
  .populate('ingredients')
  .then(recipe => {
    Ingredient.find({})
    recipe.ingredients.push(req.body)
    recipe.save()
    .then(ingredients => {
      res.render('recipes/edit', {
        recipe: recipe,
        title: 'Edit Recipe',
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

function deleteRecipe(req, res) {
  Recipe.findByIdAndDelete(req.params.recipeId)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

export {
  index,
  newRecipe as new,
  makeNewRecipe as create,
  show,
  edit,
  update,
  deleteRecipe as delete,
  addIngredients
}