export default class FarmAddress {
  constructor(private _city: string, private _state: string) {
    this.validateRequiredFields();
  }

  private validateRequiredFields() {
    if (this._city.length === 0) {
      throw new Error("City is required");
    }

    if (this._state.length === 0) {
      throw new Error("State is required");
    }
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }
}
