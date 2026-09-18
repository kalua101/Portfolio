import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const portfolioFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

// GET - Retrieve all messages
export async function GET() {
  try {
    const fileData = await fs.readFile(portfolioFilePath, 'utf8');
    const data = JSON.parse(fileData);
    return NextResponse.json(data.messages || []);
  } catch (error) {
    console.error('Error reading messages:', error);
    return NextResponse.json([]);
  }
}

// POST - Save a new message
export async function POST(request: Request) {
  try {
    const newMessage = await request.json();
    
    // Read current portfolio data
    const fileData = await fs.readFile(portfolioFilePath, 'utf8');
    const data = JSON.parse(fileData);
    
    // Initialize messages array if it doesn't exist
    if (!data.messages) {
      data.messages = [];
    }
    
    // Add new message to the beginning
    data.messages.unshift(newMessage);
    
    // Save back to file
    await fs.writeFile(portfolioFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error),
      message: 'Failed to save message' 
    }, { status: 500 });
  }
}

// DELETE - Delete a message by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    // Read current portfolio data
    const fileData = await fs.readFile(portfolioFilePath, 'utf8');
    const data = JSON.parse(fileData);
    
    if (!data.messages) {
      return NextResponse.json({ success: false, error: 'No messages found' }, { status: 404 });
    }
    
    // Filter out the message with the given ID
    data.messages = data.messages.filter((msg: any) => msg.id !== id);
    
    // Save back to file
    await fs.writeFile(portfolioFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
