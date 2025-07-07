import express from "express"
import cors from "cors"
import userRoutes from './routes/userRoute.js'
import ticketRoutes from './routes/ticketRoute.js'
import { serve } from 'inngest/express'
import inngest  from "./inngest/client.js"
import { onUserSignup } from "./inngest/functions/onSignUp.js"
import { onTicketCreated } from "./inngest/functions/onTicketCreate.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', userRoutes)
app.use('/api/v1', ticketRoutes)
app.use("/api/inngest", serve({
    client: inngest,
    functions: [onUserSignup, onTicketCreated]
}));

export default app

