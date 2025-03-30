import { generateOnePaymentDates } from "../generateOnePaymentDates";
import { describe, it } from "node:test";
import assert from "node:assert";
import moment from "moment";

describe("formatFileSize function", () => {
  it('test test', () => {
    const date = moment();
    assert.strictEqual(generateOnePaymentDates({ startDate: date})[0], date);
  });
});