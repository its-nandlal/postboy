import { google } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { z } from "zod";

const model = google("gemini-2.5-flash");

export interface RequestSuggestionsParams {
  workspaceName: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url?: string;
  description?: string;
}

export interface JsonBodyGenerationParams {
  prompt: string;
  method?: string;
  endpoint?: string;
  context?: string;
}

const RequestNameSchema = z.object({
  suggestions: z
    .array(
      z.object({
        name: z.string().describe("Suggested request name"),
        reasoning: z
          .string()
          .describe("Brief explanation of why this name was chosen"),
        confidence: z
          .number()
          .min(0)
          .max(1)
          .describe("Confidence scroe for this suggestion"),
      })
    )
    .length(3)
    .describe(
      "List of 3 suggested request names with reasoning and confidence scores"
    ),
});



const JsonBodySchema = z.object({
  jsonBody: z.string().describe('Generated JSON body as a valid JSON string'),
  explanation: z.string().describe('Brief explanation of the generated structure'),
  suggestions: z.array(z.string()).describe('Alternative field suggestions or improvements')
});


const StructuredJsonBodySchema = z.object({
  jsonBody: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    data: z.any().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
  }).passthrough().describe('Generated JSON body structure'), // passthrough allows additional properties
  explanation: z.string().describe('Brief explanation of the generated structure'),
  suggestions: z.array(z.string()).describe('Alternative field suggestions or improvements')
});


export async function getRequestNameSuggestions(
  params: RequestSuggestionsParams
) {
  try {
    const prompt = `
        You are an AI assistant helping developers name their API requests in a workspace called "${params.workspaceName}".
        
        Context:
        - HTTP Method: ${params.method}
        - Workspace: ${params.workspaceName}
        - URL: ${params.url || "Not provided"}
        - Description: ${params.description || "Not provided"}
        
        Generate 3 concise, descriptive request names that:
        1. Reflect the HTTP method and purpose
        2. Are relevant to the workspace context
        3. Follow common REST API naming conventions
        4. Are professional and clear
        5. Are between 2-6 words long
        
        Consider the workspace theme and make names that would make sense to other developers.
        `;

        const result = await generateObject({
            model,
            schema:RequestNameSchema,
            prompt,
            temperature: 0.7,
        })

        return {
            success: true,
            data: result.object,
            error: null
        }

  } catch (error) {
    console.error("Error generating request name suggestions:", error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to generate request name suggestions",
    };
  }
}

export async function generateJsonBody(params: JsonBodyGenerationParams) {
  try {
    const systemPrompt = `
    You are an AI assistant that generates JSON request bodies for API calls.
    
    Context:
    - HTTP Method: ${params.method || "POST"}
    - Endpoint: ${params.endpoint || 'Not specified'}
    - Additional Context: ${params.context || 'None'}
    
    Guidelines:
    1. Generate realistic, well-structured JSON based on the user's request
    2. Use appropriate data types (strings, numbers, booleans, arrays, objects)
    3. Include reasonable example values that make sense for the context
    4. Follow common JSON and REST API conventions
    5. Consider the HTTP method when structuring the data
    6. Make the JSON practical and ready-to-use
    7. Include nested objects and arrays when appropriate
    8. Use meaningful field names
    9. Return the JSON as a properly formatted JSON string
    
    User Request: ${params.prompt}
    
    IMPORTANT: Return the jsonBody as a valid JSON string that can be parsed with JSON.parse().
  `;

  const result = await generateObject({
    model,
    schema: JsonBodySchema,
    prompt: systemPrompt,
    temperature: 0.3,
  })

  let parsedJsonBody;
  try {
    parsedJsonBody = JSON.parse(result.object.jsonBody)
  } catch (parseError) {
    parsedJsonBody = result.object.jsonBody; // Fallback to raw string if parsing fails
  }

  return {
    success: true,
    data: {
      ...result.object,
      jsonBody: parsedJsonBody
    },
    error: null
  }
  } catch (error) {
    console.error("Error generating JSON body:", error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to generate JSON body",
    };
  }

}

export async function batchSuggestRequestNames(
  requests: RequestSuggestionsParams[]
): Promise<Array<{
  originalRequest: RequestSuggestionsParams;
  suggestions: z.infer<typeof RequestNameSchema> | null;
  error: string | null;
}>> {
  const results = await Promise.allSettled(
    requests.map(request => getRequestNameSuggestions(request))
  );

  return results.map((result, index) => ({
    originalRequest: requests[index],
    suggestions: result.status === 'fulfilled' && result.value.success 
      ? result.value.data 
      : null,
    error: result.status === 'fulfilled' 
      ? result.value.error 
      : result.reason?.message || 'Unknown error'
  }));
}

