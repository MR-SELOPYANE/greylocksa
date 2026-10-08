import { describe, expect, it } from "vitest";
import { capArray } from "./persist";
import { canGrantRole } from "./roles";

describe("storage ceiling", () => {
  it("drops the oldest entries once a collection passes its cap", () => {
    const many = Array.from({ length: 250 }, (_, i) => i);
    const capped = capArray(many, 100) as number[];
    expect(capped).toHaveLength(100);
    expect(capped[99]).toBe(249); // newest survives
    expect(capped[0]).toBe(150);
  });

  it("leaves a collection under its cap untouched", () => {
    const few = [1, 2, 3];
    expect(capArray(few, 100)).toBe(few);
  });

  it("ignores the cap for non-array state", () => {
    expect(capArray({ role: "admin" }, 100)).toEqual({ role: "admin" });
  });
});

describe("role escalation", () => {
  it("blocks an analyst promoting themselves to admin", () => {
    expect(canGrantRole("analyst", "admin")).toBe(false);
  });

  it("lets an admin promote, and either operator drop to analyst", () => {
    expect(canGrantRole("admin", "admin")).toBe(true);
    expect(canGrantRole("admin", "analyst")).toBe(true);
    expect(canGrantRole("analyst", "analyst")).toBe(true);
  });
});
