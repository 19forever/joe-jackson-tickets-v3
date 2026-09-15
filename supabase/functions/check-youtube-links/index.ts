import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Načteme záznamy, kde je YOUTUBE_URL vyplněné
  const { data: items, error } = await supabase
    .from('tickets')
    .select('id, YOUTUBE_URL')
    .not('YOUTUBE_URL', 'is', null)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  let updatedCount = 0

  for (const item of items) {
    const rawUrl = item.YOUTUBE_URL?.trim()
    if (!rawUrl) continue

    let isAlive = false

    try {
      // Použití YouTube oEmbed rozhraní bez nutnosti API klíče
      const checkUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(rawUrl)}&format=json`
      const res = await fetch(checkUrl)
      
      // HTTP 200 = video existuje a je veřejné
      // HTTP 404/401 = neexistuje, je soukromé nebo smazané
      isAlive = res.ok
    } catch {
      isAlive = false
    }

    // Aktualizace řádku v tabulce tickets
    await supabase
      .from('tickets')
      .update({ 
        is_alive: isAlive, 
        last_checked_at: new Date().toISOString() 
      })
      .eq('id', item.id)

    updatedCount++
  }

  return new Response(
    JSON.stringify({ message: 'Done', processed: updatedCount }), 
    { headers: { 'Content-Type': 'application/json' } }
  )
})
