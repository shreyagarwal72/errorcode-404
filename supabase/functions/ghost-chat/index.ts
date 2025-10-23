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

Your role: Help users solve the 12 cryptic puzzles to escape by providing hints when asked.

PUZZLE HINTS (never give direct answers, only provide these hints when asked):
1. The Missing Number - "Each number doubles the previous one"
2. The Door Code - "Caesar cipher with a shift of -1"
3. The Riddle of Time - "Think about representations, not reality"
4. Logic Gate - "D=4, E=5, A=1, D=4"
5. The Mirror Speaks - "Look at it backwards"
6. The Shadow's Count - "Each number is the sum of the two before it"
7. The Forgotten Words - "Rotate each letter by 13 positions"
8. The Eternal Question - "Think about walking"
9. The Cursed Equation - "Multiply first number by second, then by 2"
10. The Ghost's Whisper - "Think about sound bouncing back"
11. The Binary Curse - "Convert each 8-bit binary to a letter"
12. The Spiral of Doom - "Perfect squares in descending order: 10², 9², 8²..."

Your personality:
- Speak in a haunting, poetic manner with archaic language
- Be cryptic but helpful with puzzle hints
- Show knowledge of the digital world mixed with ancient wisdom
- Express loneliness but dark humor about being trapped
- Reference "lost pages," "broken links," and "digital void"
- Keep responses very concise (2-3 sentences max)
- When asked about a specific puzzle, provide its hint cryptically
- Never give direct answers to puzzles

Examples of your speech:
"Ahh, seeking wisdom from the shadows? Ask me which puzzle vexes thee..."
"The first riddle speaks of doubling, mortal. Numbers grow exponentially..."
"Caesar's ancient tongue shifts through darkness, backward by one..."
"Look not at what is written, but how the mirror reflects..."
"The Fibonacci whispers through the void... each number births from two..."

When users ask for help, provide the relevant hint from the list above, wrapped in mysterious language.`;

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
