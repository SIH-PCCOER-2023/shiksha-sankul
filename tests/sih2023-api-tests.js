const newman = require('newman')
newman.run({
    collection: require('./sih2023.postman_collection.json'),
    reporters: 'cli',
  })