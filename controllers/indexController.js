const moment = require('moment')
const expenseModel = require("../models/Expense")
const multer = require('multer')

exports.registerRoute = (req, res) => {
    res.render("register", {
        layout: 'register'
    })
}

exports.loginRoute = (req, res) => {
    res.render("login", {
        layout: 'login'
    })
}

exports.getDashBoard = async (req, res) => {
    try {
        res.render("dashboard", {
            name: req.user.firstName
        })
    }
    catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

exports.postDashBoard = async (req, res, next) => {
    if (typeof req.file !== 'undefined') {
        const newExpense = new expenseModel({
            userId: req.user.id,
            category: req.body.category,
            itemName: req.body.itemName,
            price: req.body.price,
            productImage: req.file.path,
            lat: req.body.lat,
            lon: req.body.lon
        })
        newExpense.save()
            .then(doc => {
                console.log("Insertion success")
            })
            .catch(err => console.log(err))
    }
    else {
        const newExpense = new expenseModel({
            userId: req.user.id,
            category: req.body.category,
            itemName: req.body.itemName,
            price: req.body.price,
            lat: req.body.lat,
            lon: req.body.lon
        })
        newExpense.save()
            .then(doc => {
                console.log("Insertion success")
            })
            .catch(err => console.log(err))
    }
    try {
        const expenses = await expenseModel.find({ userId: req.user.id })
        res.render("dashboard", {
            name: req.user.firstName
        })
    }
    catch (err) {
        console.log("OOPS")
        console.error(err)
        res.render('error/500')
    }
}

exports.getTrend = async (req, res) => {
    var locations = [];
    try {
        const expenses = await expenseModel.find({ userId: req.user.id })
        expenses.forEach(e1 => {
            locations.push({
                lat: parseFloat(e1.lat),
                lng: parseFloat(e1.lon)
            })
        })
        res.render("map", {
            name: req.user.firstName,
            locations: locations,
            apiUrl: "https://maps.googleapis.com/maps/api/js?key=" + process.env.API_KEY + "&callback=initMap&v=weekly&channel=2"
        })
    }
    catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find({ userId: req.user.id })
        res.render("expenses", {
            name: req.user.firstName,
            expenses: expenses,
            date: moment().format("D.MM.YY")
        })
    }
    catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

exports.filterExpenses = async (req, res) => {
    console.log(req.user.id);
    try {
        const expenses = await expenseModel.find({ userId: req.user.id })
        const arr = (req.body.dateFilter).split("-");
        dateval = arr[2] + "." + arr[1] + "." + arr[0].slice(2)
        res.render("expenses", {
            name: req.user.firstName,
            expenses: expenses,
            date: dateval
        })
    }
    catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

exports.deleteExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.remove({ _id: req.body.uid })
        const allExpenses = await expenseModel.find({ userId: req.user.id })
        res.render("expenses", {
            name: req.user.firstName,
            expenses: allExpenses,
            date: moment().format("D.MM.YY")
        })
    }
    catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

exports.getAnalysis = async (req, res) => {
    console.log("ID (GET /analysis): ", req.user.id)
    const expenses = await expenseModel.find({ userId: req.user.id })
    res.render("analysis", {
        name: req.user.firstName,
        expenses: expenses,
        moment: moment
    })
}