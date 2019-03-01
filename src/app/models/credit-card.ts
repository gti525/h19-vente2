export class CreditCard {
  public constructor(init?: Partial<CreditCard>) {
    Object.assign(this, init);
  }
    name: string;
    number: string;
    cvv: string;
    expiration: string;
  }