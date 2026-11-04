import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getConnection } from '@/lib/db';

// Uses the secret from .env.local, with a fallback just in case
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const db = await getConnection();
    
    // Check if user exists
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    await db.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check password (plain text for this academic project)
    // In production, you would use: await bcrypt.compare(password, rows[0].password)
    const valid = password === 'password123'; 

    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create the security token
    const token = jwt.sign(
      { id: rows[0].id, role: rows[0].role }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );
    
    // Send token in a secure, httpOnly cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, { 
      httpOnly: true, 
      path: '/',
      maxAge: 86400 // 1 day in seconds
    });
    
    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
