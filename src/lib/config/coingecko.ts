export const coingeckoConfig = {
  baseUrl: process.env.NEXT_PUBLIC_COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3',
  defaultChain: process.env.NEXT_PUBLIC_DEFAULT_CHAIN || 'ethereum',
}

export const chains = {
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
    assetPlatformId: 'ethereum',
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
    assetPlatformId: 'polygon-pos',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  bnb: {
    id: 'bnb',
    name: 'BNB Chain',
    chainId: 56,
    assetPlatformId: 'binance-smart-chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum One',
    chainId: 42161,
    assetPlatformId: 'arbitrum-one',
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
    assetPlatformId: 'optimistic-ethereum',
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
    assetPlatformId: 'base',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
} as const

export type ChainKey = keyof typeof chains

export const sortOptions = {
  market_cap_usd_desc: 'market_cap_usd_desc',
  volume_usd_desc: 'volume_usd_desc',
  floor_price_usd_desc: 'floor_price_usd_desc',
  market_cap_usd_asc: 'market_cap_usd_asc',
} as const

export type SortOption = keyof typeof sortOptions

export interface CoinGeckoNFT {
  id: string
  contract_address: string
  asset_platform_id: string
  name: string
  symbol: string
  image: {
    small: string
    large: string
    thumb: string
  }
  description: string
  native_currency: string
  links: {
    homepage: string
    twitter: string
    discord: string
  }
  floor_price: {
    native_currency: number
    usd: number
  }
  market_cap: {
    native_currency: number
    usd: number
  }
  volume_24h: {
    native_currency: number
    usd: number
  }
  volume_24h_percentage_change: number
  floor_price_24h_percentage_change: number
  floor_price_7d_percentage_change: number
  market_cap_rank: number
  native_last_updated_at: number
  content_updated_at: string
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

export function transformCoinGeckoNFT(
  coingeckoNFT: CoinGeckoNFT,
  chain: ChainKey = 'ethereum'
): Collection {
  const chainConfig = chains[chain]
  
  return {
    id: coingeckoNFT.contract_address || coingeckoNFT.id,
    name: coingeckoNFT.name || coingeckoNFT.contract_address,
    image: coingeckoNFT.image?.large || coingeckoNFT.image?.small || null,
    banner: null,
    description: coingeckoNFT.description || null,
    slug: coingeckoNFT.id,
    symbol: coingeckoNFT.symbol || null,
    ownerCount: null,
    tokenCount: null,
    onSaleCount: null,
    floorAsk: coingeckoNFT.floor_price
      ? {
          id: null,
          price: {
            currency: {
              contract: '',
              name: chainConfig?.nativeCurrency?.name || 'Ether',
              symbol: coingeckoNFT.native_currency?.toUpperCase() || chainConfig?.nativeCurrency?.symbol || 'ETH',
              decimals: chainConfig?.nativeCurrency?.decimals || 18,
            },
            amount: {
              raw: (coingeckoNFT.floor_price.native_currency || 0).toString(),
              decimal: coingeckoNFT.floor_price.native_currency || 0,
              usd: coingeckoNFT.floor_price.usd || null,
              native: coingeckoNFT.floor_price.native_currency || 0,
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
      '1day': coingeckoNFT.volume_24h?.usd || 0,
      '7day': 0,
      '30day': 0,
      allTime: coingeckoNFT.market_cap?.usd || 0,
    },
    volumeChange: {
      '1day': coingeckoNFT.volume_24h_percentage_change || 0,
      '7day': 0,
      '30day': 0,
    },
    floorSale: {
      '1day': coingeckoNFT.floor_price?.native_currency || null,
      '7day': null,
    },
    floorSaleChange: {
      '1day': coingeckoNFT.floor_price_24h_percentage_change || null,
      '7day': coingeckoNFT.floor_price_7d_percentage_change || null,
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
