import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "Sem token de autenticação" });
      return;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      res.status(401).json({ error: "Erro no token" });
      return;
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ error: "Token mal formatado" });
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET || "secret",
      (err, decoded: any) => {
        if (err) {
          return res.status(401).json({ error: "Token inválido" });
        }

        if (!allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ error: "Sem permissão" });
        }

        req.user = decoded;
        next();
      }
    );
  };
};
