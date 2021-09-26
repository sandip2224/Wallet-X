const express = require('express')
const multer = require('multer')

const router = express.Router()

const { ensureAuth, ensureGuest } = require('../middleware/auth')
const indexController = require("../controllers/indexController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    cb(null, false)
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
})

// GET login
router.get('/', ensureGuest, indexController.registerRoute)

// GET login
router.get('/login', ensureGuest, indexController.loginRoute)

// GET /dashboard
router.get('/dashboard', ensureAuth, indexController.getDashBoard)

// POST /dashboard
router.post('/dashboard', ensureAuth, upload.single('productImage'), indexController.postDashBoard)

// GET /trend
router.get('/trend', ensureAuth, indexController.getTrend)

// GET /expenses
router.get('/expenses', ensureAuth, indexController.getExpenses)

router.post('/filterExpenses', ensureAuth, indexController.filterExpenses)

// DELETE /expenses
router.delete('/expenses', ensureAuth, indexController.deleteExpenses)

// GET /analysis
router.get('/analysis', ensureAuth, indexController.getAnalysis)

module.exports = router