import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 127 })
  email: string;

  @Column({ length: 127 })
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Client, { onDelete: "CASCADE" })
  client: string;
}
