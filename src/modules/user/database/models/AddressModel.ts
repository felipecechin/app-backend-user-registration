import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserModel } from './UserModel'

@Entity('addresses')
export class AddressModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    country: string

    @Column()
    zip: string

    @Column()
    state: string

    @Column()
    city: string

    @Column()
    street: string

    @Column()
    number: number

    @Column({
        type: 'varchar',
        default: null,
        nullable: true,
    })
    complement: string | null

    @Column({
        name: 'user_id',
    })
    userId: number

    @OneToOne(() => UserModel, (user) => user.address)
    @JoinColumn({
        name: 'user_id',
    })
    user: UserModel
}
