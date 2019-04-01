export class User {
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
  id: number;
  name: string;
  firstName: string;
  civicAddress: string;
  city: string;
  province: string;
  postalCode: string;
}