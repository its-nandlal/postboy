import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { generateJsonBody, suggestionName } from '../services'
import { JsonBodyGenerationParams, RequestSuggestionsParams } from '../types'


export function useSuggestRequestName () {
    const qureyClient = useQueryClient();

    return useMutation({
        mutationFn: (params: RequestSuggestionsParams) => suggestionName(params),
        onSuccess: (data, variable)=>{
            qureyClient.setQueryData(["request-suggestions", variable], data, {
                updatedAt: Date.now()
            })

            toast.success(`Generated ${data.suggestions.length} name suggestions`)
        }
    })
}

export function useGenerateJsonBody () {
    const qureyClient = useQueryClient();

    return useMutation({
        mutationFn: (params: JsonBodyGenerationParams) => generateJsonBody(params),
        onSuccess: (data)=>{
            qureyClient.invalidateQueries({queryKey: ["json-body"]})
            toast.success("JSON body generated")
        },
        onError: (error) => {
            toast.error("Failed to generate JSON body")
        }
    })
}