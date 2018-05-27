import { Router } from 'express'

let router = Router();
const TITLE = "LED Audio Visualization";

router.get("/", (req, res, next) => {
  res.render("index", { title : TITLE });
});

router.get("/demo", (req, res, next) => {
  res.render("demo", { title: TITLE + ": Demo" });
});

router.get("/practice", (req, res, next) => {
  res.render("folder/practice", { title: TITLE + " with ESP8266" });
});

export default router;