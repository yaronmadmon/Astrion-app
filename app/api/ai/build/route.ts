import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if prompt exists
    if (!body.prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    console.log("AI Received Prompt:", body.prompt);

    // Generate a fake ID for now so the router has a destination
    const mockAppId = "app_" + Math.random().toString(36).substring(7);

    return NextResponse.json({ 
      id: mockAppId, 
      success: true 
    }, { status: 200 }); // Status 200 = Green in terminal!

  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 500 });
  }
}