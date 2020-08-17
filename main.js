'use strict'

const {DynamoDb} = require('./server/dynamoDb/main')
const app = require('./server')
const PORT = 1337

// DynamoDb.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
//   .then(() => {
//     console.log('db synced')
    app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))
//   })
