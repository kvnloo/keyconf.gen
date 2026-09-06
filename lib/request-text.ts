export async function requestText(
  request: Pick<Request, 'headers' | 'body'>,
  maxRequestBytes: number,
): Promise<string | null> {
  if (Number(request.headers.get('content-length')) > maxRequestBytes) {
    await request.body?.cancel();
    return null;
  }
  if (!request.body) return '';
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) return text + decoder.decode();
      bytes += chunk.value.byteLength;
      if (bytes > maxRequestBytes) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}
