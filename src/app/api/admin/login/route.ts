import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Read from config file
    let adminUsername = "Admin";
    let adminPassword = "Shomzy123";
    try {
      const configPath = path.join(process.cwd(), "src/config/admin.json");
      const configData = await fs.readFile(configPath, "utf-8");
      const config = JSON.parse(configData);
      adminUsername = config.username;
      adminPassword = config.password;
    } catch (e) {
      console.warn("Could not read admin.json, falling back to defaults.");
    }
    
    if (username === adminUsername && password === adminPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
