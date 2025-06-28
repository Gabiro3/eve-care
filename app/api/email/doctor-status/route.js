import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

async function loadStatusTemplate(status) {
  const filename =
    status === "VERIFIED"
      ? "doctor-verified-email.html"
      : "doctor-rejected-email.html";

  const filePath = path.join(
    process.cwd(),
    "emails",
    filename
  );

  return fs.readFile(filePath, "utf-8");
}

export async function POST(request) {
  try {
    const { email, name = "", status } = await request.json();

    if (!["VERIFIED", "REJECTED"].includes(status)) {
      return new Response(
        JSON.stringify({ error: "Invalid status" }),
        { status: 400 }
      );
    }

    const html = await loadStatusTemplate(status);

    await resend.emails.send({
      from: "Eve Care <care@evehealth.app>",
      to: email,
      subject:
        status === "VERIFIED"
          ? `Welcome to Eve Care, Dr. ${name}!`
          : `Your Eve Care application status`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }
}
