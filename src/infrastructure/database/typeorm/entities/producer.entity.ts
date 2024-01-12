import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('producers')
@Unique(["document"])
export default class ProducerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  document: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}