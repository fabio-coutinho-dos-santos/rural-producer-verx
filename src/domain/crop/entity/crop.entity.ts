import { PlantedCrops } from "../enum/planted-crops.enum";

export default class Crop {
  constructor(
    private _type: string,
  ){
    this.validate()
  }

  private validate()
  {
    if(!Object.values(PlantedCrops).includes(this._type as PlantedCrops)) {
      throw new Error('Invalid crop type');
    }
  }

  get type(): string {
    return this._type;
  }
}