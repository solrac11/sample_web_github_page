// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactService } from '@/services/contactService';
import { debugLog } from '@/lib/debug';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendEmails(data: ContactRequest) {
  // Send to admin
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_EMAIL_TO,
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <h3 style="color: #374151;">Message:</h3>
          <p style="white-space: pre-wrap;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    `
  });

  // Send auto-response
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.email,
    subject: 'Thank you for contacting us',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ffffff; padding: 20px;">
          <h2 style="color: #2563eb;">Thank You for Contacting Us</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p>
          <div style="margin: 20px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Your Message:</h3>
            <p style="white-space: pre-wrap;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>Best regards,<br>${process.env.COMPANY_NAME || 'The Team'}</p>
        </div>
      </div>
    `
  });
}

export async function POST(request: Request) {
  try {
    debugLog.contact.start();
    
    const body: ContactRequest = await request.json();
    debugLog.contact.receivedData(body);
    
    // Create new contact using service
    const contact = await ContactService.create(body);
    debugLog.contact.savedContact(contact);

    // Send emails
    await sendEmails(body);
    debugLog.contact.emailSent();

    return NextResponse.json({
      message: 'Your message has been sent successfully!',
      id: contact._id
    });

  } catch (error) {
    debugLog.contact.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process your request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await ContactService.getAllContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
