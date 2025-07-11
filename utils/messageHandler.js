// src/utils/messageHandler.js
const { sendWhatsAppMessage } = require("./twilioAPI");
const roomData = require("./roomData");

async function handleMessage(message) {
  const body = message?.data?.body?.toLowerCase() || "";
  const from = message.data.from;

  if (body.includes("menu") || body.includes("hi")) {
    return sendWhatsAppMessage(
      from,
      `👋 Welcome to *Mathanda Guest House*! Please choose an option:\n\n1️⃣ View Rooms\n2️⃣ Book a Room\n3️⃣ Get Directions\n\nReply with the number or keyword.`
    );
  }

  if (body.includes("1") || body.includes("rooms")) {
    const allRooms = Object.values(roomData)
      .map(
        (room) =>
          `🏠 *${room.name}*\n💲Price: $${room.price}\n📝 ${room.description}`
      )
      .join("\n\n");
    return sendWhatsAppMessage(from, allRooms);
  }

  return sendWhatsAppMessage(
    from,
    "🤖 Sorry, I didn’t understand that. Type *menu* to see options."
  );
}

module.exports = { handleMessage };
