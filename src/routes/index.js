import { Router } from 'express'
import * as CONSTS from '../util/Consts'

/** get router instance */
let router = Router();

router.get("/", (req, res, next) => {
  res.render("index", { title : CONSTS.TITLE });
});

router.get("/demo", (req, res, next) => {
  res.render("demo", { title: CONSTS.TITLE + ": Demo" });
});

router.get("/practice", (req, res, next) => {
  res.render("folder/visualization", { title: CONSTS.TITLE + " with ESP8266" });
});

export default router;