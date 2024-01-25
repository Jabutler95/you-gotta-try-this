import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

// GET localhost:3000/recipes
router.get('/', recipesCtrl.index)
// GET localhost:3000/recipes/new
router.get('/new', isLoggedIn, recipesCtrl.new)
// GET localhost:3000/recipes/show
router.get('/:recipeId', recipesCtrl.show)
// GET localhost:3000/recipes/:recipeId/edit
router.get('/:recipeId/edit', isLoggedIn, recipesCtrl.edit)
// POST localhost:3000/recipes
router.post('/', isLoggedIn, recipesCtrl.create)
// POST localhost:3000/recipes/:flightId/ingredients
router.post('/:recipeId/ingredients', isLoggedIn, recipesCtrl.addIngredients)
// POST localhost:3000/recipes/:recipeId/comments
router.get('/:recipeId/comments/:commentId/edit', isLoggedIn, recipesCtrl.editComment)
// POST localhost:3000/recipes/:recipeId/comments
router.post('/:recipeId/comments', isLoggedIn, recipesCtrl.addComment)
// PUT localhost:3000/recipes/:recipeId
router.put('/:recipeId', isLoggedIn, recipesCtrl.update)
// PUT localhost:3000/recipes/:recipeId/ingredients
router.put('/:recipeId/ingredients', isLoggedIn, recipesCtrl.addIngredients)

// DELETE localhost:3000/recipes/:recipeId
router.delete('/:recipeId', isLoggedIn, recipesCtrl.delete)

export { router }