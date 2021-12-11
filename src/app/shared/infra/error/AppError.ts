export class AppError {
  private readonly message: string
  private readonly status: number

  constructor (message: string, status = 400) {
    this.message = message
    this.status = status
  }
}
