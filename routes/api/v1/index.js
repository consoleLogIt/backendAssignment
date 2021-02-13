const express = require("express");
const multer = require("multer");
const router = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({
  storage: storage,
});

const event_controller = require("../../../controller/api/v1/event");

router.post("/create-event", event_controller.create_event);
router.get("/event/:id", event_controller.get_event);
router.delete("/delete/:id", event_controller.delete_event);


router.put(
  "/update/:id",
  upload.fields([
    { name: "readingMaterialsResource" },
    { name: "joiningInfo" },
    { name: "aboutTheEvent" },
    { name: "speakersDetails" },
    { name: "moderatorDetails" },
  ]),
  event_controller.update_event
);



module.exports = router;
