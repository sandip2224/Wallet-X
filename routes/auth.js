const express=require('express')
const passport=require('passport')

const router=express.Router()

const authController=require('../controllers/authController')

// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/'}), authController.authCallback)

// @route GET /auth/logout
router.get('/logout', authController.logout)

module.exports=router