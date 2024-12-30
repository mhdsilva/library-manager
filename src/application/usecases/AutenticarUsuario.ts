import { RepositorioDeUsuarios } from "../ports/RepositorioDeUsuarios";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

export class AutenticarUsuario {
  constructor(private readonly repositorioDeUsuarios: RepositorioDeUsuarios) {}

  async executar(email: string, password: string): Promise<string> {
    const usuario = await this.repositorioDeUsuarios.findByEmail(email);

    if (!usuario) {
      throw new Error("Credenciais inválidas");
    }

    const senhaCorreta = await compare(password, usuario.getPassword());

    if (!senhaCorreta) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      {
        id: usuario.getId(),
        role: usuario.getRole(),
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return token;
  }
}
