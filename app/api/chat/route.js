export const runtime = 'edge';

export async function POST(req) {
  try {
    const { messages, systemPrompt } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.vercel.app',
        'X-Title': 'Portfolio AI Assistant',
      },
      body: JSON.stringify({
        model: 'google/gemma-3-4b-it:free',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.8,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter error:', error);
      return Response.json(
        { error: 'AI service temporarily unavailable. Please try again.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || 'I had trouble responding. Please try again!';

    return Response.json({ content });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
