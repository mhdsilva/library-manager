import { RepositorioDeUsuarios } from "../ports/RepositorioDeUsuarios";
import { User } from "../../domain/User";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";

interface CriarUsuarioDTO {
  email: string;
  password: string;
  role: "reader" | "admin";
}

export class CriarUsuario {
  constructor(private readonly repositorioDeUsuarios: RepositorioDeUsuarios) {}

  async executar({ email, password, role }: CriarUsuarioDTO): Promise<void> {
    const usuarioExistente = await this.repositorioDeUsuarios.findByEmail(
      email
    );

    if (usuarioExistente) {
      throw new Error("Usuário já existe");
    }

    const senhaHash = await hash(password, 10);
    const usuario = new User(randomUUID(), email, senhaHash, role);

    await this.repositorioDeUsuarios.save(usuario);
  }
}
