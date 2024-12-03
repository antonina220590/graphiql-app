import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url, method, headers, body } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method,
      headers: new Headers(headers),
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type');
    const responseData =
      contentType && contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    return NextResponse.json(responseData, {
      status: response.status,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}
