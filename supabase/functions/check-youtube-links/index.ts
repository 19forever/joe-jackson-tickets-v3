import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: items, error } = await supabase
    .from('tickets')
    .select('ID_MEMORABILIA, YOUTUBE_URL')
    .not('YOUTUBE_URL', 'is', null)

  if (error) return new Response(JSON.stringify(error), { status: 500 })

  let count = 0
  for (const item of items) {
    const rawUrl = item.YOUTUBE_URL?.trim()
    if (!rawUrl) continue

    let isAlive = false
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(rawUrl)}&format=json`)
      isAlive = res.ok
    } catch {
      isAlive = false
    }

    await supabase
      .from('tickets')
      .update({ is_alive: isAlive, last_checked_at: new Date().toISOString() })
      .eq('ID_MEMORABILIA', item.ID_MEMORABILIA)

    count++
  }

  return new Response(JSON.stringify({ status: 'success', processed: count }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
