import { NonRetriableError } from "inngest";
import Ticket from "../../models/ticket.js";
import inngest from "../client.js";
import { sendMail } from "../../utils/mailer.js";
import analyzeTicket from "../../utils/ai.js";
import User from "../../models/user.js";

export const onTicketCreated = inngest.createFunction(
    { id: "on-ticket-created", retries: 2 },
    { event: "ticket/created" },
    async ({event, step}) => {
        try {
            const { ticketId } = event.data

            const ticket = await step.run("fetch-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketId)

                if(!ticketObject) 
                    throw new NonRetriableError("Ticket not found")

                return ticketObject;
            });

            await step.run("update-ticket-status", async () => {
                await Ticket.findByIdAndUpdate(ticket._id, {status: "TODO"})
            });

            const aiResponse = await analyzeTicket(ticket)

            const relatedskills = await step.run("ai-processing", async () => {
                let skills = []
                if(aiResponse) {
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        priority: !["low", "medium", "high"].includes(aiResponse.priority) ? "medium" : aiResponse.priority,
                        helpfulNotes: aiResponse.helpfulNotes,
                        status: "IN_PROGRESS",
                        relatedSkills: aiResponse.relatedSkills
                    })

                    skills = aiResponse.relatedSkills
                }
                console.log(skills);
                
                return skills
            })

            const moderator = await step.run("assign-moderator", async () => {
                
                let user = await User.findOne({
                    role: 'moderator',
                    skills: {
                        $elemMatch: {
                            $regex: relatedskills.join("|"),
                            $options: "i"
                        },
                    },
                });

                if(!user) {
                    user = await User.findOne({
                        role: "admin"
                    });
                }

                await Ticket.findByIdAndUpdate(ticket._id, {
                    assignedTo: user?._id || null 
                });

                return user
            });

            await step.run("send-email-notification", async () => {
                if(moderator) {
                    const finalTicket = await Ticket.findById(ticket._id)
                    await sendMail(
                        moderator.email,
                        "Ticket Assigned",
                        `A new ticket is assigned to you ${finalTicket.title}`
                    )
                }
            })

            return {success: true}
        } catch (error) {
            console.error("Error running the step: ", error.message)
            return {success: false}
        }
    }
)