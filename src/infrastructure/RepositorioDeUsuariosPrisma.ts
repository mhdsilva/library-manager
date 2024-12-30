import { PrismaClient } from "@prisma/client";
import { User } from "../domain/User";
import { RepositorioDeUsuarios } from "../application/ports/RepositorioDeUsuarios";

export class RepositorioDeUsuariosPrisma implements RepositorioDeUsuarios {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByEmail(email: string): Promise<User | null> {
    const usuario = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!usuario) return null;

    return new User(
      usuario.id,
      usuario.email,
      usuario.password,
      usuario.role as "reader" | "admin"
    );
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.getId(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const usuario = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!usuario) return null;

    return new User(
      usuario.id,
      usuario.email,
      usuario.password,
      usuario.role as "reader" | "admin"
    );
  }
}
