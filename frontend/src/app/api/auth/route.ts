import { NextResponse } from "next/server";

// In a real application, you'd use a more secure approach with proper hashing
// This is a simplified version for demonstration purposes
const ADMIN_PASSWORD = "portfolio-admin-2023";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // Set a simple token - in a real app you'd use JWT or similar
      return NextResponse.json({
        success: true,
        token: Buffer.from(`auth-${Date.now()}`).toString("base64"),
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}
