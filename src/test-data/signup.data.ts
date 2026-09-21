import { TestCredentials } from '@@types/user'

export const TEST_USER_REGISTRATION: TestCredentials = {
    valid: [{
         firstName: "Jane",
         lastName: "Doe",
         address: "123 Main St",
         city: "San Jose",
         state: "CA",
         zipCode: "12345",
         phone: "1234567890",
         ssn: "123-45-6789",
         username: "janedoe" + Date.now(),
         password: "demo1234",
         confirm: "demo1234"
    }],
    invalid: [{
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        ssn: "",
        username: "",
        password: "",
        confirm: ""
    }]
}