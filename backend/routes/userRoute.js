import express from 'express'
import { 
    getUser,
    login,
    logout,
    signup, 
    updateUser 
} from '../controllers/userController.js'
import { authenticate } from '../middlewares/userAuth.js'

const router = express.Router()

router.route('/update-user').post(authenticate, updateUser)
router.route('/users').post(authenticate, getUser)
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)

export default router