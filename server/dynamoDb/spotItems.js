var AWS = require("aws-sdk");
const {accessKeyId,secretAccessKey} = require('../../secrets')
let awsConfig = {
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId,
  secretAccessKey
};
AWS.config.update(awsConfig);
const DynamoDB = new AWS.DynamoDB();

// const DynamoDB = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();

async function createTable() {
  const params = {
    TableName: "alalala",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  return await DynamoDB.createTable(params).promise();
}
// (async ()=>{
//   console.log('the func call', await createTable());
// })()
let save = function () {
const spotsArr = [
  {
    id: "1",
    name: "Brest Fortress",
    image:
      "https://www.warhistoryonline.com/wp-content/uploads/2018/06/00-brestfortress-1280x720.jpg",
    description:
      "Brest Fortress, formerly known as Brest-Litoŭsk Fortress, is a 19th-century fortress in Brest in present-day Belarus.",
  },
  {
    id: "2",
    name: "Pripyatsky National Park",
    image:
      "https://alchetron.com/cdn/pripyatsky-national-park-15c62b2a-a030-41b6-95f9-92571a7d848-resize-750.jpeg",
    description:
      "Pripyatsky National Park or Pripyat National Park in a natural reserve in Gomel Region, Belarus.",
  },
  {
    id: "3",
    name: "Braslav Lake Area",
    image:
      "https://www.worldfortravel.com/wp-content/uploads/2013/03/Braslav-Lakes-National-Park.jpg",
    description:
      "Braslaw Lakes is one of the four national parks in Belarus. The national park was set up in September 1995.",
  },
  {
    id: "4",
    name: "Belovezhskaya Pushcha National Park",
    image: "https://www.belarus.by/dadvimages/000738_403723.jpg",
    description:
      "Białowieża Forest is one of the last and largest remaining parts of the immense primeval forest that once stretched across the European Plain. ",
  },
  {
    id: "5",
    name: "Mir Castle",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mir_castle_in_spring.JPG/405px-Mir_castle_in_spring.JPG",
    description:
      "The Mir Castle Complex is a UNESCO World Heritage site in Belarus.",
  },
  {
    id: "6",
    name: "Pripyatsky National Park",
    image:
      "https://lp-cms-production.imgix.net/2019-06/e2e2859f731ae7f6ea45b2855dc35fa7-pripyatsky-national-park.jpg",
    description:
      "Pripyatsky National Park or Pripyat National Park in a natural reserve in Gomel Region, Belarus.",
  },
  {
    id: "7",
    name: "Nesvizh",
    image: "https://www.belarus.by/dadvimages/000746_240332.jpg",
    description:
      "Nesvizh, Niasviž is a city in Belarus. It is the administrative centre of the Nyasvizh District of Minsk Region and site of Niasviž Castle a World Heritage Site.",
  },
  {
    id: "8",
    name: "Grodno",
    image:
      "https://www.collinsdictionary.com/images/full/grodno_555160693_1000.jpg",
    description:
      "Grodno is a city in western Belarus, near the Polish and Lithuanian borders. By the Neman River, the Old Castle is a Renaissance palace on the site of an 11th-century fort. Nearby, the New Castle was built in the 18th century as a royal residence.",
  },
  {
    id: "9",
    name: "Minsk",
    image:
      "https://www.weather-atlas.com/weather/images/city/4/4/244844-1500.jpg",
    description:
      "Minsk is the capital and largest city of Belarus, located on the Svislač and the Nyamiha Rivers. As the capital, Minsk has a special administrative status in Belarus and is the administrative centre of Minsk Region and Minsk District",
  },
  {
    id: "10",
    name: "Barysaw",
    image:
      "https://cdn.britannica.com/54/151254-004-E0E13E75/Orthodox-church-Barysaw-Belarus.jpg",
    description:
      "Barysaw is a city in Belarus situated near the Berezina River in the Minsk Region. With a population of around 145,000, it lies around 74 km northeast of Minsk",
  },
];

//creating items in the table test
spotsArr.forEach(async (spot) => {
    try {
     const res= await docClient.put({ TableName: "orders", Item: spot }).promise();
    console.log('the res is',res) 
    } catch (error) {
        console.error(error)
    }
    });

}
// save();
module.exports = {
    save,createTable
}