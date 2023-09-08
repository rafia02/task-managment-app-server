const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const teamsCollection = client.db("taskManagementApp").collection("teams")

    app.post("/users", async (req, res) => {
      const body = req.body
      console.log(body)
      const result = await usersCollection.insertOne(body)
      res.send(result)
    })

    app.get("/users", async (req, res) => {
      const filter = {}
      const result = await usersCollection.find(filter).toArray()
      res.send(result)
    })


    app.get("/users/id", async (req, res) => {
      const email = req.query.email
      const filter = { email: email }
      const result = await usersCollection.findOne(filter)
      res.send(result)
    })




    app.post("/teams", async (req, res) => {
      const body = req.body
      console.log(body)
      const result = await teamsCollection.insertOne(body)
      res.send(result)
    })


    app.get("/teams", async (req, res) => {
      const email = req.query.email
      console.log(email)
      const filter = { admin: email }
      const result = await teamsCollection.findOne(filter)
      res.send(result)
    })






    app.post("/tasks", async (req, res) => {
      const body = req.body
      console.log(body)
      const result = await tasksCollection.insertOne(body)
      res.send(result)
    })

    app.patch("/tasks/:id", async (req, res) => {
      const id = req.params.id
      const newConditon = req.body.completed
      console.log(newConditon)
      const filter = { _id: new ObjectId(id) }
      const update = {
        $set: {
          completed: newConditon
        }
      }
      const result = await tasksCollection.updateOne(filter, update)
      res.send(result)
    })


    app.get("/tasks", async (req, res) => {
      const email = req.query.email
      const filter = { email: email }
      const result = await tasksCollection.find(filter).toArray()
      res.send(result)
    })


    app.get("/tasks/filter", async (req, res) => {
      const email = req.query.email
      const filter = { email: email,
        completed: true
      }
      const result = await tasksCollection.find(filter).toArray()
      res.send(result)
    })

    app.get("/tasks/filter/pending", async (req, res) => {
      const email = req.query.email
      const filter = { email: email,
        completed: false
      }
      const result = await tasksCollection.find(filter).toArray()
      res.send(result)
    })










  }
  finally {

  }
}
run().catch(console.dir);










app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})