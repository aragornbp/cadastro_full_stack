import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Client} from "./client.entity";

@Entity('contact')
export class Contact{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({length:127, unique: true})
  email: string;

  @Column({length: 127})
  name: string;

  @Column({unique: true})
  phone: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(()=> Client, {onDelete: "CASCADE"})
  client: string

  
}