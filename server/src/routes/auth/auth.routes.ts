import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { asyncHandler } from "../../utils/asyncHandler";
import { clerkClient, getAuth } from "@clerk/express";
import { AppError } from "../../utils/AppError";
import { User } from "../../models/User";
import { ok } from "../../utils/envelope";

export const authRouter = Router();

/**
 * @route   POST /auth/sync
 * @desc    Sync authenticated Clerk user with local DB
 * @access  Private
 *
 * Flow:
 * 1. Get user from Clerk
 * 2. Extract email + name
 * 3. Check if user exists in DB
 * 4. Assign role (admin/user)
 * 5. Upsert user into DB
 */
authRouter.post(
  "/sync",
  requireAuth,

  asyncHandler(async (req, res) => {
    // Get authenticated Clerk user ID from request
    const { userId } = getAuth(req);

    if (!userId) {
      throw new AppError(401, "User is not logged in.");
    }

    // Fetch full user data from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);
    console.log(clerkUser);

    // Try to get primary email, fallback to first available email
    const extractEmailFromUserInfo =
      clerkUser.emailAddresses.find(
        (item) => item.id === clerkUser.primaryEmailAddressId,
      ) ?? clerkUser.emailAddresses[0];

    if (!extractEmailFromUserInfo) {
      throw new AppError(400, "No email found for user");
    }

    const email = extractEmailFromUserInfo.emailAddress;

    // Build full name safely (ignore null/undefined values)
    const fullName = [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    // Fallback to username if full name is empty
    const name = fullName || clerkUser.username;

    /**
     * Parse admin emails from ENV
     * Example: ADMIN_EMAILS=admin@gmail.com,owner@gmail.com
     */
    const raw = process.env.ADMIN_EMAILS || "";
    const adminEmails = new Set(
      raw
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean),
    );

    // Check if user already exists in DB
    const existingUser = await User.findOne({ clerkUserId: userId });

    // Determine if current user should be admin
    const shouldBeAdmin = email ? adminEmails.has(email.toLowerCase()) : false;

    /**
     * Role logic:
     * - If already admin → keep admin
     * - Else if email matches admin list → promote to admin
     * - Else keep existing role or default to "user"
     */
    const nextRole =
      existingUser?.role === "admin"
        ? "admin"
        : shouldBeAdmin
          ? "admin"
          : existingUser?.role || "user";

    /**
     * Upsert user:
     * - If exists → update
     * - If not → create new
     */
    const newlyCreatedDbUser = await User.findOneAndUpdate(
      {
        clerkUserId: userId,
      },
      {
        clerkUserId: userId,
        email,
        name,
        role: nextRole,
      },
      {
        new: true, // return updated document
        upsert: true, // create if not exists
        setDefaultsOnInsert: true,
      },
    );

    // Return normalized response
    res.status(200).json(
      ok({
        user: {
          id: newlyCreatedDbUser._id,
          clerkUserId: newlyCreatedDbUser.clerkUserId,
          email: newlyCreatedDbUser.email,
          name: newlyCreatedDbUser.name,
          role: newlyCreatedDbUser.role,
        },
      }),
    );
  }),
);

/**
 * @route   GET /auth/me
 * @desc    Get current logged-in user from DB
 * @access  Private
 */
authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    // Get Clerk user ID
    const { userId } = getAuth(req);

    if (!userId) {
      throw new AppError(401, "User is not logged in.");
    }

    // Find user in local DB
    const dbUser = await User.findOne({ clerkUserId: userId });

    if (!dbUser) {
      throw new AppError(404, "User is not found in DB");
    }

    // Return user data
    res.status(200).json(
      ok({
        user: {
          id: dbUser._id,
          clerkUserId: dbUser.clerkUserId,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
        },
      }),
    );
  }),
);
