import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Producer from "../../../../domain/producer/entity/producer.entity"
import ProducerEntity from "./producer.entity"

@Entity('farms')
export default class FarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  producerId: string

  @Column({nullable: false})
  city: string

  @Column({nullable: false})
  state: string

  @Column({nullable: false})
  totalArea: number
  
  @Column({nullable: false})
  arableArea: number

  @Column({nullable: false})
  vegetationArea: number

  @Column({ type: 'simple-array', nullable: false })
  crops: string[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => ProducerEntity, producer => producer.farms)
  producer: Producer
}