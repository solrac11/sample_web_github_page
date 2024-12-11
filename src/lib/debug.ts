// lib/debug.ts
export const debugLog = {
    contact: {
      start: () => console.log('Connecting to MongoDB...'),
      connected: () => console.log('Connected successfully'),
      receivedData: (data: any) => console.log('Received data:', data),
      savedContact: (contact: any) => console.log('Saved contact:', contact),
      emailSent: () => console.log('Emails sent successfully'),
      error: (error: any) => console.error('Contact form error:', error)
    }
  };