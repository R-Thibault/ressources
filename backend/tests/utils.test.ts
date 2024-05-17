import { timestampToDate } from "../src/utils/timestampToDate";

describe("tests utils timestampToDate functions", () => {
  it("should returns an instance of date within a given timestamp", () => {
    const date = timestampToDate(Date.now());
    expect(date).toBeInstanceOf(Date);
  });
  it("should returns a specific date with format YYYY-MM-DD within a given timestamp", () => {
    const date = timestampToDate(1707299096);
    expect(date.toISOString()).toBe("2024-02-07T09:44:56.000Z");
  });
  it("should returns true if the given timestamp > 2012-01-01", () => {
    const date = timestampToDate(1707299096);
    const result = date > new Date(2012, 0, 1);
    expect(result).toBeTruthy();
  });
});
