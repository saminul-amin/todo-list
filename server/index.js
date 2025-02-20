const express = require("express");
const cors = require("cors");
const WebSocket = require('ws');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5001;

const app = express();
const server = require("http").Server(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Broadcast function to send data to all connected clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("A client connected");

  // Listen for task update events (for example)
  ws.on("message", (message) => {
    console.log("Received message:", message);
    // Broadcast changes to all connected clients
    broadcast({ type: "TASK_UPDATED", data: message });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ty3g6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("todo-list");
    const userCollection = database.collection("users");
    const taskCollection = database.collection("tasks");

    // user related APIs
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User Already Exists", insertId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Get All Tasks
    app.get("/api/tasks", async (req, res) => {
      try {
        const tasks = await taskCollection.find({}).toArray();
        res.json(tasks);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
      }
    });

    // Add a New Task
    app.post("/api/tasks", async (req, res) => {
      try {
        const { title, category } = req.body;
        const newTask = { title, category, createdAt: new Date() };
        const result = await taskCollection.insertOne(newTask);
        res.status(201).json({ ...newTask, id: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: "Failed to add task" });
      }
    });

    // Update Task (Title or Category)
    app.put("/api/tasks/:id", async (req, res) => {
      try {
        const { title, category } = req.body;
        const taskId = req.params.id;
        const updateData = { title, category };
        await taskCollection.updateOne(
          { _id: new require("mongodb").ObjectId(taskId) },
          { $set: updateData }
        );
        res.sendStatus(200);
      } catch (err) {
        res.status(500).json({ error: "Failed to update task" });
      }
    });

    // Delete Task
    app.delete("/api/tasks/:id", async (req, res) => {
      try {
        const taskId = req.params.id;
        await taskCollection.deleteOne({
          _id: new require("mongodb").ObjectId(taskId),
        });
        res.sendStatus(200);
      } catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The Server is running...");
});

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
