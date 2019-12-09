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
  @PrimaryColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) firstName: string;
  @Column("varchar", { length: 255 }) lastName: string;
  @Column("varchar", { length: 255 }) email: string;
  @Column("varchar", { length: 255 }) login: string;
  @Column("text") password: string;
  @Column("boolean", { default: false })
  verified: boolean;
  @Column("varchar", { length: 255 }) confirmLink: string;

  @BeforeInsert() //runs before a new user is created
  addId() {
    this.id = uuidv4();
  }
}
