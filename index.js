const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());


// initialize mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// Insert data to mongodb
async function insertData()
{
    try {
        await client.connect();
        const dbName = client.db('DoctorPortal');
        const serviceCollection = dbName.collection('services');
        const blogCollection = dbName.collection('blogs');
        const doctorCollection = dbName.collection('doctors');


        // Get api for services
        app.get('/services', async (req, res) =>
        {
            const cursor = serviceCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });


        // Get api for blogs
        app.get('/blogs', async (req, res) =>
        {
            const cursor = blogCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });


        // Get api for doctors
        app.get('/doctors', async (req, res) =>
        {
            const cursor = doctorCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        // Listen app
        app.listen(port, (req, res) =>
        {
            console.log("node server is running");
        });
    } finally {

    }
}
insertData();