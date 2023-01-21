const checkAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next()
    }
    else {
        return res.send("You don't have access rights")
    }
}

const checkOrganizator = (req, res, next) => {
    if (req.user.role === 'organizator') {
        return next();
    }
    else {
        return res.send("You don't have access rights")
    }
}

export { checkAdmin, checkOrganizator }

