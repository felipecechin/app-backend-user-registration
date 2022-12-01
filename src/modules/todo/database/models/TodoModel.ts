import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('todos')
export class TodoModel {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date

    @Column({
        type: 'datetime',
        nullable: true,
        default: null,
    })
    startedAt: Date | null

    @Column({
        type: 'float',
        nullable: true,
        default: null,
    })
    workTime: number | null

    @Column({
        default: false,
    })
    done: boolean
}
