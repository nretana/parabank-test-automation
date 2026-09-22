
export interface User {
    role: "member" | "admin" 
    username: string
    password: string
    firstName: string
    lastName: string
}

export interface UserRegistration {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    phoneNumber: string
    ssn: string
    username: string
    password: string
    passwordConfirmation: string
}