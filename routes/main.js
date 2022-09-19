const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const aboutController = require('../controllers/about')
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/profile', ensureAuth, postsController.getProfile)
router.get('/vendor-public', ensureAuth, postsController.getPublicProfile)
router.get('/about', aboutController.getAbout)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router