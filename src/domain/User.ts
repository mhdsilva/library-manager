export type UserRole = "reader" | "admin";

export class User {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly password: string,
    private readonly role: UserRole
  ) {}

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): UserRole {
    return this.role;
  }
}
