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


// function create(req, res) {
//   Recipe.create(req.body)
//   .then(recipe => {
//     res.redirect('/recipes')
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/recipes/new')
//   })
// }

async function makeNewRecipe(req, res) {
  try {
    const ingredientIdList = await addIngredients(req, res)
    req.body.ingredients = ingredientIdList
    const recipe = await Recipe.create(req.body)
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/recipes')
  }
}

async function addIngredients(req, res) {
  const ingredientIdList = []
  for (ingredient in req.body.ingredientsToAdd) {
    const ingredientToPush = await Ingredient.create(ingredient)
    ingredientIdList.push(ingredientToPush._id)
  }
  return ingredientIdList
}

function show(req, res) {
  Recipe.findById(req.params.recipeId)
  .populate([
    {path: "ingredients"}
  ])
  .then(recipe => {
    Ingredient.find(req.params.ingredientId)
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
  .populate('ingredients')
  .then(recipe => {
    Ingredient.find({})
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

function update(req, res) {
  Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {new: true})
  .then(recipe => {
    res.redirect(`/recipes/${recipe._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
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

// function addIngredients(req, res) {
//   Recipe.findById(req.params.recipeId)
//   .then(recipe => {
//     recipe.ingredients.push(req.body.ingredientId)
//     recipe.save()
//     .then(() => {
//       res.redirect(`/recipes/${recipe._id}`)
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect('/recipes')
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/recipes')
//   })
// }

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