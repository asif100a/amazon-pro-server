import env from 'dotenv';
env.config();
import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bu1vbif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Collection of DB
    const gamingAccessoriesCollection = client.db('Amazon-pro').collection('gammingAccessories');
    const homeEssentialsCollection = client.db('Amazon-pro').collection('homeEssentials');

    // Read all Gaming Accessories data
    app.get('/gaming-accessories', async(req, res) => {
      const data = await gamingAccessoriesCollection.find().toArray();
      res.json(data);
    });

    // Read all Home Essentials data
    app.get('/home-essentials', async(req, res) => {
      const data = await homeEssentialsCollection.find().toArray();
      res.json(data);
    })

    app.delete('/delete', async(req, res) => {
      const result = await homeEssentialsCollection.deleteMany();
      res.send(result);
    })

    app.post('/insert', async(req, res) => {
      console.log('Fake data:', )
      // const result = await homeEssentialsCollection.insertMany();
      // res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Check the server if it is running
app.get('/', (req, res) => {
    const response = {message: 'The server is running'};
    res.send(response);
});

// Listen the port
app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
});