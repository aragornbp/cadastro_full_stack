import { getRounds, hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Contact} from "./contact.entity";


@Entity('client')
export class Client{
  @PrimaryGeneratedColumn("uuid")
  id: String

  @Column({length:127, unique: true})
  email: string;

  @Column({length: 127})
  name: string;

  @Column({unique: true})
  phone: string

  @CreateDateColumn()
  created_at: Date

  @Column({length: 127})
  password: string

  @OneToMany(()=> Contact, (contact)=> contact.id)
  contacts : Contact[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);

    if (!isEncrypted) this.password = hashSync(this.password, 10);
  }
}