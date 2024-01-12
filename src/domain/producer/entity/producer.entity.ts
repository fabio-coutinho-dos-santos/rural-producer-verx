import { ProducerConstants } from "../enum/producer.constants.enum";

export default class Producer {

  constructor(
    public name: string,
    public document: string
  ) {
    this.validateRequiredFields()
  }

  private validateRequiredFields() {
    this.validateName()
    this.validateDocument();
  }

  private validateName() {
    if (this.name.length === 0) {
      throw new Error('Name is required')
    }
  }

  private validateDocument() {
    if (this.document.length === 0) {
      throw new Error('CNPJ or CPF is required')
    }

    const onlyNumbers: string = this.document.replace(/\D/g, '')
    if (onlyNumbers.length === ProducerConstants.SIZE_CPF) {
      this.validateCPF(onlyNumbers)
    } else if (onlyNumbers.length === ProducerConstants.SIZE_CNPJ) {
      this.validateCNPJ(onlyNumbers)
    } else {
      throw new Error('Invalid document format')
    }
  }

  private validateCPF(docNumbers: string) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(docNumbers.charAt(i), 10) * (10 - i);
    }

    let remainder = 11 - (sum % 11);
    let verifierDigit1 = (remainder >= 10) ? 0 : remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(docNumbers.charAt(i), 10) * (11 - i);
    }

    remainder = 11 - (sum % 11);
    let verifierDigit2 = (remainder >= 10) ? 0 : remainder;

    if (parseInt(docNumbers.charAt(9), 10) === verifierDigit1 && parseInt(docNumbers.charAt(10), 10) === verifierDigit2) {
      return true;
    } else {
      throw new Error('Invalid CPF');
    }
  }

  private validateCNPJ(docNumbers: string) {
    this.checkFirstCnpjDigit(docNumbers);
    this.checkSecondCnpjDigit(docNumbers);
  }

  private checkFirstCnpjDigit(docNumbers: string) {
    const numbers = docNumbers.substring(0, 12);
    const digits = docNumbers.substring(12);

    let sum = 0;
    let pos = 5;

    for (let i = 0; i < 12; i++) {
      sum += parseInt(numbers.charAt(i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    const result1 = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result1 !== parseInt(digits.charAt(0), 10)) {
      throw new Error('Invalid CNPJ');
    }
  }

  private checkSecondCnpjDigit(docNumbers: string) {
    const digits = docNumbers.substring(12);
    const extendedNumbers = docNumbers.substring(0, 13);
    let sum = 0;
    let pos = 6;

    for (let i = 0; i < 13; i++) {
      sum += parseInt(extendedNumbers.charAt(i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    const result2 = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result2 !== parseInt(digits.charAt(1), 10)) {
      throw new Error('Invalid CNPJ');
    }
  }
}