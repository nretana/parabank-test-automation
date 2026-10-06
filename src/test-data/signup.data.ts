import type { UserRegistration } from "@@types/user";
import type { TestData } from "@@types/test-data";
import { getRandomSSN } from "@utils/get-random-ssn";

export const userRegistration = {
  getValidUser: (): UserRegistration => ({ 
      firstName: "Jane", 
      lastName: "Doe",
      address: "123 Main St",
      city: "San Jose",
      state: "CA",
      zipCode: "12345",
      phoneNumber: "1234567890",
      ssn: getRandomSSN(),
      username: "janedoe" + Date.now(),
      password: "janedemo",
      passwordConfirmation: "janedemo"
  }),
  invalid: [
    {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      ssn: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  ],
};

export const signupValidatorErrors = {
  firstNameRequired: "First name is required.",
  lastNameRequired: "Last name is required.",
  addressRequired: "Address is required.",
  cityRequired: "City is required.",
  stateRequired: "State is required.",
  zipCodeRequired: "Zip Code is required.",
  ssnRequired: "Social Security Number is required.",
  usernameRequired: "Username is required.",
  passwordRequired: "Password is required.",
  passwordConfirmationRequired: "Password confirmation is required.",
};

export const signupErrors = {
  incorrectValues: {
    header: "Error!",
    message: "The username and password could not be verified.",
  },
};

export const signupForm = {
  header: "Signing up is easy!",
  message: "If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information."
}

export const signupConfirmation = {
  header: (username: string): string => `Welcome ${username}`,
  message: "Your account was created successfully. You are now logged in.",
};
