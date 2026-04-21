import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, base, arbitrum } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const metadata = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'NFT Marketplace',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A decentralized NFT marketplace',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, base, arbitrum],
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_RPC || undefined),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC || undefined),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_MAINNET_RPC || undefined),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_MAINNET_RPC || undefined),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_MAINNET_RPC || undefined),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
