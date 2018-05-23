import { Router } from 'express'

let router = Router();
const TITLE = "Audio Visualization";
router.get("/", (req, res, next) => {
  res.render("index", {title : TITLE});
});

router.get("/demo", (req, res, next) => {
  res.render("demo", {title: TITLE + ": Demo"});
});


export default router;
