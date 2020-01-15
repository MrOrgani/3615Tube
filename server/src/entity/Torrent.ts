import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn } from "typeorm";

@Entity("torrent")
export class Torrent extends BaseEntity {
  @PrimaryGeneratedColumn() id: string;
  @Column() infoHash: string;
  @CreateDateColumn({type: 'timestamp'}) createdAt: Date;
}
