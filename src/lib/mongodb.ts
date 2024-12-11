// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/caltech2';

interface MongoConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongoConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Connection status tracking
export const connectionStatus = {
  isConnected: false,
  lastError: null as Error | null,
  lastConnectionAttempt: null as Date | null,
};

const connectDB = async () => {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    connectionStatus.lastConnectionAttempt = new Date();
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('New MongoDB connection established');
        connectionStatus.isConnected = true;
        connectionStatus.lastError = null;
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        connectionStatus.isConnected = false;
        connectionStatus.lastError = error;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
  connectionStatus.isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  connectionStatus.isConnected = false;
  connectionStatus.lastError = err;
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  connectionStatus.isConnected = false;
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Change the export to make connectDB the default export
export default connectDB;
export { mongoose };