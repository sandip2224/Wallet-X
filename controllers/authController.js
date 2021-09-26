exports.authCallback=(req, res)=>{
    res.redirect('/dashboard')
}

exports.logout=(req, res)=>{
    req.logOut()
    res.redirect('/dashboard')
}