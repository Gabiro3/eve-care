import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Utility to load email templates
async function loadTemplate(role) {
  const templateName =
    role === 'DOCTOR' ? 'doctor-welcome-email.html' : 'patient-welcome-email.html';
  const filePath = path.join(process.cwd(), 'emails', templateName);
  return fs.readFile(filePath, 'utf-8');
}

export async function POST(request) {
  try {
    const { email, name = '', role } = await request.json();
    const html = await loadTemplate(role);

    await resend.emails.send({
      from: 'Eve Care <care@evehealth.app>',
      to: email,
      subject:
        role === 'DOCTOR'
          ? `Welcome aboard, Dr. ${name}!`
          : `Welcome to Eve Care, ${name}!`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 });
  }
}
