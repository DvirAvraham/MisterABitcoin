export class Move {
  constructor(
    public id: string,
    public toId: string = '',
    public to: string = '',
    public at: number,
    public amount: number = 0
  ) {}
}
