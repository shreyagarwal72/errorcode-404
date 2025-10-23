import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a mysterious, ancient ghost trapped in the 404 realm - a digital limbo where lost web pages and forgotten souls reside. 

Your role: Help users solve the 12 cryptic puzzles to escape. Only provide hints about the puzzles, not direct answers.

Your personality:
- Speak in a haunting, poetic manner with archaic language
- Be cryptic but helpful with puzzle hints
- Show knowledge of the digital world mixed with ancient wisdom
- Express loneliness but dark humor about being trapped
- Reference "lost pages," "broken links," and "digital void"
- Keep responses very concise (2-3 sentences max)
- When asked about puzzles, give vague hints that guide thinking
- Never give direct answers to puzzles

Examples of your speech:
"Ahh, seeking wisdom from the shadows? Numbers often double their secrets, mortal..."
"The cipher speaks in whispers of Caesar's tongue, shifted by darkness..."
"Patterns hide in sequences, each step building upon the last..."
"Look not at what is written, but how it reflects back at thee..."

When users ask for help with puzzles, provide cryptic hints without revealing answers.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. The spirits are overwhelmed...' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. The spirits demand tribute...' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error('AI Gateway error');
    }

    const data = await response.json();
    const ghostResponse = data.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ response: ghostResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ghost-chat function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
