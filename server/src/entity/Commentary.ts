import {Entity, Column, BaseEntity, CreateDateColumn, PrimaryGeneratedColumn,ManyToOne,JoinColumn} from "typeorm";
import {User} from './User'
@Entity()
export class Commentary extends BaseEntity {

    @PrimaryGeneratedColumn() id: number;

    @Column("varchar") film_id: string;
    @ManyToOne(type => User)
    @JoinColumn()
    author: User;

    @CreateDateColumn() createdAt: Date; // check TimeZone
    
    @Column("text") text: string;

}