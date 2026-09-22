import type { UserRegistration } from '@@types/user'
import type { TestData } from '@@types/test-data'

export const TEST_USER_REGISTRATION: TestData<UserRegistration> = {
    valid: [{
         firstName: "Jane",
         lastName: "Doe",
         address: "123 Main St",
         city: "San Jose",
         state: "CA",
         zipCode: "12345",
         phoneNumber: "1234567890",
         ssn: "123-45-6789",
         username: "janedoe" + Date.now(),
         password: "demo1234",
         passwordConfirmation: "demo1234"
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