export class CreditCard {
  public constructor(init?: Partial<CreditCard>) {
    Object.assign(this, init);
  }
    firstName: string;
    name: string;
    number: string;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
  }