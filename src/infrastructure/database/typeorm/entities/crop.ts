import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import FarmEntity from "./farms.entity"
import { PlantedCrops } from "../../../../domain/crop/enum/planted-crops.enum"

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