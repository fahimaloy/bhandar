import { describe, it, expect } from "vitest";
import { findSection, DEFAULT_SECTIONS } from "../src/shared/mapping.js";

describe("findSection", () => {
  it("maps jpg to images", () => {
    const s = findSection(DEFAULT_SECTIONS, "jpg");
    expect(s.id).toBe("images");
  });
  it("maps gif to gif section", () => {
    const s = findSection(DEFAULT_SECTIONS, "GIF");
    expect(s.id).toBe("gif");
  });
  it("returns undefined for unknown", () => {
    expect(findSection(DEFAULT_SECTIONS, "xyz")).toBeUndefined();
  });
});