const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
});

const DynamoDB = new AWS.DynamoDB();
// let docClient = new AWS.DynamoDB.DocumentClient();

function createTable() {
  const params = {
    TableName: "Cities",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  DynamoDB.createTable(params,function (err, data) {
    if (err) {
     console.error("Unable to create table", err);
    } else {
      console.log("Created table", data);
    }
  }.promise());
}

function addSpot(id, name, image, description) {
  const params = {
    TableName: "Spots",
    Item: {
      id: { S: id },
      name: { S: name },
      image: { S: image },
      description: { S: description },
    },
  };

  DynamoDB.putItem(params, async function (err) {
    if (err) {
      console.error("Unable to add a spot", err);
    } else {
     await console.log(`Added ${name} to the database`);
    }
  }.promise());
}
//  node -e 'require("./app.js").addSpot("6","Dudutki Museum","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG2o6kndUhQc8PlvVL06sYMw1aivFK4JC2bV8bKcMiyjsX4qo4zfxjCBMColT0kT8bX7cyEnKfofGw5h32QpB-3ufDux-ogFEIIw&usqp=CAU&ec=45690275","Dudutki is a museum of Belarusian rural culture, which represented many national crafts - and even also about the people who fabricate this crafts.")'


//geting all Spots
function getAllSpots() {
  const params = {
    TableName: "Spots",
  };

  DynamoDB.scan(params, async function (err, data) {
    if (err) {
      console.error("Unable to find spot", err);
    } else {
      console.log(`Found ${data.Count} spots`);
     console.log( await data.Items);
    }
  }.promise());
}
//node -e 'require("./app.js").getAllSpots()'

//getimg a single spot
function getSingleSpot(id) {
  const params = {
    TableName: "Spots",
    Key: {
      id: { S: id },
    },
  };

  DynamoDB.getItem(params, async function (err, data) {
    if (err) {
      console.error("Unable to find spot", err);
    } else {
       console.log("Found a spot", await data);
    }
  }.promise());
}
//node -e 'require("./app.js").getSingleSpot("6")'


//update a spot

function updateSpotDescription(id, name, image, newdescription) {
  const params = {
    TableName: "Spots",
    Item: {
      id: { S: id },
      name: { S: name },
      image: { S: image },
      description: { S: newdescription },
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  DynamoDB.putItem(params, async function (err) {
    if (err) {
      console.error("Unable to find spot", err);
    } else {
    await console.log(`Updated ${name} with new description ${newdescription}`);
    }
  }.promise());
}
//   node -e 'require("./app.js").updateSpotDescription("8","Grodno","https://www.collinsdictionary.com/images/full/grodno_555160693_1000.jpg","will be added soon")'

//delete a spot

function deleteSpot(id) {
  const params = {
    TableName: "Spots",
    Key: {
      id: { S: id },
    },
  };

  DynamoDB.deleteItem(params, async function (err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
     await  console.log(`Deleted ${id}`);
    }
  }.promise());
}
//node -e 'require("./app.js").deleteSpot("6")'

module.exports = {
  createTable,
  addSpot,
  getAllSpots,
  getSingleSpot,
  updateSpotDescription,
  deleteSpot,
};
// node -e 'require("./app.js").addSpot("3","Braslav Lake Area","https://www.worldfortravel.com/wp-content/uploads/2013/03/Braslav-Lakes-National-Park.jpg","Braslaw Lakes is one of the four national parks in Belarus. The national park was set up in September 1995.")'
// node -e 'require("./app.js").addSpot("2","Pripyatsky National Park","https://alchetron.com/cdn/pripyatsky-national-park-15c62b2a-a030-41b6-95f9-92571a7d848-resize-750.jpeg","Pripyatsky National Park or Pripyat National Park in a natural reserve in Gomel Region, Belarus.")'
// node -e 'require("./app.js").addSpot("4","Belovezhskaya Pushcha National Park","https://www.belarus.by/dadvimages/000738_403723.jpg","Białowieża Forest is one of the last and largest remaining parts of the immense primeval forest that once stretched across the European Plain. ")'
// node -e 'require("./app.js").addSpot("5","Mir Castle","https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mir_castle_in_spring.JPG/405px-Mir_castle_in_spring.JPG", "The Mir Castle Complex is a UNESCO World Heritage site in Belarus.")'
// node -e 'require("./app.js").addSpot("6","Pripyatsky National Park",      "https://lp-cms-production.imgix.net/2019-06/e2e2859f731ae7f6ea45b2855dc35fa7-pripyatsky-national-park.jpg","Pripyatsky National Park or Pripyat National Park in a natural reserve in Gomel Region, Belarus.")'
// node -e 'require("./app.js").addSpot("7","Nesvizh","https://www.belarus.by/dadvimages/000746_240332.jpg","Nesvizh, Niasviž is a city in Belarus. It is the administrative centre of the Nyasvizh District of Minsk Region and site of Niasviž Castle a World Heritage Site.")'
// node -e 'require("./app.js").addSpot("8","Grodno","https://www.collinsdictionary.com/images/full/grodno_555160693_1000.jpg",      "Grodno is a city in western Belarus, near the Polish and Lithuanian borders. By the Neman River, the Old Castle is a Renaissance palace on the site of an 11th-century fort. Nearby, the New Castle was built in the 18th century as a royal residence.")'
// node -e 'require("./app.js").addSpot("9","Minsk", "https://www.weather-atlas.com/weather/images/city/4/4/244844-1500.jpg","Minsk is the capital and largest city of Belarus, located on the Svislač and the Nyamiha Rivers. As the capital, Minsk has a special administrative status in Belarus and is the administrative centre of Minsk Region and Minsk District")'
// node -e 'require("./app.js").addSpot("10","Barysaw","https://cdn.britannica.com/54/151254-004-E0E13E75/Orthodox-church-Barysaw-Belarus.jpg","Barysaw is a city in Belarus situated near the Berezina River in the Minsk Region. With a population of around 145,000, it lies around 74 km northeast of Minsk")'

// let docClient = new AWS.DynamoDB.DocumentClient();

// let save = function () {
// const spotsArr = [
//   {
//     id: "1",
//     name: "Brest Fortress",
//     image:
//       "https://www.warhistoryonline.com/wp-content/uploads/2018/06/00-brestfortress-1280x720.jpg",
//     description:
//       "Brest Fortress, formerly known as Brest-Litoŭsk Fortress, is a 19th-century fortress in Brest in present-day Belarus.",
//   },
//   {
//     id: "2",
//     name: "Pripyatsky National Park",
//     image:
//       "https://alchetron.com/cdn/pripyatsky-national-park-15c62b2a-a030-41b6-95f9-92571a7d848-resize-750.jpeg",
//     description:
//       "Pripyatsky National Park or Pripyat National Park in a natural reserve in Gomel Region, Belarus.",
//   },
//   {
//     id: "3",
//     name: "Braslav Lake Area,",
//     image:
//       "https://www.worldfortravel.com/wp-content/uploads/2013/03/Braslav-Lakes-National-Park.jpg",
//     description:
//       "Braslaw Lakes is one of the four national parks in Belarus. The national park was set up in September 1995.",
//   },
//   {
//     id: "4",
//     name: "Belovezhskaya Pushcha National Park",
//     image: "https://www.belarus.by/dadvimages/000738_403723.jpg",
//     description:
//       "Białowieża Forest is one of the last and largest remaining parts of the immense primeval forest that once stretched across the European Plain. ",
//   },
//   {
//     id: "5",
//     name: "Mir Castle",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mir_castle_in_spring.JPG/405px-Mir_castle_in_spring.JPG",
//     description:
//       "The Mir Castle Complex is a UNESCO World Heritage site in Belarus.",
//   },
//   {
//     id: "6",
//     name: "Pripyatsky National Park",
//     image:
//       "https://lp-cms-production.imgix.net/2019-06/e2e2859f731ae7f6ea45b2855dc35fa7-pripyatsky-national-park.jpg",
//     description:
//       "Pripyatsky National Park or Pripyat National Park in a natural reserve in Gomel Region, Belarus.",
//   },
//   {
//     id: "7",
//     name: "Nesvizh",
//     image: "https://www.belarus.by/dadvimages/000746_240332.jpg",
//     description:
//       "Nesvizh, Niasviž is a city in Belarus. It is the administrative centre of the Nyasvizh District of Minsk Region and site of Niasviž Castle a World Heritage Site.",
//   },
//   {
//     id: "8",
//     name: "Grodno",
//     image:
//       "https://www.collinsdictionary.com/images/full/grodno_555160693_1000.jpg",
//     description:
//       "Grodno is a city in western Belarus, near the Polish and Lithuanian borders. By the Neman River, the Old Castle is a Renaissance palace on the site of an 11th-century fort. Nearby, the New Castle was built in the 18th century as a royal residence.",
//   },
//   {
//     id: "9",
//     name: "Minsk",
//     image:
//       "https://www.weather-atlas.com/weather/images/city/4/4/244844-1500.jpg",
//     description:
//       "Minsk is the capital and largest city of Belarus, located on the Svislač and the Nyamiha Rivers. As the capital, Minsk has a special administrative status in Belarus and is the administrative centre of Minsk Region and Minsk District",
//   },
//   {
//     id: "10",
//     name: "Barysaw",
//     image:
//       "https://cdn.britannica.com/54/151254-004-E0E13E75/Orthodox-church-Barysaw-Belarus.jpg",
//     description:
//       "Barysaw is a city in Belarus situated near the Berezina River in the Minsk Region. With a population of around 145,000, it lies around 74 km northeast of Minsk",
//   },
// ];

// spotsArr.forEach(async (spot) => {
//     const res= await docClient.put({ TableName: "spots", Item: spot }).promise();
//     console.log('the res is',res)

//     });
// }
// save();
// spotsArr.forEach(async (spot) => {
//     const res= await DynamoDB.putItem({ TableName: "spots", Item: spot }).promise();
//     console.log('the res is',res)

//     });
