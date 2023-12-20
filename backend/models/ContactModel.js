import mongoose from "mongoose";

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Create a new Mongoose schema named 'taskSchema'
// Creates a new Mongoose schema named taskSchema that defines the structure of a document in the MongoDB collection. It includes fields like task, createdAt, and done, specifying their data types, validation rules, and default values.
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model named 'TaskModel' based on the 'taskSchema' for the 'tasks' collection
// This model is used to interact with the "tasks" collection in the MongoDB database. It allows you to perform CRUD operations on documents in that collection and provides methods for data validation based on the schema.
export const ContactModel = mongoose.model("Contact", contactSchema);

// In summary, this code defines a Mongoose schema (taskSchema) that describes the structure of documents for tasks in a MongoDB collection. It also creates a Mongoose model (TaskModel) associated with the "tasks" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting tasks.