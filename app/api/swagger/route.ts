import { NextResponse } from 'next/server';
import { getApiDocs } from '@/app/lib/swagger';

/**
 * 提供Swagger API文档
 */
export async function GET() {
  try {
    const spec = await getApiDocs();
    return NextResponse.json(spec);
  } catch (error) {
    console.error('Error generating Swagger docs:', error);
    return NextResponse.json(
      { error: '获取API文档失败' },
      { status: 500 }
    );
  }
}