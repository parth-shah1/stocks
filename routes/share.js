const express = require("express");

const router = express.Router();

const shareController = require("../controllers/share");

const isauth = require("../middleware/is-auth");

router.get("/", shareController.getIndex);

router.get("/investment", isauth , shareController.getInvestment);

router.post("/investment", isauth , shareController.postInvestment);

router.get("/share", isauth , shareController.getShare);

router.post("/share", isauth , shareController.postShare);

router.get("/rankings", isauth, shareController.getRankings);

router.get("/technicals/:share", isauth, shareController.getGraph);

module.exports = router;