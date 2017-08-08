export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  picture: any;

  constructor(){}

  public static isNull(user: User): boolean {
    return user.username === null && user.password === null;
  }
}
