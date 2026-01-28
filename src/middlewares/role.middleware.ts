export const authorize =
    (...allowedRoles: any[]) =>
        (req: any, res: any, next: any) => {
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "Forbidden: insufficient permissions",
                });
            }
            next();
        };
