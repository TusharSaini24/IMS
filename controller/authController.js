exports.login = (req,res) => {
    res.render('login')
}

exports.postLogin = (req,res) => {
    // console.log(req.body);
    res.render('dashboard')
}