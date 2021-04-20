export class User {
  constructor(
    public user_id: number,
    public token: string,
    public isAdmin: boolean,
    public email: string,
    public pseudo: string,
    public password: string,
    public dateCreation: string
  ) {
  }
}
