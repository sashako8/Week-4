const { Router } = require("express");
const router = Router();

const userDAO = require('../daos/user');
const tokenDAO = require('../daos/token');

router.use(async function isLoggedIn (req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        req.token = token;
        if (req.token) {
            const userId = await tokenDAO.getUser(req.token);
            if (userId) {
                res.sendStatus(200);
                next();
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        } 
    } else {
        res.sendStatus(401);
    }
})

router.post("/signup", async (req, res, next) => {
    const password = req.password;
    if (!req.password || req.password === "") {
        res.status(400).send('Please provide a password'); 
    } else {
        const savedUser = await userDAO.create(req.email, password);
        if (savedUser = true) {
            res.sendStatus(200);
        }
    }
})

router.post("/", async (req, res, next) => {
    const email = req.email;
    const password = req.password;
    if (!password) {
        res.status(400).send('Please provide a password');
    }
    const user = await userDAO.getById(email);
    if (user) {
        const token = await tokenDAO.create(email, password);
    } else {
        res.status(401).send('Passwords have to match');
    }
})

router.post("/password", async (req, res, next) => {
    const password = req.password;
    if (!password || password === "") {
        res.status(400).send('Please provide a password'); 
    } else {
        const updatedUser = await userDAO.updateById(req.userId, password);
        res.sendStatus(200);
    }
})

router.post("/logout", async (req, res, next) => {
    const logout = await tokenDAO.remove(req.token);
    if (logout) {
        res.sendStatus(200);
    } else {
        throw (e);
    }
})

module.exports = router;
