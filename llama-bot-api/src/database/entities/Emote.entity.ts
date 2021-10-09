import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  url!: string;
}
