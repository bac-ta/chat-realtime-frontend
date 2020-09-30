export class FileResponse {
  file_name: string;
  file_uri: string;
  file_type: string;
  constructor(file_name: string, file_uri: string) {
    this.file_name = file_name;
    this.file_uri = file_uri;
  }
}
