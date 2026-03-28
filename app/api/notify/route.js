import { connectDB } from "@/lib/db";
import { Tenant } from "@/models/Tenant";
import { NextResponse } from "next/server";
import twilio from "twilio";

// Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const sendWhatsApp = async (to, from) => {
  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: `whatsapp:${to}`,
    body: message,
  });
};

// Main Handler
export async function GET(req) {
  await connectDB();

  const tenants = await Tenant.find();
  const today = new Date();

  for (const tenant of tenants) {
    const dueDate = new Date(tenant.rentDueDate);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil((diffTime / 1000) * 60 * 60 * 24);

    const alreadySentToday =
      tenant.lastNotified &&
      new Date(tenant.lastNotified).toDateString() === today.toDateString();

    if (alreadySentToday) return NextResponse;

    if (diffDays === 3) {
      await sendWhatsApp(
        tenant.phone,
        `Reminder: Hi ${tenant.name}, rent is due in 3  days.`,
      );

      return NextResponse;
    }

    if (diffDays === 0) {
      await sendWhatsApp(
        tenant.phone,
        `Reminder: Hi ${tenant.name}, rent is due today. Please make your payment`,
      );

      return NextResponse;
    }

    if (diffDays < 0) {
      await sendWhatsApp(
        tenant.phone,
        `Reminder: Hi ${tenant.name}, rent is OVERDUE. Please make your payment.`,
      );
    }

    tenant.lastNotified = new Date();
    await tenant.save();
  }

  return NextResponse.json(
    { message: "Notification processed" },
    { status: 201 },
  );
}
