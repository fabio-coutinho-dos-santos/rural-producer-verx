import Producer from "./producer.entity"

describe('Producer unit tests', () => {
  it('should return a new producer with valid data using cnpj', () => {
    const doc = '39.443.878/0001-37'
    const producer = new Producer('Producer name', doc);
    expect(producer).toBeDefined()
    expect(producer.name).toBe('Producer name')
    expect(producer.document).toBe(doc)
  })

  it('should return a new producer with valid data using cpf', () => {
    const doc = '213.101.950-56'
    const producer = new Producer('Producer name', doc);
    expect(producer).toBeDefined()
    expect(producer.name).toBe('Producer name')
    expect(producer.document).toBe(doc)
  })

  it('should throw an error when document is invalid', () => {
    expect(() => {
      const producer = new Producer('Producer name', '123456781');
    }).toThrow("Invalid document format");

    expect(() => {
      const producer = new Producer('Producer name', '39.443.878/0001-31');
    }).toThrow("Invalid CNPJ");

    expect(() => {
      const producer = new Producer('Producer name', '213.101.950-52');
    }).toThrow("Invalid CPF");

    expect(() => {
      const producer = new Producer('Producer name', '1234567891A');
    }).toThrow("Invalid document format");

    expect(() => {
      const producer = new Producer('Producer name', '');
    }).toThrow("CNPJ or CPF is required");
  })

  it('should throw an error when name is invalid', () => {
    expect(() => {
      const producer = new Producer('', '12345678911');
    }).toThrow("Name is required");
  })
})