import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity
} from "typeorm";
import uuidv4 from "uuid/v4";

@Entity("users")
//extends BaseEntity allows to use User.Create({}) to create one
export class User extends BaseEntity {
  @PrimaryColumn() id: string;

  @Column("varchar", { length: 255 }) firstName: string;
  @Column("varchar", { length: 255 }) lastName: string;
  @Column("varchar", { length: 255, unique: true }) email: string;
  @Column("varchar", { length: 255 }) login: string;
  @Column("text") password: string;
  @Column("boolean", { default: false })
  verified: boolean;
  @Column("text", { nullable: true }) avatar: string;
  @Column("text", { nullable: true, default: "Hi there" }) description: string;
  @Column("varchar", { length: 255, default: "English" }) language: string;
  @Column("simple-array", { nullable: true }) seenFilms: string[];
  @BeforeInsert() //runs before a new user is created
  addId() {
    this.id = uuidv4();
  }
}
