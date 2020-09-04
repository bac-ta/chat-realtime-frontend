export class User{
  constructor(username: any, password: any, accessToken: any, message: any) {
    this.username = username;
    this.password = password;
    this.accessToken = accessToken;
    this.message = message;
  }

  username: string;
  password: string;
  accessToken: string;
  message: string;
}
