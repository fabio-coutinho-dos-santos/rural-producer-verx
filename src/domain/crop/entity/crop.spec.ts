import Crop from "./crop.entity"

describe('Crop entity', () => {
  describe('Create crop', () => {
    it('should return a new crop with valid type', () => {
      const crop = new Crop('cotton');
      expect(crop).toBeDefined()
      expect(crop.type).toBe('cotton')

      const crop2 = new Crop('coffe');
      expect(crop2).toBeDefined()
      expect(crop2.type).toBe('coffe')
    })

    it('should an error with invalid type', () => {
      expect(() => {
        const crop = new Crop('rice');
      }).toThrow('Invalid crop type')
    })
  })
})