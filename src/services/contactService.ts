// src/services/contactService.ts
import Contact, { IContact } from '@/models/Contact';
import connectDB from '@/lib/mongodb';

interface CreateContactData {
  name: string;
  email: string;
  message: string;
}

export class ContactService {
  static async create(data: CreateContactData): Promise<IContact> {
    await connectDB();
    return Contact.create({
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      status: 'pending'
    });
  }

  static async getAllContacts(): Promise<IContact[]> {
    await connectDB();
    return Contact.find().sort({ createdAt: -1 });
  }

  static async getContactById(id: string): Promise<IContact | null> {
    await connectDB();
    return Contact.findById(id);
  }

  static async updateStatus(id: string, status: IContact['status']): Promise<IContact | null> {
    await connectDB();
    return Contact.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );
  }

  static async addNote(id: string, note: string): Promise<IContact | null> {
    await connectDB();
    return Contact.findByIdAndUpdate(
      id,
      { notes: note, updatedAt: new Date() },
      { new: true }
    );
  }
}