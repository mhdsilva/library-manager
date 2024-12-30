import { User } from "../../domain/User";

export interface RepositorioDeUsuarios {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}
