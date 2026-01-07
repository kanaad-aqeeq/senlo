export interface UnsubscribeTokenData {
  contactId: number;
  campaignId: number;
}

export function encodeUnsubscribeToken(data: UnsubscribeTokenData): string {
  const json = JSON.stringify(data);
  return Buffer.from(json).toString("base64url");
}

export function decodeUnsubscribeToken(token: string): UnsubscribeTokenData | null {
  try {
    const json = Buffer.from(token, "base64url").toString("utf8");
    return JSON.parse(json) as UnsubscribeTokenData;
  } catch (e) {
    return null;
  }
}






