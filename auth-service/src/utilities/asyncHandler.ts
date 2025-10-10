import type { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (func: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            await func(req, res, next);

        } catch (error: unknown) {
            const err = error as { message: string; statusCode: number };

            res.status(err.statusCode || 500).json({
                message: err.message,
                success: false,
            });

            console.log(err);
        }
    };
};

export default asyncHandler;