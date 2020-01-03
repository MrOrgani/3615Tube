import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity("users")

//every time the server starts Typeorm checks similarity of declared entities (like this one)
//and if necessary updates the databse --> to add a previously unexisting nonnullable column
//you need to connect to databse CLI (see READ ME) and either drop table DELETE FROM users or add a new column with default value manually
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
  // @Column("text", { nullable: true, default: "Hi there" }) description: string; // A VIRER
  @Column("varchar", { length: 255, default: "English" }) language: string;
  @Column("simple-array", { nullable: true }) seenFilms: string[];
  // @Column("simple-array", { nullable: true }) toWatchFilms: string[];
  @Column("text", { nullable: true }) id42: string;
  @Column("text", { nullable: true }) idGoogle: string;
}
