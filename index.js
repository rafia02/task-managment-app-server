const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const port = 5000

var cors = require('cors')
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


async function run() {
  try {
    const uri = "mongodb+srv://rafia:Ym2WLtiVKtuJb3Mz@cluster0.uidcysm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });



    const usersCollection = client.db("taskManagementApp").collection("users")
    const tasksCollection = client.db("taskManagementApp").collection("tasks")

    app.post("/users", async(req, res)=>{
      const body = req.body
      console.log(body)
      const result = await usersCollection.insertOne(body)
      res.send(result)
    })

    app.get("/users", async(req, res)=>{
        const filter = {}
        const result = await usersCollection.find(filter).toArray()
        res.send(result)
    })

    app.post("/tasks", async(req, res)=>{
      const body = req.body
      console.log(body)
      const result = await tasksCollection.insertOne(body)
      res.send(result)
    })

    app.get("/tasks", async(req, res)=>{
        const email = req.query.email
        console.log(email)
        const filter = {email: email}
        const result = await tasksCollection.find(filter).toArray()
        res.send(result)
    })










  }
  finally{

  }
}
run().catch(console.dir);










app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})