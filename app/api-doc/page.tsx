import { getApiDocs } from "@/app/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function ApiDocPage() {
  const spec = await getApiDocs();
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo API 文档</h1>
      <ReactSwagger spec={spec} />
    </section>
  );
}