export const nftscanConfig = {
  apiKey: process.env.NEXT_PUBLIC_NFTSCAN_API_KEY || '',
  baseUrl: process.env.NEXT_PUBLIC_NFTSCAN_BASE_URL || 'https://restapi.nftscan.com',
  defaultChain: process.env.NEXT_PUBLIC_DEFAULT_CHAIN || 'ethereum',
}

export const chains = {
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
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
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  optimism: {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  base: {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
} as const

export type ChainKey = keyof typeof chains

export const sortFields = {
  marketcap: 'marketcap',
  volume24h: 'volume24h',
  volume7d: 'volume7d',
  volume30d: 'volume30d',
  floor_price: 'floor_price',
} as const

export type SortField = keyof typeof sortFields

export interface NFTScanCollection {
  contract_address: string
  contract_name: string
  symbol: string
  description: string
  logo_url: string
  banner_url: string
  owners: number
  items: number
  floor_price: number
  volume_1d: number
  volume_7d: number
  volume_30d: number
  volume_total: number
  volume_1d_change: number
  volume_7d_change: number
  volume_30d_change: number
  market_cap: number
  floor_price_symbol: string
  volume_1d_symbol: string
  volume_7d_symbol: string
  volume_30d_symbol: string
  volume_total_symbol: string
  market_cap_symbol: string
  image_url?: string
  sales_1d?: number
  sales_7d?: number
  sales_30d?: number
  sales_1d_change?: number
  sales_7d_change?: number
  sales_30d_change?: number
  floor_price_change_1d?: number
  floor_price_change_7d?: number
  floor_price_change_30d?: number
}

export interface NFTScanRankingResponse {
  code: number
  msg: string
  data: NFTScanCollection[]
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

export function transformNFTScanCollection(
  nftscanCollection: NFTScanCollection,
  chain: ChainKey = 'ethereum'
): Collection {
  const chainConfig = chains[chain]
  
  return {
    id: nftscanCollection.contract_address,
    name: nftscanCollection.contract_name || nftscanCollection.contract_address,
    image: nftscanCollection.logo_url || nftscanCollection.image_url || null,
    banner: nftscanCollection.banner_url || null,
    description: nftscanCollection.description || null,
    slug: nftscanCollection.contract_address,
    symbol: nftscanCollection.symbol || null,
    ownerCount: nftscanCollection.owners || null,
    tokenCount: nftscanCollection.items || null,
    onSaleCount: null,
    floorAsk: nftscanCollection.floor_price
      ? {
          id: null,
          price: {
            currency: {
              contract: '',
              name: chainConfig?.nativeCurrency?.name || 'Ether',
              symbol: nftscanCollection.floor_price_symbol || chainConfig?.nativeCurrency?.symbol || 'ETH',
              decimals: chainConfig?.nativeCurrency?.decimals || 18,
            },
            amount: {
              raw: nftscanCollection.floor_price.toString(),
              decimal: nftscanCollection.floor_price,
              usd: null,
              native: nftscanCollection.floor_price,
            },
          },
          maker: null,
          validFrom: null,
          validUntil: null,
          source: {
            id: '',
            name: 'Marketplace',
            domain: null,
            icon: null,
          },
        }
      : null,
    topBid: null,
    volume: {
      '1day': nftscanCollection.volume_1d || 0,
      '7day': nftscanCollection.volume_7d || 0,
      '30day': nftscanCollection.volume_30d || 0,
      allTime: nftscanCollection.volume_total || 0,
    },
    volumeChange: {
      '1day': nftscanCollection.volume_1d_change || 0,
      '7day': nftscanCollection.volume_7d_change || 0,
      '30day': nftscanCollection.volume_30d_change || 0,
    },
    floorSale: {
      '1day': nftscanCollection.floor_price || null,
      '7day': null,
    },
    floorSaleChange: {
      '1day': nftscanCollection.floor_price_change_1d || nftscanCollection.volume_1d_change || null,
      '7day': nftscanCollection.floor_price_change_7d || null,
    },
    collectionBidSupported: false,
    contractKind: null,
    mintDate: null,
    mintStages: null,
    royalties: null,
    lastFlagUpdate: null,
    lastFlagChange: null,
    openseaVerificationStatus: null,
    spamScore: null,
    isSpam: null,
    metadataDisabled: false,
    indexError: null,
    indexStatus: null,
    nameUpdatedAt: null,
    descriptionUpdatedAt: null,
    imageUpdatedAt: null,
    bannerUpdatedAt: null,
    royaltiesUpdatedAt: null,
    collectionsUpdate: null,
    createdAt: null,
    updatedAt: null,
  }
}
