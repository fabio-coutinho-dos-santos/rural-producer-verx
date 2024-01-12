import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { PlantedCrops } from "../../../../domain/farm/enum/planted-crops.enum"
import FarmEntity from "./farms.entity"

@Entity('crops')
@Unique(['type'])
export default class CropEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({nullable: false})
  type: PlantedCrops

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => FarmEntity, farms => farms.crops)
  farms: FarmEntity;
}