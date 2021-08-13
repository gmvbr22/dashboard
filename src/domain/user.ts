export class User {
  private id?: string;
  private name?: string;
  private email?: string;
  private password?: string;

  public setEmailPassword(email?: string, password?: string): User {
    this.email = email;
    this.password = password;
    return this;
  }

  public toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
