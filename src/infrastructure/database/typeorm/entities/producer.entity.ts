import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('producers')
export default class ProducerModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  document: string
}