const { Router } = require("express");
const router = Router();

const noteDAO = require('../daos/note');
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

router.post("/", async (req, res, next) => {
    const note = await noteDAO.create(req.text, req.userId)
    if (note) {
      res.json(note);
    } else {
      res.status(401).send('Something went wrong');
  }
})

router.get("/", async (req, res, next) => {
    const notes = await noteDAO.getAll(req.userId);
    if (notes) {
      res.json(notes);
    } else {
      res.status(401).send('Something went wrong');
  }
})

router.get("/:id", async (req, res, next) => {
  const note = await noteDAO.getById(req.userId, req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(400).send('Invalid id');
  }
});

module.exports = router;