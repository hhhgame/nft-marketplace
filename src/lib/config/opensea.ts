export const openseaConfig = {
  apiKey: process.env.NEXT_PUBLIC_OPENSEA_API_KEY || '',
  baseUrl: process.env.NEXT_PUBLIC_OPENSEA_BASE_URL || 'https://api.opensea.io/v2',
  defaultChain: process.env.NEXT_PUBLIC_DEFAULT_CHAIN || 'ethereum',
}

export const chains = {
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
    openseaChain: 'ethereum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    openseaChain: 'polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  base: {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    openseaChain: 'base',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum One',
    chainId: 42161,
    openseaChain: 'arbitrum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  optimism: {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    openseaChain: 'optimism',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  bnb: {
    id: 'bnb',
    name: 'BNB Chain',
    chainId: 56,
    openseaChain: 'bsc',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
} as const

export type ChainKey = keyof typeof chains

export const sortOptions = {
  seven_day_volume: 'seven_day_volume',
  market_cap: 'market_cap',
  num_owners: 'num_owners',
  one_day_change: 'one_day_change',
  seven_day_change: 'seven_day_change',
} as const

export type SortOption = keyof typeof sortOptions

export interface OpenSeaCollection {
  collection: string
  name: string
  description: string
  image_url: string
  banner_image_url: string
  owner: string
  safelist_request_status: string
  is_nsfw: boolean
  trading_history: boolean
  traits: Record<string, Record<string, number>>
  payment_tokens: unknown[]
  editors: string[]
  stats: {
    one_day_volume: number
    one_day_change: number
    one_day_sales: number
    one_day_average_price: number
    seven_day_volume: number
    seven_day_change: number
    seven_day_sales: number
    seven_day_average_price: number
    thirty_day_volume: number
    thirty_day_change: number
    thirty_day_sales: number
    thirty_day_average_price: number
    total_volume: number
    total_sales: number
    total_supply: number
    count: number
    num_owners: number
    average_price: number
    num_reports: number
    market_cap: number
    floor_price: number
    floor_price_symbol: string
  }
  banners: { type: string; source: string }[]
  category: string
  is_rarity_enabled: boolean
  is_creator_fees_enforced: boolean
  is_protected: boolean
  display_data: {
    card_display_style: string
    images: unknown[]
  }
  external_url: string
  twitter_username: string
  discord_url: string
  instagram_username: string
  telegram_url: string
  wiki_url: string
  medium_username: string
  is_verified: boolean
  created_date: string
  contracts: {
    address: string
    chain: string
  }[]
  primary_asset_contracts: {
    address: string
    chain: string
  }[]
  fees: Record<string, Record<string, unknown>>
  payout_address: string
  collection_fees: {
    protocol_fees: unknown[]
    optional_royalties: unknown[]
    creator_basis_points: string
    seller_fees: unknown[]
  }
  is_editor: boolean
  is_owner: boolean
  owner_addresses: string[]
  has_collection_offers: boolean
  has_item_offers: boolean
}

export interface OpenSeaCollectionsResponse {
  collections: OpenSeaCollection[]
  next: string | null
}

export interface Collection {
  id: string
  name: string
  image: string | null
  banner: string | null
  description: string | null
  slug: string | null
  symbol: string | null
  ownerCount: number | null
  tokenCount: number | null
  onSaleCount: number | null
  floorAsk: {
    id: string | null
    price: {
      currency: {
        contract: string
        name: string
        symbol: string
        decimals: number
      }
      amount: {
        raw: string
        decimal: number
        usd: number | null
        native: number
      }
    }
    maker: string | null
    validFrom: number | null
    validUntil: number | null
    source: {
      id: string
      name: string
      domain: string | null
      icon: string | null
    }
  } | null
  topBid: {
    id: string | null
    price: {
      currency: {
        contract: string
        name: string
        symbol: string
        decimals: number
      }
      amount: {
        raw: string
        decimal: number
        usd: number | null
        native: number
      }
    }
    maker: string | null
    validFrom: number | null
    validUntil: number | null
    source: {
      id: string
      name: string
      domain: string | null
      icon: string | null
    }
  } | null
  volume: {
    '1day': number
    '7day': number
    '30day': number
    allTime: number
  }
  volumeChange: {
    '1day': number
    '7day': number
    '30day': number
  }
  floorSale: {
    '1day': number | null
    '7day': number | null
  }
  floorSaleChange: {
    '1day': number | null
    '7day': number | null
  }
  collectionBidSupported: boolean
  contractKind: string | null
  mintDate: string | null
  mintStages: unknown[] | null
  royalties: {
    bps: number
    recipient: string | null
  }[] | null
  lastFlagUpdate: string | null
  lastFlagChange: string | null
  openseaVerificationStatus: string | null
  spamScore: number | null
  isSpam: boolean | null
  metadataDisabled: boolean
  indexError: string | null
  indexStatus: string | null
  nameUpdatedAt: string | null
  descriptionUpdatedAt: string | null
  imageUpdatedAt: string | null
  bannerUpdatedAt: string | null
  royaltiesUpdatedAt: string | null
  collectionsUpdate: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface TrendingCollectionsResponse {
  collections: Collection[]
  continuation: string | null
}

export function transformOpenSeaCollection(
  openSeaCollection: OpenSeaCollection,
  chain: ChainKey = 'ethereum'
): Collection {
  const chainConfig = chains[chain]
  const stats = openSeaCollection.stats || {}
  
  const floorPriceSymbol = stats.floor_price_symbol || chainConfig?.nativeCurrency?.symbol || 'ETH'
  
  return {
    id: openSeaCollection.contracts?.[0]?.address || openSeaCollection.collection,
    name: openSeaCollection.name || openSeaCollection.collection,
    image: openSeaCollection.image_url || null,
    banner: openSeaCollection.banner_image_url || null,
    description: openSeaCollection.description || null,
    slug: openSeaCollection.collection,
    symbol: null,
    ownerCount: stats.num_owners || null,
    tokenCount: stats.total_supply || null,
    onSaleCount: null,
    floorAsk: stats.floor_price
      ? {
          id: null,
          price: {
            currency: {
              contract: '',
              name: floorPriceSymbol === 'ETH' ? 'Ether' : floorPriceSymbol,
              symbol: floorPriceSymbol,
              decimals: 18,
            },
            amount: {
              raw: (stats.floor_price || 0).toString(),
              decimal: stats.floor_price || 0,
              usd: null,
              native: stats.floor_price || 0,
            },
          },
          maker: null,
          validFrom: null,
          validUntil: null,
          source: {
            id: 'opensea',
            name: 'OpenSea',
            domain: 'opensea.io',
            icon: null,
          },
        }
      : null,
    topBid: null,
    volume: {
      '1day': stats.one_day_volume || 0,
      '7day': stats.seven_day_volume || 0,
      '30day': stats.thirty_day_volume || 0,
      allTime: stats.total_volume || 0,
    },
    volumeChange: {
      '1day': stats.one_day_change || 0,
      '7day': stats.seven_day_change || 0,
      '30day': stats.thirty_day_change || 0,
    },
    floorSale: {
      '1day': stats.one_day_average_price || null,
      '7day': stats.seven_day_average_price || null,
    },
    floorSaleChange: {
      '1day': stats.one_day_change || null,
      '7day': stats.seven_day_change || null,
    },
    collectionBidSupported: openSeaCollection.has_collection_offers || false,
    contractKind: null,
    mintDate: null,
    mintStages: null,
    royalties: null,
    lastFlagUpdate: null,
    lastFlagChange: null,
    openseaVerificationStatus: openSeaCollection.safelist_request_status || null,
    spamScore: null,
    isSpam: openSeaCollection.is_nsfw || null,
    metadataDisabled: false,
    indexError: null,
    indexStatus: null,
    nameUpdatedAt: null,
    descriptionUpdatedAt: null,
    imageUpdatedAt: null,
    bannerUpdatedAt: null,
    royaltiesUpdatedAt: null,
    collectionsUpdate: null,
    createdAt: openSeaCollection.created_date || null,
    updatedAt: null,
  }
}
