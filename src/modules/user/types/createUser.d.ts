export interface ICreateUser {
    email: string
    password: string
    confirmPassword: string
    name: string
    individualNumber: string
    workerNumber: string
    address: {
        street: string
        number: number
        complement: string | null
        city: string
        state: string
        country: string
        zip: string
    }
}
