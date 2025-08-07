import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('holi, g40')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
