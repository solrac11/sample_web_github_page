// app/api/mongodb-status/route.ts
import { NextResponse } from 'next/server';
import { connectDB, connectionStatus } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    const status = {
      isConnected: mongoose.connection.readyState === 1,
      readyState: mongoose.connection.readyState,
      databaseName: mongoose.connection.name,
      host: mongoose.connection.host,
      connectionStatus,
      lastConnectionAttempt: connectionStatus.lastConnectionAttempt,
      collections: Array.from(mongoose.connection.collections).map(([name]) => name),
      stats: {
        modelNames: mongoose.modelNames(),
        connectionReadyState: {
          0: 'disconnected',
          1: 'connected',
          2: 'connecting',
          3: 'disconnecting',
          99: 'uninitialized',
        }[mongoose.connection.readyState] || 'unknown'
      }
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error('Error checking MongoDB status:', error);
    return NextResponse.json({
      isConnected: false,
      error: error instanceof Error ? error.message : 'Failed to check MongoDB status',
      connectionStatus,
      lastError: connectionStatus.lastError?.message
    }, { status: 500 });
  }
}