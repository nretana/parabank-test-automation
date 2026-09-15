import { TestCredentials } from '../@types/user'

export const TEST_USER_CREDENTIALS: TestCredentials = {
    valid: [{
        role: "member",
        username: "john",
        password: "demo",
        firstName: "John",
        lastName: "Smith"
    }], 
    invalid: [{
        role: "member",
        username: "invalid_user_xyz",
        password: "WrongPassword999!",
        firstName: "guest",
        lastName: "guest"
    }]
}