import { NonRetriableError } from "inngest";
import User from "../../models/user.js";
import inngest from "../client.js";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
    {id: "on-user-signup", retries: 2},
    {event: "user/signup"},
    async ({ event, step }) => {
        try {
            const {email} = event.data
            const user = await step.run("get-user-email", async() => {
                const userObject = await User.findOne({email})
                if(!userObject)
                    throw new NonRetriableError("User not found")

                return userObject
            })

            await step.run("send-welcome-email", async () => {
                const subject = "Welcome Message"
                const message = `Hi,
                 \n\n
                 Thanks for signing up. We are glad to have you onboard!
                `

                await sendMail(user.email, subject, message)
            })

            return {success: true}
        } catch (error) {
            console.error("Error running step: ", error.message)
            return {success: false}
        }
    }
)