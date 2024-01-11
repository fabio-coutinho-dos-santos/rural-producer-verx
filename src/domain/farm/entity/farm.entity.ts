import { PlantedCrops } from "../enum/planted-crops.enum";
import FarmAddress from "./farm-address.entity";

export default class Farm {

  private _totalArea: number = 0;
  private _arableArea: number = 0;
  private _vegetationArea: number = 0;
  private _plantedCrops: PlantedCrops[] = new Array<PlantedCrops>;

  constructor(
    private _name: string,
    private _address: FarmAddress,
  ) {
    this.validateRequiredFields()
  }

  private validateRequiredFields() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._address.city.length === 0) {
      throw new Error('City is required');
    }

    if (this._address.state.length === 0) {
      throw new Error('State is required');
    }
  }

  get name(): string {
    return this._name
  }

  get address(): FarmAddress {
    return this._address
  }

  get totalArea(): number {
    return this._totalArea;
  }

  get arableArea(): number {
    return this._arableArea;
  }

  get vegetableArea(): number {
    return this._vegetationArea;
  }

  get plantedCrops(): PlantedCrops[] {
    return this._plantedCrops;
  }

  public changeVegetationArea(value: number) {
    this.checkAreaProportion(this._arableArea, value, this._totalArea)
    this._vegetationArea = value
  }

  public changeArableArea(value: number) {
    this.checkAreaProportion(value, this._vegetationArea, this._totalArea)
    this._arableArea = value
  }

  public changeTotalArea(value: number) {
    this.checkAreaProportion(this._arableArea, this._vegetationArea, value)
    this._totalArea = value
  }

  public addPlantedCrop(type: any) {
    if (!Object.values(PlantedCrops).includes(type)) {
      throw new Error(`Invalid planted crop type: ${type}`)
    }
    this._plantedCrops.push(type)
  }

  private checkAreaProportion(arableArea: number, vegetationArea: number, totalArea: number) {
    if ((arableArea + vegetationArea) > totalArea) {
      throw new Error('Arable area with Vegetation area is greater than Total area')
    }
  }
}