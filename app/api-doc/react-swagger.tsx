'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// 使用动态导入避免SSR问题
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

type Props = {
  spec: Record<string, any>,
};

function ReactSwagger({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;