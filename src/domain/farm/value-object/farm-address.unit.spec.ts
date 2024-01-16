import FarmAddress from "./farm-address";

describe("Farm Address unit tests", () => {
  it("should return a new farm address with valid data", () => {
    const address = new FarmAddress("City", "State");
    expect(address).toBeDefined();
    expect(address.city).toBe("City");
    expect(address.state).toBe("State");
  });

  it("should throw an error when city is invalid", () => {
    expect(() => {
      new FarmAddress("", "State");
    }).toThrow("City is required");
  });

  it("should throw an error when state is invalid", () => {
    expect(() => {
      new FarmAddress("City", "");
    }).toThrow("State is required");
  });
});
