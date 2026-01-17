
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Wallet, 
  ChevronDown, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Info,
  Zap
} from 'lucide-react';
import { AVAILABLE_TOKENS, NETWORK_FEE } from './constants';
import { BundleRow, Token, WalletState } from './types';

const App: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: true,
    address: 'addr1q9y976y7w8987z6x5c4v3b2n1m9xyz',
    balance: 1240.50
  });

  const [recipient, setRecipient] = useState('addr1q9y976y7w8987z6x5c4v3b2n1m9xyz');
  const [adaAmount, setAdaAmount] = useState('42.00');
  const [bundleRows, setBundleRows] = useState<BundleRow[]>([
    { id: '1', tokenId: 'hosky', amount: '1000000' },
    { id: '2', tokenId: 'snek', amount: '5000' }
  ]);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  // Validation
  const isAddressValid = useMemo(() => {
    return recipient.startsWith('addr1') && recipient.length > 50;
  }, [recipient]);

  const isValidTransaction = useMemo(() => {
    const hasRecipient = isAddressValid;
    const hasAda = parseFloat(adaAmount) > 0;
    const hasBundleAsset = bundleRows.some(row => parseFloat(row.amount) > 0);
    return hasRecipient && (hasAda || hasBundleAsset);
  }, [isAddressValid, adaAmount, bundleRows]);

  const handleAddRow = () => {
    if (bundleRows.length < 8) {
      setBundleRows([...bundleRows, { id: Math.random().toString(), tokenId: AVAILABLE_TOKENS[0].id, amount: '' }]);
    }
  };

  const handleRemoveRow = (id: string) => {
    setBundleRows(bundleRows.filter(r => r.id !== id));
  };

  const handleUpdateRow = (id: string, updates: Partial<BundleRow>) => {
    setBundleRows(bundleRows.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const openTokenPicker = (rowId: string) => {
    setActiveRowId(rowId);
    setIsTokenModalOpen(true);
  };

  const selectToken = (token: Token) => {
    if (activeRowId) {
      handleUpdateRow(activeRowId, { tokenId: token.id });
      setIsTokenModalOpen(false);
      setActiveRowId(null);
    }
  };

  const totalAdaCost = useMemo(() => {
    const base = parseFloat(adaAmount) || 0;
    return base + NETWORK_FEE;
  }, [adaAmount]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 border-b border-white/10 sticky top-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Layers className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">eUTXO Batch Sender</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Tier-1 Cardano Protocol</p>
          </div>
        </div>

        <div>
          {wallet.connected ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-sm font-mono text-white/80">{wallet.address.slice(0, 5)}...{wallet.address.slice(-4)}</span>
              <div className="w-px h-4 bg-white/10"></div>
              <span className="text-sm font-bold text-green-400">{wallet.balance.toLocaleString()} ADA</span>
              <Wallet className="w-4 h-4 text-white/40 ml-1" />
            </div>
          ) : (
            <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-10 md:py-16">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Main Dashboard</h2>
          <p className="text-lg text-white/50 max-w-2xl font-medium leading-relaxed">
            Configure your Cardano multi-asset batch transaction with optimized eUTXO efficiency. Bundle assets into single atomic UTXOs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Configuration Card */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card rounded-3xl p-6 md:p-10">
              
              {/* Recipient */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold">Recipient Configuration</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Recipient Address or $handle"
                      className={`w-full bg-white/5 border rounded-2xl px-5 py-5 text-lg font-mono outline-none transition-all pr-12 focus:ring-4 ${
                        isAddressValid 
                          ? 'border-green-500/50 focus:ring-green-500/10' 
                          : 'border-white/10 focus:ring-indigo-500/10 focus:border-indigo-500/50'
                      }`}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      {isAddressValid ? (
                        <CheckCircle className="text-green-500 w-6 h-6 animate-in zoom-in" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/20"></div>
                      )}
                    </div>
                  </div>
                  {!isAddressValid && recipient.length > 0 && (
                    <div className="flex items-center gap-1.5 text-red-400 px-1 pt-1 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">Invalid Cardano address format</span>
                    </div>
                  )}
                  {isAddressValid && (
                    <div className="text-xs text-green-400 font-bold px-1 pt-1 tracking-wide uppercase">
                      ✓ Valid Mainnet Address Detected
                    </div>
                  )}
                </div>
              </div>

              {/* ADA Asset */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Info className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold">Base Asset (ADA)</h3>
                </div>

                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30">₳</div>
                    <div>
                      <p className="font-bold text-lg">Cardano</p>
                      <p className="text-xs text-white/40 font-medium">Min. UTF Requirement: 1.00 ADA</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-3 mb-1">
                      <input 
                        type="text" 
                        value={adaAmount}
                        onChange={(e) => setAdaAmount(e.target.value)}
                        className="bg-transparent border-none text-right font-black text-2xl p-0 focus:ring-0 w-32 tracking-tight"
                      />
                      <span className="text-white/40 font-bold text-lg">ADA</span>
                    </div>
                    <p className="text-xs text-white/40">Available: <span className="text-white/60 font-mono">1,240.50 ADA</span></p>
                  </div>
                </div>
              </div>

              {/* Bundle Native Tokens */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <Zap className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold">Bundle Native Tokens <span className="text-white/20 font-medium">(Max 8)</span></h3>
                  </div>
                  <span className="text-[10px] font-black bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider text-white/60">
                    {bundleRows.length} / 8 Selected
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {bundleRows.map((row) => {
                    const token = AVAILABLE_TOKENS.find(t => t.id === row.tokenId) || AVAILABLE_TOKENS[0];
                    return (
                      <div key={row.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 animate-in slide-in-from-left-2 duration-300">
                        <button 
                          onClick={() => openTokenPicker(row.id)}
                          className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 hover:bg-white/10 transition-all min-w-[180px]"
                        >
                          <img src={token.logo} alt={token.ticker} className="w-7 h-7 rounded-full object-cover ring-2 ring-white/10" />
                          <span className="font-bold text-sm">{token.ticker}</span>
                          <ChevronDown className="w-4 h-4 ml-auto text-white/30" />
                        </button>

                        <div className="flex-1 flex items-center justify-end gap-4">
                          <input 
                            type="number" 
                            placeholder="0.00"
                            value={row.amount}
                            onChange={(e) => handleUpdateRow(row.id, { amount: e.target.value })}
                            className="bg-transparent border-none text-right font-bold text-xl p-0 focus:ring-0 w-full placeholder:text-white/10"
                          />
                          <button className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition-all">
                            MAX
                          </button>
                        </div>

                        <div className="w-px h-8 bg-white/10"></div>
                        
                        <button 
                          onClick={() => handleRemoveRow(row.id)}
                          className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={handleAddRow}
                  className="w-full py-5 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white/30 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                >
                  <div className="p-1.5 bg-white/5 rounded-full group-hover:bg-indigo-500 transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm tracking-widest uppercase">Add Another Asset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="glass-card rounded-3xl overflow-hidden border border-indigo-500/20">
              {/* Header Visual */}
              <div className="p-8 text-center bg-indigo-600/10 border-b border-white/10 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)]"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/40 mb-4 animate-bounce duration-[3000ms]">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-1">Bundle Overview</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Transaction ID: Pending</p>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Breakout */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white/40">Base Sending</span>
                    <span className="font-bold font-mono">{parseFloat(adaAmount || '0').toFixed(2)} ADA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white/40">Bundled Native Tokens</span>
                    <span className="font-bold font-mono">{bundleRows.length} Assets</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-sm font-medium text-white/40 flex items-center gap-1.5">
                      Network Fee 
                      <Info className="w-3.5 h-3.5 opacity-50 cursor-help" />
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-indigo-300">~{NETWORK_FEE} ADA</span>
                      <div className="bg-green-500/20 text-green-400 text-[9px] font-black px-1.5 py-0.5 rounded border border-green-500/30">SAVING FEE</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Total Payload Cost</p>
                        <p className="text-3xl font-black tracking-tight">{totalAdaCost.toFixed(2)} ADA</p>
                      </div>
                      <p className="text-[10px] text-white/30 mb-1">Incl. minUTXO + fees</p>
                    </div>
                  </div>
                </div>

                {/* Efficiency Badge */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 relative overflow-hidden group hover:bg-green-500/15 transition-all">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 blur-2xl rounded-full translate-x-10 -translate-y-10"></div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/20 shrink-0">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-green-400 uppercase tracking-wider mb-1">eUTXO Efficiency</h4>
                      <p className="text-sm text-green-100/60 leading-tight">1 Transaction Fee for <span className="text-green-400 font-bold">{bundleRows.length + 1}</span> Asset outputs.</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button 
                  disabled={!isValidTransaction}
                  className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm tracking-widest uppercase shadow-2xl ${
                    isValidTransaction 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:scale-[1.02] active:scale-95 shadow-indigo-500/30 cursor-pointer' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                  }`}
                >
                  Review Bundle Transaction
                  <ArrowRight className={`w-5 h-5 transition-transform ${isValidTransaction ? 'group-hover:translate-x-1' : ''}`} />
                </button>
                <div className="flex items-center justify-center gap-2 opacity-30">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secured by Cardano Ledger Technology</span>
                </div>
              </div>
            </div>

            {/* Micro Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-[10px] font-black text-white/30 uppercase mb-1">Network</p>
                <p className="text-xs font-bold text-white/80">Mainnet</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-[10px] font-black text-white/30 uppercase mb-1">Epoch</p>
                <p className="text-xs font-bold text-white/80">492</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-[10px] font-black text-white/30 uppercase mb-1">Slot</p>
                <p className="text-xs font-bold text-white/80">42,912</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-black/40 py-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white/30 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Non-custodial. You maintain control of your private keys.
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs font-bold text-white/40 hover:text-indigo-400 transition-colors uppercase tracking-widest">Docs</a>
            <a href="#" className="text-xs font-bold text-white/40 hover:text-indigo-400 transition-colors uppercase tracking-widest">Support</a>
            <a href="#" className="text-xs font-bold text-white/40 hover:text-indigo-400 transition-colors uppercase tracking-widest flex items-center gap-1.5">
              Github <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Asset Picker Modal */}
      {isTokenModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTokenModalOpen(false)}></div>
          <div className="glass-card rounded-3xl w-full max-w-md p-6 relative z-10 border-white/20 animate-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black">Select Asset</h3>
              <button onClick={() => setIsTokenModalOpen(false)} className="text-white/40 hover:text-white transition-all">
                <Plus className="rotate-45 w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {AVAILABLE_TOKENS.map((token) => (
                <button 
                  key={token.id}
                  onClick={() => selectToken(token)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all text-left group"
                >
                  <img src={token.logo} alt={token.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-bold text-sm tracking-tight">{token.ticker}</p>
                    <p className="text-[10px] text-white/40 font-medium">{token.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold font-mono">{token.balance.toLocaleString()}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-tighter">Balance</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
