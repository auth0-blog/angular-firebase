export class Comment {
  constructor(
    public user: string,
    public uid: string,
    public picture: string,
    public text: string,
    public timestamp: number
  ) {}
}
