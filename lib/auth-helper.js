// lib/auth-helper.ts
import { cookies } from "next/headers";
import "server-only"; // Prevents this from leaking to client components
import { User } from "@/models/User";
import { verifyToken } from "./jwt";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return {
      error: "Authentication required!",
      status: 401,
      user: null,
    };
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return {
        error: "Account not found!",
        status: 401,
        user: null,
      };
    }

    return { user, error: null, status: 200 };
  } catch (error) {
    return {
      error: "Invalid token!",
      status: 401,
      user: null,
    };
  }
}
