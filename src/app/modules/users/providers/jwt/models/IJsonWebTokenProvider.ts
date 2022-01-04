export interface IJsonWebTokenProvider {
  generate(id: string): Promise<string>
}
