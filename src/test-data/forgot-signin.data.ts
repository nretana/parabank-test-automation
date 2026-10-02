import type { ForgotSignInInfo } from "@@types/user";
import type { TestData } from "@@types/test-data";

export const TEST_FORGOT_SIGNIN_INFO: TestData<ForgotSignInInfo> = {
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
      ssn: "123-45-67898765",
    },
  ],
};
