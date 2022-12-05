export interface IUpdateUser {
    email: string
    password: string
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
