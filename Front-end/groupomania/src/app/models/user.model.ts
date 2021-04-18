export class User {
  constructor(
    public userId: number,
    public token: string,
    public isAdmin: boolean,
    public email: string,
    public pseudo: string,
    public password: string
  ) {
  }
}
