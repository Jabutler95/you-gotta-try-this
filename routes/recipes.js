import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

// GET localhost:3000/recipes
router.get('/', recipesCtrl.index)
// GET localhost:3000/recipes/new
router.get('/new', isLoggedIn, recipesCtrl.new)
// GET localhost:3000/recipes/show
router.get('/:recipeId', isLoggedIn, recipesCtrl.show)
// POST localhost:3000/recipes
router.post('/', isLoggedIn, recipesCtrl.create)

export { router }