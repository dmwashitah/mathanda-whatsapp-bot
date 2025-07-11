// src/utils/twilioAPI.js
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;

const client = twilio(accountSid, authToken);

async function sendWhatsAppMessage(to, body) {
  try {
    const message = await client.messages.create({
      from: whatsappFrom,
      to: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
      body,
    });
    console.log("Message sent via Twilio:", message.sid);
    return message;
  } catch (error) {
    console.error("Twilio sendWhatsAppMessage error:", error);
    throw error;
  }
}

module.exports = { sendWhatsAppMessage };
