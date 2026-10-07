import type { CustomerLookup } from "@@types/user";
import type { TestData } from "@@types/test-data";

export const customerLookup: TestData<CustomerLookup> = {
  valid: [
    {
      firstName: "John",
      lastName: "Smith",
      address: "1431 Main St",
      city: "Beverly Hills",
      state: "CA",
      zipCode: "90210",
      ssn: "312-45-6789",
    },
  ],
  invalid: [
    {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      ssn: "",
    },
    {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "San Jose",
      state: "CA",
      zipCode: "12345",
      ssn: "a123-45-67898765",
    },
  ],
};

export const customerLookupValidatorErrors = {
  firstNameRequired: "First name is required.",
  lastNameRequired: "Last name is required.",
  addressRequired: "Address is required.",
  cityRequired: "City is required.",
  stateRequired: "State is required.",
  zipCodeRequired: "Zip Code is required.",
  ssnRequired: "Social Security Number is required."
};

export const customerLookupError = {
  header: "Error!",
  message: "The customer information provided could not be found."
}

export const customerLookupForm = {
  header: "Customer Lookup",
  message: "Please fill out the following information in order to validate your account."
}

export const customerLookupConfirmation = {
  header: "",
  message: "Your login information was located successfully. You are now logged in."
}