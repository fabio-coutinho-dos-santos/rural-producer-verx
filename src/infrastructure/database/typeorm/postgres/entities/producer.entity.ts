import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import FarmEntity from "./farms.entity";
import Farm from "../../../../../domain/farm/entity/farm.entity";

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

  @OneToMany(() => FarmEntity, farm => farm.producer)
  farms: Farm[]
}