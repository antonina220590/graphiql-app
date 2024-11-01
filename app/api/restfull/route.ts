// pages/api/restfull/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url, method, headers, body } = await req.json();
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, {
      status: response.status,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
