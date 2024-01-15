import { PlantedCrops } from "../../producer/enum/planted-crops.enum";
import FarmAddress from "../value-object/farm-address";

export default class Farm {

  private _totalArea: number = 0;
  private _arableArea: number = 0;
  private _vegetationArea: number = 0;
  private _crops: PlantedCrops[] = new Array<PlantedCrops>;

  constructor(
    private _name: string,
    private _address: FarmAddress,
    private _producerId: string,
  ) {
    this.validateRequiredFields()
  }

  private validateRequiredFields() {

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if(!uuidRegex.test(this._producerId)) {
      throw new Error('Invalid producer id');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._address.city.length === 0) {
      throw new Error('City is required');
    }

    if (this._address.state.length === 0) {
      throw new Error('State is required');
    }

    if(this._producerId.length === 0) {
      throw new Error('Producer id is required');
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

  get crops(): PlantedCrops[] {
    return this._crops;
  }

  get producerId(): string {
    return this._producerId;
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
    this._crops.push(type)
  }

  private checkAreaProportion(arableArea: number, vegetationArea: number, totalArea: number) {
    if ((arableArea + vegetationArea) > totalArea) {
      throw new Error('Arable area with Vegetation area is greater than Total area')
    }
  }
}