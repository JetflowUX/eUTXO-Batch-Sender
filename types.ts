
export interface Token {
  id: string;
  ticker: string;
  name: string;
  balance: number;
  logo: string;
  color?: string;
}

export interface BundleRow {
  id: string;
  tokenId: string;
  amount: string;
}

export interface WalletState {
  connected: boolean;
  address: string;
  balance: number;
}
