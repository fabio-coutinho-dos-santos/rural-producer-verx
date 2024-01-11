import { PlantedCrops } from "../enum/planted-crops.enum";
import FarmAddress from "./farm-address.entity";
import Farm from "./farm.entity";

describe('Farm unit tests', () => {
  it('should return a new farm with valid data', () => {
    const address = new FarmAddress('City', 'State')
    const farm = new Farm('Farm name', address)
    farm.changeTotalArea(10);
    farm.changeVegetationArea(5);
    farm.changeArableArea(4);
    farm.addPlantedCrop(PlantedCrops.COFFE)
    farm.addPlantedCrop(PlantedCrops.CORN)
    expect(farm).toBeDefined()
    expect(farm.name).toBe('Farm name')
    expect(farm.address.city).toBe('City')
    expect(farm.address.state).toBe('State')
    expect(farm.totalArea).toBe(10)
    expect(farm.arableArea).toBe(4)
    expect(farm.vegetableArea).toBe(5)
    expect(farm.plantedCrops).toBeInstanceOf(Array<PlantedCrops>)
    expect(farm.plantedCrops).toContain(PlantedCrops.COFFE)
    expect(farm.plantedCrops).toContain(PlantedCrops.CORN)
  })

  it('should throw an error when name is invalid', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('', address)
    }).toThrow("Name is required");
  })

  it('should throw an error when name is invalid', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('', address)
    }).toThrow("Name is required");
  })

  it('should throw an error when the total Area is less than areable area more vegetable area', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(5);
      farm.changeArableArea(6);
    }).toThrow("Arable area with Vegetation area is greater than Total area");
  })

  it('should throw an error when the total Area is less than areable area more vegetable area', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(6);
      farm.changeArableArea(5);
    }).toThrow("Arable area with Vegetation area is greater than Total area");
  })

  it('should throw an error when the total Area is less than areable area more vegetable area', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(4);
      farm.changeArableArea(5);
      farm.changeTotalArea(8);
    }).toThrow("Arable area with Vegetation area is greater than Total area");
  })

  it('should throw an error when the planted crop type is invalid', () => {
    expect(() => {
      const address = new FarmAddress('City', 'State')
      const farm = new Farm('Farm name', address)
      farm.changeTotalArea(10);
      farm.changeVegetationArea(4);
      farm.changeArableArea(5);
      farm.addPlantedCrop(PlantedCrops.COFFE)
      farm.addPlantedCrop('rice')
    }).toThrow("Invalid planted crop type: rice");
  })
})