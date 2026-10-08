export interface BillPayFormEntry {
  payeeName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  accountNumber: number;
  verifyAccountNumber: number;
  amount: number;
  fromAccountNumber: number
}
