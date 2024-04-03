export class Card {
  constructor(
    public id: number,
    public dateCreated: Date,
    public dateUpdated: Date,
    public tempFood?: string
  ) {}
}
