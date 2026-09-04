import { describe, expect, it } from "vitest";

import { shouldLoadHeroVideo } from "./shouldLoadHeroVideo";

describe("shouldLoadHeroVideo", () => {
  it("skips video when the user prefers reduced motion", () => {
    expect(shouldLoadHeroVideo({ effectiveType: "4g", downlink: 10 }, true)).toBe(
      false,
    );
  });

  it("skips video on data-saver and the unambiguous slow effective types", () => {
    expect(shouldLoadHeroVideo({ saveData: true, effectiveType: "4g" }, false)).toBe(
      false,
    );
    expect(shouldLoadHeroVideo({ effectiveType: "slow-2g" }, false)).toBe(false);
    expect(shouldLoadHeroVideo({ effectiveType: "2g" }, false)).toBe(false);
  });

  it("skips video when downlink is known and weak, 3g label included", () => {
    expect(shouldLoadHeroVideo({ effectiveType: "4g", downlink: 0.8 }, false)).toBe(
      false,
    );
    expect(shouldLoadHeroVideo({ effectiveType: "3g", downlink: 0.8 }, false)).toBe(
      false,
    );
  });

  it("loads video on a '3g' label with a reasonable measured downlink", () => {
    // effectiveType is a coarse, often-stale heuristic; a real broadband
    // connection has been observed reporting "3g" while downlink (a direct
    // measurement) was a perfectly fine 1.55 -- don't let the label alone
    // veto a connection that's actually fine.
    expect(shouldLoadHeroVideo({ effectiveType: "3g", downlink: 1.55 }, false)).toBe(
      true,
    );
  });

  it("loads video on a fast hint, and tries when the API is missing", () => {
    expect(shouldLoadHeroVideo({ effectiveType: "4g", downlink: 10 }, false)).toBe(
      true,
    );
    expect(shouldLoadHeroVideo(undefined, false)).toBe(true);
  });
});
