import { JsonBodyGenerationParams, jsonBodyResponse, RequestSuggestionsParams, RequestSuggestionResponse } from '../types';


export async function suggestionName(params:RequestSuggestionsParams): Promise<RequestSuggestionResponse> {
    const response = await fetch("/api/ai/suggest-name", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(params)
    })

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json().catch(()=>({}))
}

export async function generateJsonBody(params: JsonBodyGenerationParams): Promise<jsonBodyResponse> {
    const response = await fetch("/api/ai/generate-json", {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(params)
    })

    if(!response.ok){
        const errorData = await response.json().catch(()=>({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
}