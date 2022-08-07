export default abstract class ConvertibleDocument<T> {
  constructor(protected readonly document: T, protected readonly contentType: string) {}

  abstract serialize(): Promise<string>;
}
