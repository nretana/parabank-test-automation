
export interface User {
    role: "member" | "admin" 
    username: string
    password: string
    firstName: string
    lastName: string
}

export interface TestCredentials {
    valid: User[]
    invalid: User[]
}