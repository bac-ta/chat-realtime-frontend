export class ProfileResponse {
  name: string;
  description: string;
  avatar: string;
  constructor(name: string, description: string, avatar: string) {
    this.description = description;
    this.avatar = avatar;
    this.name = name;
  }
}
