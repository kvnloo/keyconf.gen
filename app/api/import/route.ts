import { importWebsite } from '../../../lib/import-products.ts';
const maxRequestBytes = 12_288;

async function requestText(request: Request): Promise<string | null> {
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

function cors(request: Request) {
  const origin = request.headers.get('origin');
  const local = new URL(request.url).origin;
  return origin && (origin === local || origin === 'https://kvnloo.github.io')
    ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
    : null;
}
export async function OPTIONS(request: Request) {
  const headers = cors(request);
  return new Response(null, {
    status: headers ? 204 : 403,
    headers: headers
      ? {
          ...headers,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      : {},
  });
}
export async function POST(request: Request) {
  const headers = cors(request);
  if (!headers)
    return Response.json(
      { error: 'Use the importer from this site.' },
      { status: 403 },
    );
  try {
    const text = await requestText(request);
    if (text === null)
      return Response.json(
        { error: 'Request is too large.' },
        { status: 413, headers },
      );
    const data: unknown = JSON.parse(text);
    if (
      typeof data !== 'object' ||
      data === null ||
      !('url' in data) ||
      typeof data.url !== 'string' ||
      data.url.length > 2048
    )
      throw new Error('Enter a product or store URL.');
    const result = await importWebsite(
      data.url,
      'next' in data ? data.next : undefined,
    );
    return Response.json(
      {
        ...result,
        products: result.products.map((product) => ({
          ...product,
          // Older open tabs require these fields. Only exact prices can use their old format.
          price: product.pricing.kind === 'exact' ? product.pricing.amount : '',
          currency:
            product.pricing.kind === 'exact' ? product.pricing.currency : '',
        })),
      },
      { headers },
    );
  } catch (e) {
    return Response.json(
      {
        error:
          e instanceof Error ? e.message : 'The website could not be imported.',
      },
      { status: 422, headers },
    );
  }
}
