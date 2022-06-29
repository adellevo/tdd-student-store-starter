const app = require("./app")
const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
})
