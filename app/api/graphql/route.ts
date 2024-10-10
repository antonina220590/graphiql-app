import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = body.url;
    const query = body.query;
    const variables = body.variables || {};

    if (!url || typeof url !== 'string') {
      // toast('Invalid URL:', url);
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    if (!query || typeof query !== 'string') {
      // toast('Invalid query:', query);
      return NextResponse.json(
        { error: 'Invalid query provided' },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // toast('Error from external API:', errorData);
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // toast('Handling request error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data due to an error' },
      { status: 500 }
    );
  }
}
