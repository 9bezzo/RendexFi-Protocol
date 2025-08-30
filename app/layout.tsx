import { Providers } from './providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RendexFi Protocol',
  description: 'Next-gen DeFi on Solana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Providers>
          {/* Navigation kommt hier hin */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}