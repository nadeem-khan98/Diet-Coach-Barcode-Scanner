const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { saveScan } = require("../controllers/scanController");

router.post("/save", auth, saveScan);

module.exports = router;