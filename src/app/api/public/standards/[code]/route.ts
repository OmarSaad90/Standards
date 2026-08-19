import { getByCode } from '@/lib/data'
import { toPublicStandard } from '@/lib/serialize'

export const dynamic = 'force-dynamic'

/** GET /api/public/standards/{code} - one PublicStandard, or 404. */
export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const s = getByCode(decodeURIComponent(code))

  if (!s) {
    return Response.json(
      { error: 'not_found', parameter: 'code', reason: 'no public standard with this code' },
      { status: 404, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  return Response.json(toPublicStandard(s), {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  })
}
