const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();


// Connection URL and Database Name
const username = encodeURIComponent(process.env.DB_UNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${username}:${password}@cluster0.kf2qhwd.mongodb.net/?retryWrites=true&w=majority`; // Update with your MongoDB URI if hosted remotely
const dbName = 'Invitu'; // Update with your desired database name
const collectionName = 'users'; // Update with your desired collection name

// Initialize MongoDB client
const client = new MongoClient(uri);

let db; // This will hold the connection to the database

// Helper function to connect to the database
const connectToDatabase = async () => {
    try {
        if (!db) {
            await client.connect();
            db = client.db(dbName);
            console.log('Connected to database successfully');
        }
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

// Function to add a new object to the MongoDB collection
const addObject = async (newObject, collectionName) => {
    try {
        await connectToDatabase();
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(newObject);
        console.log('Object added successfully!');
        return result.insertedId; // Return the ObjectId of the inserted document
    } catch (err) {
        console.error('Failed to add object:', err);
        return null; // Return null in case of an error
    }
};


// Function to fetch objects based on parameters
const fetchObjectsByParam = async (paramKey, paramValue, collectionName) => {
    try {
        await connectToDatabase();
        const collection = db.collection(collectionName);
        const filteredObjects = await collection.find({ [paramKey]: paramValue }).toArray();
        return filteredObjects;
    } catch (err) {
        console.error('Failed to fetch objects:', err);
        return [];
    }
};

// Function to get all objects from the MongoDB collection
const getAllObjects = async () => {
    try {
        await connectToDatabase();
        const collection = db.collection(collectionName);
        const allObjects = await collection.find({}).toArray();
        return allObjects;
    } catch (err) {
        console.error('Failed to get objects:', err);
        return [];
    }
};

const getUserWithSession = async (sessionId) => {
    try {
        //const user = fetchObjectsByParam("_id", sessionId, "sessions");
        await connectToDatabase();
        const collection = db.collection("sessions");
        const filteredObjects = await collection.find({ _id : new ObjectId(sessionId) }).toArray();
        const userCollection = db.collection("users");
        const user = await userCollection.find({_id : new ObjectId(filteredObjects[0].id)}).toArray();
        delete user[0].password
        return user[0];
    } catch (error) {
        console.log(error);
        return false;     
    }
}

const updateDocumentwithId = async (collectionName, documentId, parameter, value) => {
    try {
        // const document = await fetchObjectsByParam("_id", new ObjectId(documentId),collectionName);
        // console.log(document[0]._id.toString());

        await connectToDatabase();
        const collection = db.collection(collectionName);
        const update = { 
            $set: {
                [parameter]: value,  
            } 
        }; // Replace with your update data
        
        const filter = { _id: new ObjectId(documentId) };

        const result = await collection.updateOne(filter, update);
        console.log(result);
        if(result.modifiedCount > 0) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Export the functions for external usage
module.exports = { addObject, fetchObjectsByParam, getAllObjects, getUserWithSession, updateDocumentwithId };