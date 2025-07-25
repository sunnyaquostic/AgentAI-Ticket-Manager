import inngest from "../inngest/client.js";
import Ticket from "../models/ticket.js";

export const createTicket = async (req, res) => {
    try {
        const {title, description} = req.body

        if(!title || !description) 
            return res.status(400).json({
                message: "Title and Description are required"
            })

        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString()
        })

        await inngest.send({
            name: "ticket/created",
            data: {
                ticketId: (await newTicket)._id.toString(),
                title,
                description,
                createdBy: req.user._id.toString()
            }
        });

        return res.status(201).json({
            success: true,
            message: "Ticket created and processing started",
            ticket: newTicket
        })
        
    } catch (error) {
        console.error("Error creating ticket: ", error.message)
        return res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}

export const getTickets = async (req, res) => {

    try {
        const user = req.user

        let tickets = []

        if (user.role !== "user") {
            tickets = await Ticket.find({})
                .populate("assignedTo", ["email", "_id"])
                .sort({createdAt: -1})
        } else {
            tickets = await Ticket.find({createdBy: user._id})
                .select("title description status createdAt")
                .sort({createdAt: -1})
        }
        return res.status(200).json(tickets)
    } catch (err) {
        console.error("Error fetching tickets: ", err.message)
        return res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}

export const getTicket = async (req, res) => {
    try {
        const user = req.user
        
        let ticket;

        if(user.role !== "user") {
            ticket = await Ticket.findById(req.params.id)
                .populate("assignedTo", ["email",  "_id"])
        } else {
            ticket = await Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id
            }).select("title description status createdAt")
        }

        if (!ticket) 
            return res.status(404).json({
                success: true,
                message: "Ticket not found"
            })

        return res.status(200).json({ticket})
    } catch (err) {
        console.error("Error fetching tickets: ", err.message)
        return res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}