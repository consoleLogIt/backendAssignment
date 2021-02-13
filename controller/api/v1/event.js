const unStructureData = require("../../../model/unstructuredData");
const Events = require("../../../model/event");
var mongoose = require("mongoose");
//create_event
module.exports.create_event = async (req, res) => {
  console.log(req.body);

  try {
    const event = await Events.create(req.body);

    return res.json(200, {
      message: "event created",
      id: event._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error", err });
  }
};

//delete_event
module.exports.delete_event = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Events.findById({ _id: id });

    await unStructureData.deleteMany({
      _id: {
        $in: [
          event.joiningInfo && event.joiningInfo._id,
          event.readingMaterialsResource && event.readingMaterialsResource._id,
          event.aboutTheEvent && event.aboutTheEvent._id,
        ],
      },
    });

    await event.remove();

    return res.status(200).json({ message: "event deleted" });
  } catch (err) {
    return res.status(500).json({ message: "internal error ", err });
  }
};

//get event
module.exports.get_event = async (req, res) => {
  try {
    let event = await Events.findById(req.params.id).populate(
      "readingMaterialsResource joiningInfo aboutTheEvent"
    );

    if(!event){
      return res.status(404).json({message:"not found"})
    }

    return res.status(200).json({ message: "event details", event });
  } catch (err) {
    console.log(err, "error");

    return res.status(500).json({message:"internal server error"})
  }
};





//event_update
module.exports.update_event = async (req, res) => {


  try {
    let event_doc = await Events.findById(req.params.id);

    const { aboutTheEvent, readingMaterialsResource, joiningInfo } = req.body;

    
    if (joiningInfo || (req.files && req.files.joiningInfo)) {
      let joiningInfo_doc = await unStructureData.findOneAndUpdate(
        event_doc.joiningInfo
          ? { _id: event_doc.joiningInfo }
          : { _id: new mongoose.Types.ObjectId() },
        {
          data: joiningInfo && req.body.joiningInfo.data,
          files: req.files && req.files.joiningInfo,
        },
        { upsert: true, new: true }
      );

      req.body.joiningInfo = joiningInfo_doc._id;
    }



    if (
      readingMaterialsResource ||
      (req.files && req.files.readingMaterialsResource)
    ) {
      let readingMaterialsResource_doc = await unStructureData.findOneAndUpdate(
        event_doc.readingMaterialsResource
          ? { _id: event_doc.readingMaterialsResource }
          : { _id: new mongoose.Types.ObjectId() },
        {
          data:
            readingMaterialsResource && req.body.readingMaterialsResource.data,
          files: req.files && req.files.readingMaterialsResource,
        },
        { upsert: true, new: true }
      );

      req.body.readingMaterialsResource = readingMaterialsResource_doc._id;
    }



    if (aboutTheEvent || (req.files && req.files.aboutTheEvent)) {
      let aboutTheEvent_doc = await unStructureData.findOneAndUpdate(
        event_doc.aboutTheEvent
          ? { _id: event_doc.aboutTheEvent }
          : { _id: new mongoose.Types.ObjectId() },
        {
          data: aboutTheEvent && req.body.aboutTheEvent.data,
          files: req.files && req.files.aboutTheEvent,
        },
        { upsert: true, new: true }
      );

      event_doc.aboutTheEvent = aboutTheEvent_doc._id;
    }



    if (req.files && req.files.speakersDetails) {
      if (!req.body.speakersDetails) req.body.speakersDetails = {};

      req.body.speakersDetails.files = req.files.speakersDetails;
    }

    if (req.files && req.files.moderatorDetails) {
      if (!req.body.moderatorDetails) req.body.moderatorDetails = {};

      req.body.moderatorDetails.files = req.files.moderatorDetails;
    }

   let updated_doc = await Events.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updated_doc, "updated");

    return res.status(200).json({ message: "updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error", err: err });
  }
};
