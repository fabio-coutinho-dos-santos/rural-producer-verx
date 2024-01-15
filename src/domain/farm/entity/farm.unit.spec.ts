import { PlantedCrops } from "../../producer/enum/planted-crops.enum";
import FarmAddress from "../value-object/farm-address";
import Farm from "./farm.entity";

describe('Farm unit tests', () => {

  const uuidValid = '32b2ae3d-c01c-4146-8a45-929626d21b81'

  it('should return a new farm with valid data', () => {
    const address = new FarmAddress('City', 'State')
    const farm = new Farm('Farm name', address, uuidValid)
    farm.changeTotalArea(10.5);
    farm.changeVegetationArea(5);
    farm.changeArableArea(4);
    farm.addPlantedCrop(PlantedCrops.COFFE)
    farm.addPlantedCrop(PlantedCrops.CORN)
    expect(farm).toBeDefined()
    expect(farm.name).toBe('Farm name')
    expect(farm.address.city).toBe('City')
    expect(farm.address.state).toBe('State')
    expect(farm.totalArea).toBe(10.5)
    expect(farm.arableArea).toBe(4)
    expect(farm.vegetableArea).toBe(5)
    expect(farm.crops).toBeInstanceOf(Array<PlantedCrops>)
    expect(farm.crops).toContain(PlantedCrops.COFFE)
    expect(farm.crops).toContain(PlantedCrops.CORN)
    expect(farm.producerId).toBe(uuidValid)
  })

  it('should throw an error when name is invalid', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('', address, uuidValid)
    }).toThrow("Name is required");
  })

  it('should throw an error when name is invalid', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('', address, uuidValid)
    }).toThrow("Name is required");
  })

  it('should throw an error when the total Area is less than areable area more vegetable area', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address, uuidValid)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(5);
      farm.changeArableArea(6);
    }).toThrow("Arable area with Vegetation area is greater than Total area");
  })

  it('should throw an error when the total Area is less than areable area more vegetable area', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address, uuidValid)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(6);
      farm.changeArableArea(5);
    }).toThrow("Arable area with Vegetation area is greater than Total area");
  })

  it('should throw an error when the total Area is less than areable area more vegetable area', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address, uuidValid)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(4);
      farm.changeArableArea(5);
      farm.changeTotalArea(8);
    }).toThrow("Arable area with Vegetation area is greater than Total area");
  })

  it('should throw an error when the planted crop type is invalid', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address, uuidValid)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(4);
      farm.changeArableArea(5);
      farm.addPlantedCrop(PlantedCrops.COFFE)
      farm.addPlantedCrop('rice')
    }).toThrow("Invalid planted crop type: rice");
  })

  it('should throw an error when producerId is invalid', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address, '')
      farm.changeTotalArea(10);
      farm.changeVegetationArea(4);
      farm.changeArableArea(5);
      farm.addPlantedCrop(PlantedCrops.COFFE)
      farm.addPlantedCrop('rice')
    }).toThrow("Invalid producer id");
  })
})