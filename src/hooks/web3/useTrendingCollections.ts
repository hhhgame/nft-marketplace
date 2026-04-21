'use client'

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { 
  openseaConfig, 
  chains, 
  type ChainKey, 
  type Collection,
  type OpenSeaCollection,
  transformOpenSeaCollection
} from '@/lib/config/opensea'

export interface UseTrendingCollectionsOptions {
  chain?: ChainKey
  sortBy?: 'seven_day_volume' | 'market_cap' | 'num_owners' | 'one_day_change' | 'seven_day_change'
  limit?: number
  next?: string
}

const getOpenseaChain = (chain: ChainKey): string => {
  return chains[chain]?.openseaChain || 'ethereum'
}

export async function fetchTrendingCollections({
  chain = 'ethereum',
  sortBy = 'seven_day_volume',
  limit = 20,
  next,
}: UseTrendingCollectionsOptions): Promise<{
  collections: Collection[]
  continuation: string | null
}> {
  const openseaChain = getOpenseaChain(chain)
  
  console.log('OpenSea API Request:', {
    chain,
    openseaChain,
    sortBy,
    limit,
    next,
    baseUrl: openseaConfig.baseUrl,
    apiKeyConfigured: !!openseaConfig.apiKey,
  })
  
  const params = new URLSearchParams({
    order_by: sortBy,
    limit: limit.toString(),
    chain: openseaChain,
  })
  
  if (next) {
    params.append('next', next)
  }
  
  const url = `${openseaConfig.baseUrl}/collections?${params.toString()}`
  
  console.log('OpenSea API URL:', url)
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (openseaConfig.apiKey && openseaConfig.apiKey !== 'your-opensea-api-key') {
    headers['X-API-KEY'] = openseaConfig.apiKey
    console.log('OpenSea API Key configured:', openseaConfig.apiKey.substring(0, 8) + '...')
  }
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 300 },
    })
    
    console.log('OpenSea API Response Status:', response.status)
    console.log('OpenSea API Response OK:', response.ok)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenSea API Error Response:', errorText)
      
      if (response.status === 401) {
        throw new Error('OpenSea API Key is invalid. Please check your API Key in .env.local')
      }
      
      if (response.status === 429) {
        throw new Error('OpenSea API rate limit exceeded. Please try again later.')
      }
      
      throw new Error(`OpenSea API Error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    console.log('OpenSea API Response:', {
      collectionsCount: data.collections?.length || 0,
      next: data.next,
      firstItem: data.collections?.[0] ? {
        collection: data.collections[0].collection,
        name: data.collections[0].name,
        stats: data.collections[0].stats,
      } : 'No data',
    })
    
    const collections: Collection[] = (data.collections || []).map((openseaCollection: OpenSeaCollection) => 
      transformOpenSeaCollection(openseaCollection, chain)
    )
    
    return {
      collections,
      continuation: data.next || null,
    }
  } catch (error: unknown) {
    const err = error as { message?: string; name?: string; stack?: string }
    
    console.error('OpenSea API Error:', {
      message: err?.message,
      name: err?.name,
      stack: err?.stack,
      fullError: error,
    })
    
    if (err?.message?.includes('401') || err?.message?.includes('invalid')) {
      throw new Error('OpenSea API Key is invalid. Please check your API Key in .env.local')
    }
    
    if (err?.message?.includes('429') || err?.message?.includes('rate limit')) {
      throw new Error('OpenSea API rate limit exceeded. Please try again later.')
    }
    
    throw new Error(`OpenSea API Error: ${err?.message || 'Unknown error'}`)
  }
}

export function useTrendingCollections(
  options: UseTrendingCollectionsOptions = {},
  queryOptions?: Omit<
    UseQueryOptions<
      { collections: Collection[]; continuation: string | null },
      Error
    >,
    'queryKey' | 'queryFn'
  >
) {
  const { chain = 'ethereum', sortBy = 'seven_day_volume', limit = 20, next } = options
  
  return useQuery({
    queryKey: ['trendingCollections', chain, sortBy, limit, next],
    queryFn: () => fetchTrendingCollections(options),
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  })
}
