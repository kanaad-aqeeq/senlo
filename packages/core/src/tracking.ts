/**
 * Wraps all <a> tags in the HTML with a tracking URL.
 * 
 * @param html Original HTML content
 * @param trackingBaseUrl The base URL for click tracking (e.g. https://senlo.io/api/track/click/123/user@example.com)
 * @returns HTML with rewritten links
 */
export function wrapLinksWithTracking(html: string, trackingBaseUrl: string): string {
  // Regex to find href attributes in <a> tags
  // Matches: href="URL" or href='URL'
  // We use a non-greedy match for the URL and ensure we are inside an <a> tag
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;

  return html.replace(linkRegex, (match, quote, url) => {
    // Skip anchor links, mailto, and already tracked links
    if (
      url.startsWith("#") || 
      url.startsWith("mailto:") || 
      url.startsWith("tel:") || 
      url.includes("/api/track/click/") ||
      url === "{{unsubscribeUrl}}" // Skip unsubscribe tag for now, it's handled separately
    ) {
      return match;
    }

    const trackedUrl = `${trackingBaseUrl}?url=${encodeURIComponent(url)}`;
    return match.replace(url, trackedUrl);
  });
}


