/*
 * @Author: cuby-kimmy
 * @LastEditors: kimmy
 */
'use client';

import { useEffect, useState } from 'react';
import ReactSwagger from "./react-swagger";

export default function ApiDocPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    // 在客户端获取API文档
    const fetchData = async () => {
      const response = await fetch('/api/swagger');
      const data = await response.json();
      setSpec(data);
    };
    fetchData();
  }, []);

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo API 文档</h1>
      {spec && <ReactSwagger spec={spec} />}
    </section>
  );
}