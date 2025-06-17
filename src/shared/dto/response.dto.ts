export class ResponseDto {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    this.status = status;
    this.data = data;
  }
}
