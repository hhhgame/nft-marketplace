declare module 'nftscan-api' {
  export enum EvmChain {
    ETH = 'eth',
    BNB = 'bnb',
    POLYGON = 'polygon',
    OPTIMISM = 'optimism',
    MINT = 'mint',
    MANTLE = 'mantle',
    BASE = 'base',
    SEI = 'sei',
    GRAVITY = 'gravity',
    BERA = 'bera',
    VICTION = 'viction',
  }

  export enum ErcType {
    ERC_721 = 'erc721',
    ERC_1155 = 'erc1155',
  }

  export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
  }

  export interface NftscanConfig {
    apiKey: string
    chain?: EvmChain
    baseUrl?: string
  }

  export interface BaseNsPaginationReqParam {
    cursor?: string
    limit?: number
  }

  export interface BaseNsPaginationResData {
    next: string
    total: number
  }

  export interface CollectionRankingReqParam {
    sortField?: string
    sortDirection?: string
    limit?: number
  }

  export interface NftscanCollection {
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

  export interface CollectionRankingResponse extends BaseNsPaginationResData {
    content: NftscanCollection[]
  }

  export class NftscanEvm {
    constructor(config: NftscanConfig)
    
    statistic: {
      getCollectionRanking(params?: CollectionRankingReqParam): Promise<CollectionRankingResponse>
    }
  }

  export class NftscanSolana {
    constructor(config: { apiKey: string })
  }
}
