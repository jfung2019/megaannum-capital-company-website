/**
 * Whether the hero should fetch its MP4s. Posters are always the first
 * paint -- this only decides if we then spend the bandwidth to replace
 * them. Mainland links (Beijing as the reference case) often report a
 * usable page while a 10MB+ loop never finishes.
 */
export type ConnectionHint = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
};

export function readConnection(): ConnectionHint | undefined {
  const nav = navigator as Navigator & {
    connection?: ConnectionHint;
    mozConnection?: ConnectionHint;
    webkitConnection?: ConnectionHint;
  };
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

export function shouldLoadHeroVideo(
  connection: ConnectionHint | undefined,
  prefersReducedMotion: boolean,
): boolean {
  if (prefersReducedMotion) return false;
  if (!connection) return true;
  if (connection.saveData) return false;
  // slow-2g/2g are unambiguous -- Chrome doesn't label a connection that low
  // without genuinely poor measured RTT/throughput. "3g" is a much coarser,
  // less reliable bucket (often under-reported early in a session, before
  // Chrome has real samples to calibrate against) and produced a false
  // positive on a normal broadband connection, so it falls through to the
  // downlink check -- a direct measurement -- instead of an instant block.
  if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
    return false;
  }
  if (
    typeof connection.downlink === "number" &&
    connection.downlink > 0 &&
    connection.downlink < 1.5
  ) {
    return false;
  }
  return true;
}
