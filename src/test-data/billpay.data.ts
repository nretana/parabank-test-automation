export const billPay = {
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
      amount: "20.00",
      fromAccount: "12456",
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
      phone: "abc132536",
      accountNumber: "12345",
      verifyAccountNumber: "12345",
      amount: "50.00",
    }
  ],
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
};

export const billPayForm = {
  header: "Bill Payment Service",
  message: "Enter payee information",
};

export const billPayConfirmation = {
  header: "Bill Payment Complete",
  message: "Bill Payment to Electric Company in the amount of $50.00 from account 12345 was successful.",
  message2: "See Account Activity for more details.",
};