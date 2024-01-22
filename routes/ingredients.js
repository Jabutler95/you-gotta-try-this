import { Router } from 'express'
import * as ingredientsCtrl from '../controllers/ingredients.js'

const router = Router()

// GET localhost:3000/ingredients/new
router.get('/new', ingredientsCtrl.new)

export {
  router
}
