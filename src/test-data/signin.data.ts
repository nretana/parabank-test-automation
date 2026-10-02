import type { TestData } from '@@types/test-data'
import type { User } from '@@types/user'

export const userCredentials: TestData<User> = {
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

export const signinErrors = {
    emptyValues: {
        header: "Error!",
        message: "Please enter a username and password."
    },
    incorrectValues: {
        header: "Error!",
        message: "The username and password could not be verified."
    },
    noActiveSession: {
        header: "Error!",
        message: "An internal error has occurred and has been logged."
    }
}

export const signedinConfirmation = {
    greetingMessage: (firstName: string, lastName: string) => `Welcome ${firstName} ${lastName}`
}