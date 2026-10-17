export interface BillPayFormEntry {
  payeeName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  accountNumber:  string;
  verifyAccountNumber: string;
  amount: number | string
}
