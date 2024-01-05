import mongoose from "mongoose";


// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Create a new Mongoose schema named 'userSchema'
// Creates a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, and accessToken, specifying their data types, validation rules, and default values.
const imageSchema = new Schema(
    {
        folderName: {
            type: String, // String to store the folder name
            required: true // Make it a required field
        },
        name: {
            type: [String], // Array of strings to store image URLs
            default: [] // Defaults to an empty array  
        },
        imagePaths: {
            type: [String], // Array of strings to store image URLs
            default: [] // Defaults to an empty array  
        },
        filmPaths: {
            type: [String], // Array of strings to store film URLs
            default: [] // Defaults to an empty array
        },
    },
    {
        timestamps: true,
    }
);

// Create a Mongoose model named 'UserModel' based on the 'userSchema' for the 'users' collection
// This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.
export const ImageModel = mongoose.model("Image", imageSchema);

// In summary, this code defines a Mongoose schema (userSchema) that describes the structure of documents for users in a MongoDB collection. It also creates a Mongoose model (UserModel) associated with the "users" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting user documents.