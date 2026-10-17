import type { BillPayFormEntry } from "@@types/billpay";
import type { TestData } from "@@types/test-data";

export const billPayFormData: TestData<BillPayFormEntry> = {
  valid: [
    {
      payeeName: "Electric Company",
      address: "123 Main St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      phone: "5125550123",
      accountNumber: "12345",
      verifyAccountNumber: "12345",
      amount: 20,
    },
  ],
  invalid: [
    {
      payeeName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      accountNumber: "",
      verifyAccountNumber: "",
      amount: "",
    },
    {
      payeeName: "Electric Company",
      address: "123 Main St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      phone: "5125550123",
      accountNumber: "12345",
      verifyAccountNumber: "12345",
      amount: "@amount20",
    },
    {
      payeeName: "Electric Company",
      address: "123 Main St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      phone: "abc132536",
      accountNumber: "testwrongaccnum",
      verifyAccountNumber: "testwrongaccnum",
      amount: "9999999999999999999999999999999999999999999999",
    },
  ],
};

export const billPayLabels = {
  payeeNameLabel: "Payee Name:",
  addressLabel: "Address:",
  cityLabel: "City:",
  stateLabel: "State:",
  zipCodeLabel: "Zip Code:",
  phoneLabel: "Phone #:",
  accountNumberLabel: "Account #:",
  verifyAccountNumberLabel: "Verify Account #:",
  amountLabel: "Amount: $",
  fromAccountLabel: "From account #:",
};

export const billPayValidationErrors = {
  required: {
    payeeNameRequired: "Payee name is required.",
    addressRequired: "Address is required.",
    cityRequired: "City is required.",
    stateRequired: "State is required.",
    zipCodeRequired: "Zip Code is required.",
    phoneRequired: "Phone number is required.",
    accountNumberRequired: "Account number is required.",
    verifyAccountNumberRequired: "Account number is required.",
    amountRequired: "The amount cannot be empty.",
  },
  invalid: {
    accountNumberInvalid: "Please enter a valid number.",
    verifyAccountNumberInvalid: "Please enter a valid number.",
    amountInvalid: "Please enter a valid amount.",
  },
  mismatch: {
    verifyAccountNumberMismatch: "The account numbers do not match.",
  },
};

export const billPayForm = {
  header: "Bill Payment Service",
  message: "Enter payee information",
};

export const billPayConfirmation = {
  header: "Bill Payment Complete",
  message: (amount: number, fromAcc: string) => `Bill Payment to Electric Company in the amount of $${amount}.00 from account ${fromAcc} was successful.`,
  details: "See Account Activity for more details.",
};

export const billPayError = {
  header: "Error!",
  message: "An internal error has occurred and has been logged.",
};