import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserModel } from './UserModel'

@Entity('refresh_tokens')
export class RefreshTokenModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        name: 'user_id',
    })
    userId: number

    @ManyToOne(() => UserModel)
    @JoinColumn({ name: 'user_id' })
    user: UserModel

    @Column({
        name: 'refresh_token',
    })
    @Generated('uuid')
    refreshToken: string

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date

    @Column({
        name: 'expires_date',
    })
    expiresDate: Date
}
