import App from './app'

const port = process.env.PORT || 5000

App.startServer()
  .then(app => app.listen(port))
  .then(() => console.log('Online:', port))
  .catch(console.error)
