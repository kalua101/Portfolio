import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');

// GET - Retrieve all messages
export async function GET() {
  try {
    const fileData = await fs.readFile(messagesFilePath, 'utf8');
    const messages = JSON.parse(fileData);
    return NextResponse.json(messages);
  } catch (error) {
    // If file doesn't exist, return empty array
    return NextResponse.json([]);
  }
}

// POST - Save a new message
export async function POST(request: Request) {
  try {
    const newMessage = await request.json();
    
    let messages = [];
    try {
      const fileData = await fs.readFile(messagesFilePath, 'utf8');
      messages = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }
    
    // Add new message
    messages.unshift(newMessage); // Add to beginning so newest is first
    
    // Save to file
    await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 });
  }
}

// DELETE - Delete a message by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    const fileData = await fs.readFile(messagesFilePath, 'utf8');
    let messages = JSON.parse(fileData);
    
    // Filter out the message with the given ID
    messages = messages.filter((msg: any) => msg.id !== id);
    
    // Save back to file
    await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
