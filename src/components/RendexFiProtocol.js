import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Wallet, TrendingUp, RefreshCw, Settings, Sun, Moon } from 'lucide-react';

// Multi Wallet Provider Detection and Connection
const getProvider = () => {
// Try Phantom first
if (‘phantom’ in window && window.phantom?.solana?.isPhantom) {
return { provider: window.phantom.solana, name: 'Phantom' };
}

// Try Solflare
if ('solflare' in window && window.solflare?.isSolflare) {
return { provider: window.solflare, name: 'Solflare' };
}

// Try Backpack
if ('backpack' in window && window.backpack?.isBackpack) {
return { provider: window.backpack, name: 'Backpack' };
}

// Try Glow
if ('glow' in window && window.glow?.isGlow) {
return { provider: window.glow, name: 'Glow' };
}

return null;
};

const RendexFiProtocol = () => {
const [activeTab, setActiveTab] = useState(‘swap’);
const [darkMode, setDarkMode] = useState(true);
const [connected, setConnected] = useState(false);
const [publicKey, setPublicKey] = useState(null);
const [provider, setProvider] = useState(null);
const [walletName, setWalletName] = useState(’’);
const [fromToken, setFromToken] = useState(‘SOL’);
const [toToken, setToToken] = useState(‘USDC’);
const [fromAmount, setFromAmount] = useState(’’);
const [toAmount, setToAmount] = useState(’’);
const [isSwapping, setIsSwapping] = useState(false);

// Initialize wallet connection on component mount
useEffect(() => {
const walletProvider = getProvider();
if (walletProvider) {
setProvider(walletProvider.provider);
setWalletName(walletProvider.name);
// Check if already connected
walletProvider.provider.connect({ onlyIfTrusted: true })
.then((resp) => {
setPublicKey(resp.publicKey.toString());
setConnected(true);
})
.catch(() => {
// Not connected, that’s fine
});
}
}, []);

// Connect to Solana Wallet
const connectWallet = async () => {
const walletProvider = getProvider();

```
if (!walletProvider) {
  alert('Keine Solana Wallet gefunden! Bitte installieren Sie Phantom, Solflare, Backpack oder Glow.');
  return;
}

try {
  setProvider(walletProvider.provider);
  setWalletName(walletProvider.name);
  const resp = await walletProvider.provider.connect();
  setPublicKey(resp.publicKey.toString());
  setConnected(true);
  console.log(`Connected to ${walletProvider.name}:`, resp.publicKey.toString());
} catch (err) {
  console.error('Connection failed:', err);
  alert(`Verbindung zu ${walletProvider?.name || 'Wallet'} fehlgeschlagen!`);
}
```

};

// Disconnect Solana Wallet
const disconnectWallet = async () => {
if (provider) {
try {
await provider.disconnect();
setConnected(false);
setPublicKey(null);
setWalletName(’’);
console.log(‘Disconnected from wallet’);
} catch (err) {
console.error(‘Disconnect failed:’, err);
}
}
};

// Mock portfolio data
const [portfolio, setPortfolio] = useState([]);

const tokens = [
{ symbol: ‘SOL’, name: ‘Solana’, price: 100.00, color: ‘purple’ },
{ symbol: ‘USDC’, name: ‘USD Coin’, price: 1.00, color: ‘blue’ },
{ symbol: ‘RAY’, name: ‘Raydium’, price: 0.40, color: ‘green’ },
{ symbol: ‘ORCA’, name: ‘Orca’, price: 0.90, color: ‘orange’ },
{ symbol: ‘BONK’, name: ‘Bonk’, price: 0.000015, color: ‘yellow’ }
];

const handleSwap = () => {
setIsSwapping(true);
setTimeout(() => {
setIsSwapping(false);
setFromAmount(’’);
setToAmount(’’);
// Simulate successful swap
alert(‘Swap erfolgreich! 🎉’);
}, 2000);
};

const swapTokens = () => {
const temp = fromToken;
setFromToken(toToken);
setToToken(temp);
const tempAmount = fromAmount;
setFromAmount(toAmount);
setToAmount(tempAmount);
};

const SwapInterface = () => (
<div className="space-y-6">
<div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30">
<div className="flex items-center justify-between mb-4">
<h3 className="text-xl font-bold text-cyan-300">Token Swap</h3>
<button className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors">
<Settings className="w-5 h-5 text-cyan-400" />
</button>
</div>

```
    <div className="space-y-4">
      {/* From Token */}
      <div className="bg-black/40 rounded-xl p-4 border border-cyan-500/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-cyan-400">Von</span>
          <span className="text-sm text-cyan-400">Balance: 12.5</span>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="bg-transparent text-cyan-300 font-semibold text-lg focus:outline-none"
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol} className="bg-gray-800">
                {token.symbol}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => {
              setFromAmount(e.target.value);
              if (e.target.value) {
                const fromPrice = tokens.find(t => t.symbol === fromToken)?.price || 1;
                const toPrice = tokens.find(t => t.symbol === toToken)?.price || 1;
                const estimated = (parseFloat(e.target.value) * fromPrice / toPrice).toFixed(6);
                setToAmount(estimated);
              } else {
                setToAmount('');
              }
            }}
            className="flex-1 bg-transparent text-right text-2xl font-bold text-cyan-300 placeholder-cyan-600 focus:outline-none min-w-0"
          />
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <button
          onClick={swapTokens}
          className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <ArrowDownUp className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* To Token */}
      <div className="bg-black/40 rounded-xl p-4 border border-cyan-500/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-cyan-400">Zu</span>
          <span className="text-sm text-cyan-400">Balance: 500.0</span>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="bg-transparent text-cyan-300 font-semibold text-lg focus:outline-none"
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol} className="bg-gray-800">
                {token.symbol}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0.0"
            value={toAmount}
            readOnly
            className="flex-1 bg-transparent text-right text-2xl font-bold text-cyan-300 placeholder-cyan-600 focus:outline-none min-w-0"
          />
        </div>
      </div>
    </div>

    {/* Swap Button */}
    <button
      onClick={handleSwap}
      disabled={!fromAmount || !connected || isSwapping}
      className="w-full mt-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 rounded-xl font-bold text-black disabled:text-gray-400 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
    >
      {isSwapping ? (
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Swapping...</span>
        </div>
      ) : !connected ? (
        'Wallet verbinden'
      ) : (
        'Swap durchführen'
      )}
    </button>
  </div>

  {/* Connection Status */}
  {connected && (
    <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-green-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-semibold">{walletName} Wallet verbunden</span>
        </div>
        <div className="text-cyan-300 font-mono text-sm">
          {publicKey?.slice(0,8)}...{publicKey?.slice(-8)}
        </div>
      </div>
    </div>
  )}

  {/* Recent Swaps */}
  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30">
    <h4 className="text-lg font-bold text-cyan-300 mb-4">Letzte Swaps</h4>
    <div className="text-center py-8">
      <div className="text-cyan-500 mb-2">Keine Swaps gefunden</div>
      <div className="text-cyan-600 text-sm">Ihre Swap-Historie wird hier angezeigt</div>
    </div>
  </div>
</div>
```

);

const PortfolioInterface = () => (
<div className="space-y-6">
{/* Portfolio Overview */}
<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
<div className="flex items-center justify-between mb-6">
<h3 className="text-xl font-bold text-white">Portfolio Übersicht</h3>
<button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
<RefreshCw className="w-5 h-5 text-white/70" />
</button>
</div>

```
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/20">
        <div className="text-sm text-cyan-400 mb-1">Gesamtwert</div>
        <div className="text-2xl font-bold text-cyan-300">$0.00</div>
        <div className="text-cyan-500 text-sm">0.0% (24h)</div>
      </div>
      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-400/20">
        <div className="text-sm text-cyan-400 mb-1">24h Änderung</div>
        <div className="text-2xl font-bold text-cyan-300">$0.00</div>
        <div className="text-cyan-500 text-sm">- Neutral</div>
      </div>
      <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 p-4 rounded-xl border border-green-400/20">
        <div className="text-sm text-cyan-400 mb-1">Assets</div>
        <div className="text-2xl font-bold text-cyan-300">0</div>
        <div className="text-cyan-500 text-sm">Tokens</div>
      </div>
    </div>
  </div>

  {/* Token Holdings */}
  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30">
    <h4 className="text-lg font-bold text-cyan-300 mb-4">Deine Assets</h4>
    {portfolio.length === 0 ? (
      <div className="text-center py-12">
        <div className="text-cyan-500 text-lg mb-2">Keine Assets gefunden</div>
        <div className="text-cyan-600 text-sm">Verbinden Sie Ihr Wallet, um Assets anzuzeigen</div>
      </div>
    ) : (
      <div className="space-y-4">
        {portfolio.map((token, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-black/40 rounded-xl hover:bg-black/60 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${token.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{token.symbol}</span>
              </div>
              <div>
                <div className="text-cyan-300 font-semibold">{token.name}</div>
                <div className="text-cyan-500 text-sm">{token.amount} {token.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-cyan-300 font-semibold">{token.value}</div>
              <div className={`text-sm ${token.change.startsWith('+') ? 'text-green-400' : token.change.startsWith('-') ? 'text-red-400' : 'text-cyan-500'}`}>
                {token.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Performance Chart Placeholder */}
  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30">
    <h4 className="text-lg font-bold text-cyan-300 mb-4">Portfolio Performance</h4>
    <div className="h-48 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
      <div className="text-center">
        <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
        <div className="text-cyan-500">Keine Daten verfügbar</div>
        <div className="text-sm text-cyan-600 mt-1">Verbinden Sie Ihr Wallet für Performance-Daten</div>
      </div>
    </div>
  </div>
</div>
```

);

return (
<div className={`min-h-screen transition-all duration-500 ${darkMode  ? 'bg-gradient-to-br from-black via-gray-900 to-black'  : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'}`}>

```
  {/* Header */}
  <div className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
    darkMode 
      ? 'bg-black/80 border-cyan-500/20' 
      : 'bg-white/80 border-blue-200/50'
  }`}>
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">RendexFi</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={connected ? disconnectWallet : connectWallet}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              connected 
                ? 'bg-gradient-to-r from-green-500 to-cyan-400 text-black' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-black hover:from-blue-600 hover:to-cyan-500'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4" />
              <span>{connected ? `${publicKey?.slice(0,4)}...${publicKey?.slice(-4)}` : 'Wallet verbinden'}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Navigation */}
  <div className="container mx-auto px-4 py-6">
    <div className={`flex justify-center mb-8`}>
      <div className={`backdrop-blur-md rounded-2xl p-2 border transition-colors duration-300 ${
        darkMode 
          ? 'bg-black/60 border-cyan-500/30' 
          : 'bg-white/60 border-blue-200/50'
      }`}>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('swap')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'swap'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-black shadow-lg transform scale-105'
                : darkMode 
                  ? 'text-cyan-300 hover:text-white hover:bg-cyan-500/20'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-100/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ArrowDownUp className="w-4 h-4" />
              <span>Swap</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'portfolio'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-black shadow-lg transform scale-105'
                : darkMode 
                  ? 'text-cyan-300 hover:text-white hover:bg-cyan-500/20'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-100/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Portfolio</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-2xl mx-auto">
      {activeTab === 'swap' ? <SwapInterface /> : <PortfolioInterface />}
    </div>
  </div>

  {/* Footer */}
  <div className={`text-center py-8 transition-colors duration-300 ${
    darkMode ? 'bg-black/20' : 'bg-blue-50/50'
  }`}>
    <div className="container mx-auto px-4">
      <div className={`text-sm mb-4 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
        Powered by RendexFi • DeFi Made Simple
      </div>
      <div className={`text-xs mb-6 ${darkMode ? 'text-cyan-600' : 'text-blue-500'}`}>
        ⚡ Schnell • 🔐 Sicher • 🌈 Benutzerfreundlich
      </div>
      
      {/* Theme Toggle in Footer */}
      <div className="flex justify-center items-center space-x-4">
        <span className={`text-sm ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
          Theme:
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            darkMode ? 'bg-cyan-600' : 'bg-blue-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <div className="flex items-center space-x-2">
          <Sun className={`w-4 h-4 ${darkMode ? 'text-cyan-600' : 'text-blue-600'}`} />
          <span className={`text-xs ${darkMode ? 'text-cyan-600' : 'text-blue-600'}`}>
            {darkMode ? 'Hell' : 'Dunkel'}
          </span>
          <Moon className={`w-4 h-4 ${darkMode ? 'text-cyan-400' : 'text-blue-400'}`} />
        </div>
      </div>
      
      {/* Supported Wallets */}
      <div className={`mt-6 text-xs ${darkMode ? 'text-cyan-600' : 'text-blue-500'}`}>
        Unterstützte Wallets: Phantom • Solflare • Backpack • Glow
      </div>
    </div>
  </div>
</div>
```

);
};

export default RendexFiProtocol;