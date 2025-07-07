import app from "./app.js";
import { configDotenv} from 'dotenv';
import { connectMongoDatabase } from "./config/db.js";

configDotenv({
    path: "config/config.env",
})

connectMongoDatabase()

// Handle uncaught exception errors
process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Server is shutting down due to uncaught exception errors`);
    process.exit(1)    
})

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to unhandled promise rejection`)
    server.close(() => {
        process.exit(1)
    })
})