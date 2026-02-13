// ============================================================
// Image URL utilities
// Converts Dropbox share links to direct-renderable URLs.
//
// Dropbox share links look like:
//   https://www.dropbox.com/s/abc123/photo.jpg?dl=0
//   https://www.dropbox.com/scl/fi/abc123/photo.jpg?rlkey=xxx&dl=0
//
// We convert them to:
//   https://dl.dropboxusercontent.com/s/abc123/photo.jpg
//   ...or swap dl=0 → raw=1
//
// Staff just paste the normal Dropbox share link into Airtable
// and this function handles the rest automatically.
// ============================================================

export function toDirectImageUrl(url: string | undefined | null): string {
  if (!url) return "";

  const trimmed = url.trim();

  // Already a direct Dropbox content URL — leave it
  if (trimmed.includes("dl.dropboxusercontent.com")) {
    return trimmed;
  }

  // Standard Dropbox share link — swap to raw
  if (trimmed.includes("dropbox.com")) {
    // Replace dl=0 with raw=1, or append raw=1 if no dl param
    let direct = trimmed.replace(/[?&]dl=\d/, "");
    const separator = direct.includes("?") ? "&" : "?";
    return `${direct}${separator}raw=1`;
  }

  // Not a Dropbox URL — return as-is (could be any image host)
  return trimmed;
}

/**
 * Returns a placeholder gradient background when no image is provided.
 * Uses the event/item color to stay on-brand.
 */
export function placeholderGradient(color: string): string {
  return `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`;
}
