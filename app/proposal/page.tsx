import type { Metadata } from 'next';
import ProposalPage from './proposal-page';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Your keyboard proposal | Keyconf',
  description: 'Explore a keyboard proposal from your builder.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default function Page() {
  return <ProposalPage />;
}
