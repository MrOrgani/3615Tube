import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity("films")

//every time the server starts Typeorm checks similarity of declared entities (like this one)
//and if necessary updates the databse --> to add a previously unexisting nonnullable column
//you need to connect to databse CLI (see READ ME) and either drop table DELETE FROM users or add a new column with default value manually
export class Film extends BaseEntity {
  //extends BaseEntity allows to use User.Create({}) to create one
  @PrimaryColumn() imdbId: string;
  @Column("varchar", { length: 255 }) title: string;
  @Column("int") year: number;
  @Column("text", { nullable: true }) synopsis: string;
  @Column("int") runtime: number;
  @Column("text", { nullable: true }) trailer: string;
  @Column("varchar", { nullable: true, array: true }) genres: string[];
  @Column("text") poster: string;
  @Column("int") rating: number;
  @Column("varchar", { nullable: true, array: true }) torrents: string[];
  @Column("bool", { nullable: true }) seen: boolean;
}
