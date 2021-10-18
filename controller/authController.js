exports.login = (req,res) => {
    res.render('login')
}

exports.dashboard = (req,res) => {
    // console.log(req.body);
    res.render('dashboard')
}

exports.postLogin = (req,res) => {
    // console.log(req.body);
    res.redirect('/dashboard')
}