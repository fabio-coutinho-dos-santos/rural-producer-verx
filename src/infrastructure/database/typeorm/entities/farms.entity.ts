import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import CropEntity from "./crop"
import { PlantedCrops } from "../../../../domain/crop/enum/planted-crops.enum"

@Entity('farms')
export default class FarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  name: string

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

  // @OneToMany(() => CropEntity, crops => crops.farms)
  // crops: PlantedCrops[];
}