import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { AddressModel } from './AddressModel'

@Entity('users')
export class UserModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        name: 'individual_number',
    })
    individualNumber: string

    @Column({
        name: 'worker_number',
    })
    workerNumber: string

    @OneToOne(() => AddressModel, (address) => address.user, { cascade: true })
    address: AddressModel
}
