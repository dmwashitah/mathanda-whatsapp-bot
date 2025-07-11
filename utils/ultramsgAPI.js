const axios = require("axios");

const ULTRAMSG_INSTANCE_ID = process.env.ULTRAMSG_INSTANCE_ID;
const ULTRAMSG_TOKEN = process.env.ULTRAMSG_TOKEN;

async function sendWhatsAppMessage(to, message) {
  try {
    const response = await axios.post(
      `https://api.ultramsg.com/${ULTRAMSG_INSTANCE_ID}/messages/chat`,
      {
        to,
        body: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ULTRAMSG_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendWhatsAppMessage };
