import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
