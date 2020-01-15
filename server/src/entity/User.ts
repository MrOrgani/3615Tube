import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

//every time the server starts Typeorm checks similarity of declared entities (like this one)
//and if necessary updates the databse --> to add a previously unexisting nonnullable column
//you need to connect to databse CLI (see READ ME) and either drop table DELETE FROM users or add a new column with default value manually
@Entity("users")
export class User extends BaseEntity {
  //extends BaseEntity allows to use User.Create({}) to create one
  @PrimaryColumn() id: string;
  @Column("varchar", { length: 255 }) firstName: string;
  @Column("varchar", { length: 255 }) lastName: string;
  @Column("varchar", { length: 255, unique: true }) email: string;
  @Column("varchar", { length: 255, unique: true }) login: string;
  @Column("text") password: string;
  @Column("boolean", { default: false }) verified: boolean;
  @Column("text", { nullable: true }) avatar: string;
  @Column("varchar", { length: 255, default: "en" }) language: string;
  @Column("simple-array", { default: [] }) seenFilms: string[];
  // @Column("simple-array", { nullable: true }) toWatchFilms: string[];
  @Column("text", { nullable: true, unique: true }) id42: string;
  @Column("text", { nullable: true, unique: true }) idGoogle: string;
}
