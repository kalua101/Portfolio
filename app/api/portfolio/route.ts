import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'data', 'portfolio.json');

// GET - Read portfolio data
export async function GET() {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    const portfolio = JSON.parse(data);
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// POST - Save portfolio data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await writeFile(DATA_FILE, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true, message: 'Portfolio data saved successfully!' });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
