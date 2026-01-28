import jwt from "jsonwebtoken";

export const generateToken = (payload: string | object) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "300d",
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
};

