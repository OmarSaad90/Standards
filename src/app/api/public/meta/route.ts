import { meta } from '@/lib/data'

export const dynamic = 'force-static'

/** GET /api/public/meta - PublicMeta per contracts/public_api_openapi_v1_0_0.yaml */
export function GET() {
  return Response.json(
    {
      version: meta.version,
      total_count: meta.total_count,
      current_count: meta.current_count,
      areas: meta.areas.map((a) => ({ name: a.name, count: a.count })),
      public_contract: meta.public_contract,
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } },
  )
}
