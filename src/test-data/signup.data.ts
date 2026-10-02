import type { UserRegistration } from '@@types/user'
import type { TestData } from '@@types/test-data'
import { getRandomSSN } from '@utils/get-random-ssn'

export const TEST_USER_REGISTRATION: TestData<UserRegistration> = {
    valid: [{
         firstName: "Jane",
         lastName: "Doe",
         address: "123 Main St",
         city: "San Jose",
         state: "CA",
         zipCode: "12345",
         phoneNumber: "1234567890",
         ssn:  getRandomSSN(),
         username: "janedoe" + Date.now(),
         password: "janedemo",
         passwordConfirmation: "janedemo"
    }],
    invalid: [{
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
        passwordConfirmation: ""
    }]
}