export const serializeFilters = (filter?: Record<string, string | string[]>) => {
    const serialized: Record<string, string> = {}

    for (const [key, value] of Object.entries(filter ?? {})) {
        if (Array.isArray(value)) {
            serialized[key] = value.join(',')
        } else {
            serialized[key] = value
        }
    }

    return serialized
}
