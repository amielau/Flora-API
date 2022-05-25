require('dotenv').config()
import { start } from './app'

const PORT = 3030

start()
  .then((app) => {
    app.listen(PORT, () => {
      console.log('Listening on PORT:', PORT)
    })
  })
  .catch((err) => {
    console.log('There was an error', JSON.stringify(err))
  })
