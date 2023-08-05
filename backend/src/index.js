const config = require('./utils/config')
const app = require('./app')
const debug = require('debug')('weathermap');


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})