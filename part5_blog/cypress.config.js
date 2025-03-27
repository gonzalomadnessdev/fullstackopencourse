import { defineConfig } from 'cypress'
import mongoose from 'mongoose'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async connectMongo() {
          const dbUri ='mongodb+srv://gonzalohralbornoz:oC2zl1YwfBL3cJZU@cluster0.vqa2x.mongodb.net/testing' // Replace with your actual DB URI

          if (mongoose.connection.readyState === 1) {
            return 'Already connected to MongoDB'
          }

          try {
            await mongoose.connect(dbUri, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            return 'Connected to MongoDB'
          } catch (error) {
            return `MongoDB connection error: ${error.message}`
          }
        },

        async clearCollection(collectionName) {
          try {
            await mongoose.connection.collection(collectionName).deleteMany({})
            return `Cleared collection: ${collectionName}`
          } catch (error) {
            return `Error clearing collection: ${error.message}`
          }
        },

        async createDocument({ collectionName, data }) {
          try {
            const collection = mongoose.connection.collection(collectionName)
            const result = await collection.insertOne(data)
            return result.insertedId.toString()// Return the inserted document ID
          } catch (error) {
            return `Error inserting document: ${error.message}`
          }
        },

        async createMany({ collectionName, list }) {
          try {
            const collection = mongoose.connection.collection(collectionName)
            const results = await collection.insertMany(list)
            return results// Return the inserted document ID
          } catch (error) {
            return `Error inserting documents: ${error.message}`
          }
        },

        async disconnectMongo() {
          try {
            await mongoose.disconnect()
            return 'Disconnected from MongoDB'
          } catch (error) {
            return `MongoDB disconnection error: ${error.message}`
          }
        }
      })
    },
  },
})
