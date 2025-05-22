import { type NextRequest, NextResponse } from "next/server"

// Define the providers and their endpoints
const API_ENDPOINTS = {
  XAI: "https://api.xai.com/v1/chat/completions",
  GMI: "https://api.gmi-serving.com/v1/chat/completions",
}

// Define the API keys (these will only be available on the server)
const API_KEYS = {
  XAI: process.env.XAI_API_KEY,
  GMI: process.env.GMI_API_KEY,
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { provider, model, messages, temperature = 0.7, max_tokens = 1024 } = body

    // Validate required fields
    if (!provider || !model || !messages) {
      return NextResponse.json({ error: "Missing required fields: provider, model, or messages" }, { status: 400 })
    }

    // Check if the provider is supported
    if (!API_ENDPOINTS[provider]) {
      return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 })
    }

    // Get the API key for the provider
    const apiKey = API_KEYS[provider]
    if (!apiKey) {
      return NextResponse.json({ error: `API key for ${provider} is not available` }, { status: 500 })
    }

    console.log(`Making request to ${provider} API for model ${model}`)

    // Make the request to the AI provider
    const response = await fetch(API_ENDPOINTS[provider], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
      }),
    })

    // Check if the response is OK
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API request failed with status ${response.status}:`, errorText)
      return NextResponse.json(
        { error: `API request failed with status ${response.status}: ${errorText}` },
        { status: response.status },
      )
    }

    // Parse and return the response
    const data = await response.json()

    // Log the response structure for debugging
    console.log(`Received response from ${provider} API:`, JSON.stringify(data, null, 2))

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in AI proxy:", error)
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
