import { start } from './app.js'

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
