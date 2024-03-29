import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Mumbai = {
  id: 80001,
  name: 'Mumbai',
  iconUrl: 'https://chainlist.org/unknown-logo.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Mumbai', symbol: 'Matic', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/polygon_mumbai'] },
  },
}

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    sepolia,
    Mumbai
  ],
  ssr: true,
});

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
