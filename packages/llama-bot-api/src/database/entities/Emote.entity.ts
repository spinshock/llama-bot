import { Column, Entity } from "typeorm";
import { BaseEntity } from "./Base.entity";

@Entity({ name: "Emotes" })
export class Emote extends BaseEntity {
  @Column({ nullable: false, unique: true })
  code!: string;

  @Column({ nullable: false })
  url!: string;

  @Column({ type: "integer", default: 0 })
  count!: number;

  @Column({ nullable: false })
  author!: string;
}
