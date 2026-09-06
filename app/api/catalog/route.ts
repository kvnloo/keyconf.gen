import { timingSafeEqual } from 'node:crypto';
import {
  catalogPublishToken,
  publishCatalog,
  readCatalog,
} from '../../../db/catalog.ts';
import { requestText } from '../../../lib/request-text.ts';
import { publicUrl } from '../../../lib/import-products.ts';

export async function GET(request: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  };
  let source: string;
  try {
    source = publicUrl(
      new URL(request.url).searchParams.get('source') ?? '',
    ).href;
  } catch {
    return Response.json(
      { error: 'Provide a public store URL.' },
      { status: 400, headers },
    );
  }
  const payload = await readCatalog(source);
  return payload === null
    ? Response.json(
        { error: 'No published observations for this source.' },
        { status: 404, headers },
      )
    : new Response(payload, {
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
}

export async function PUT(request: Request) {
  const secret = catalogPublishToken();
  const supplied = request.headers.get('authorization') ?? '';
  const expected = Buffer.from(`Bearer ${secret}`);
  const credential = Buffer.from(supplied);
  if (
    !secret ||
    credential.length !== expected.length ||
    !timingSafeEqual(credential, expected)
  )
    return Response.json(
      { error: 'Catalog publication requires a publisher credential.' },
      { status: 403 },
    );
  const payload = await requestText(request, 500_000);
  if (payload === null)
    return Response.json(
      { error: 'Catalog snapshot exceeds 500 KB.' },
      { status: 413 },
    );
  try {
    return Response.json(await publishCatalog(payload));
  } catch {
    return Response.json(
      { error: 'The snapshot could not be verified or stored.' },
      { status: 422 },
    );
  }
}
