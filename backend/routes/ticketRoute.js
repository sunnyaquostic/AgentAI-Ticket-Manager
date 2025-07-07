import express from 'express'
import { 
    createTicket,
    getTicket, 
    getTickets 
} from '../controllers/ticketController.js'
import { authenticate } from '../middlewares/userAuth.js'

const router = express.Router()

router.route('/tickets')
    .get(authenticate, getTickets)
    .post(authenticate, createTicket)
router.route('/tickets/:id').get(authenticate, getTicket);



export default router