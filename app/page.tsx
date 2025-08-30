// app/page.tsx
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Deine Komponente ( muss mit großem Buchstaben beginnen!)
export default function HomePage() {
  return (
    <div>
      <h1>RendexFi Protocol 🚀</h1>
      <WalletMultiButton />
      {/* Hier kommen später deine Vaults hin */}
    </div>
  );
}

// ODER als Arrow-Function:
// const HomePage = () => { ... }
// export default HomePage;