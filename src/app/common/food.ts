export class Food {
  constructor(
    public foodName: string,
    public image: string,
    public active: boolean,
    public dateCreated: Date,
    public dateUpdate: Date
  ) {}
}
