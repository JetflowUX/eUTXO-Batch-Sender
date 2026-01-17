
import { Token } from './types';

export const AVAILABLE_TOKENS: Token[] = [
  { 
    id: 'hosky', 
    ticker: '$HOSKY', 
    name: 'Hosky Token', 
    balance: 4200000000, 
    logo: 'https://picsum.photos/seed/hosky/64/64',
    color: 'bg-blue-500'
  },
  { 
    id: 'snek', 
    ticker: '$SNEK', 
    name: 'Snek', 
    balance: 150000, 
    logo: 'https://picsum.photos/seed/snek/64/64',
    color: 'bg-green-500'
  },
  { 
    id: 'meld', 
    ticker: '$MELD', 
    name: 'Meld', 
    balance: 24500, 
    logo: 'https://picsum.photos/seed/meld/64/64',
    color: 'bg-indigo-600'
  },
  { 
    id: 'copi', 
    ticker: '$COPI', 
    name: 'Cornucopias', 
    balance: 8900, 
    logo: 'https://picsum.photos/seed/copi/64/64',
    color: 'bg-yellow-500'
  },
  { 
    id: 'indi', 
    ticker: '$INDI', 
    name: 'Indigo', 
    balance: 1200, 
    logo: 'https://picsum.photos/seed/indi/64/64',
    color: 'bg-purple-500'
  }
];

export const NETWORK_FEE = 0.18;
