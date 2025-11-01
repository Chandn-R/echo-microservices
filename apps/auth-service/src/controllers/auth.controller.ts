import type { Request, Response } from "express";
import asyncHandler from "../../../../libs/utilities/asyncHandler.js";
import ApiError from "../../../../libs/utilities/apiError.js";
import ApiResponses from "../../../../libs/utilities/apiResponses.js";
import jwt from "jsonwebtoken";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import type { StringValue } from "ms";
import { users, type User } from "../../../../libs/db/schema/index.js";


const refreshToken = (id: string) => {
    return jwt.sign(
        { id: id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY! as StringValue | number }
    )
};

const accessToken = (id: string) => {
    return jwt.sign(
        { id: id },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! as StringValue | number }
    )
};

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;
    const db = req.app.locals.db;

    if (!name || !username || !email || !password) {
        throw new ApiError(404, "Please fill all the fields");
    }

    const existingUser = await db.select().from(users).where(or(eq(users.userName, username), eq(users.email, email))).limit(1);

    if (existingUser.length > 0) {
        throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createNewUser = await db.insert(users).values({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
    }).returning({ id: users.userId });

    if (!createNewUser[0]) {
        throw new ApiError(400, "User not created");
    }
    res.status(201).json(
        new ApiResponses(
            201,
            createNewUser[0],
            "User created"
        )
    );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const db = req.app.locals.db;


    if (!email || !password) {
        throw new ApiError(400, "Please provide email and password");
    }

    const user: User = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if (!user) {
        throw new ApiError(401, "User with this email does not exist");
    }

    const hashedPassword = user.password as string;
    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
        throw new ApiError(401, "Invalid Password");
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
        domain: "localhost",
        path: "/",
    };

    res.cookie("refreshToken", refreshToken(user.userId), cookieOptions);

    // logger.info("User logged in");
    console.log(accessToken(user.userId));

    return res.status(200).json(
        new ApiResponses(
            200,
            {
                id: user.userId,
                username: user.userName,
                email: user.email,
                name: user.name,
                accessToken: accessToken(user.userId),
            },
            "Login successful"
        )
    );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    // const user = req.user._id;

    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
    });

    // console.log(`User ${user} logged out`)
    // logger.info(`User ${user}logged out`);

    res.status(200).json(
        new ApiResponses(
            200,
            null,
            "Logout successful"));
});

export const refreshAccessToken = asyncHandler(
    async (req: Request, res: Response) => {
        const token = req.cookies?.refreshToken;
        const db = req.app.locals.db;


        if (!token) {
            throw new ApiError(401, "Refresh token missing");
        }

        let verifiedToken: any;
        try {
            verifiedToken = jwt.verify(
                token,
                process.env.REFRESH_TOKEN_SECRET as string
            );
        } catch (err) {
            throw new ApiError(403, "Invalid or expired refresh token");
        }

        console.log(verifiedToken.id);

        const user: User = await db.query.users.findFirst({
            where: eq(users.userId, verifiedToken.id)
        })

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        res.status(200).json(
            new ApiResponses(
                200,
                {
                    newAccessToken: accessToken(user.userId),
                },
                "New access token generated"
            )
        );
    }
);