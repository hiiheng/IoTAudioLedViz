"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var router = (0, _express.Router)();
var TITLE = "Audio Visualization";
router.get("/", function (req, res, next) {
  res.render("index", { title: TITLE });
});

router.get("/demo", function (req, res, next) {
  res.render("demo", { title: TITLE + ": Demo" });
});

exports.default = router;