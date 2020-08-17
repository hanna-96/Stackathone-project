const router = require("express").Router();
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
});

const DynamoDB = new AWS.DynamoDB();
// let docClient = new AWS.DynamoDB.DocumentClient();
const {
  addSpot,
  getAllSpots,
  getSingleSpot,
  updateSpotDescription,
  deleteSpot,
} = require("../dynamoDb/main");

//get all spots
router.get("/spots", async (req, res, next) => {
  try {
    const data = await getAllSpots();
    res.send(data.Items);
  } catch (error) {
    console.error(next);
  }
});

router.get("/spots/:id", async (req, res, next) => {
  try {
    const id = req.params.id.toString();
    const singleSpot = await getSingleSpot(id);
    res.send(singleSpot.Item);
  } catch (error) {
    console.error(next);
  }
});

router.post("/spots", async (req, res, next) => {
  try {
    // const id = req.params.id.toString();
    const { id, name, image, description } = req.body;
    const newSpot = await addSpot(id, name, image, description);
    res.send(newSpot.Item);
  } catch (error) {
    console.error(next);
  }
});

router.put("/spots/:id", async (req, res, next) => {
  try {
    const id = req.params.id.toString();
    const { name, image, newdescription } = req.body;
    const updatedSpot = await updateSpotDescription(
      id,
      name,
      image,
      newdescription
    );
    res.send(updatedSpot.Item);
  } catch (error) {
    console.error(next);
  }
});
router.delete("/spots/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const spotToDelete = await deleteSpot(id);
    res.sendStatus(204);
  } catch (error) {
    console.error(next);
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
