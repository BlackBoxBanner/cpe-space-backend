import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { env } from "@/utils/env";

export const mailerSend = new MailerSend({
  apiKey: env.MAILERSEND_API_KEY,
})

export const sentFrom = new Sender(env.MAILERSEND_MAIL, "CPE-SPACE");

export const setRecipients = (...props: Recipient[]) => {
  return props.map((recipient) => {
    return new Recipient(recipient.email, recipient.name)
  })
}

export const emailParamsServer = new EmailParams()
  .setFrom(sentFrom)
