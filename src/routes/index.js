import { Router } from 'express'

let router = Router();
router.get("/", (req, res, next) => {
  res.render("index", {title : "Express ES6"});
});


export default router;
