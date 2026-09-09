import { inject } from '@vercel/analytics';

function shouldEnableVercelAnalytics() {
  if (typeof window === 'undefined') return false;
  const { hostname } = window.location;
  return (
    hostname.endsWith('.vercel.app') ||
    hostname === 'vercel.app' ||
    hostname.endsWith('.vercel.sh')
  );
}

if (shouldEnableVercelAnalytics()) {
  inject({ mode: 'production' });
}

export default function AnalyticsSetup() {
  return null;
}
