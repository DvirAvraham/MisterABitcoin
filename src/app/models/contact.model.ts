export class Contact {
  constructor(
    public _id: string,
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public img: string = ''
  ) {}

  setId?(id: string) {
    this._id = id;
  }
}
