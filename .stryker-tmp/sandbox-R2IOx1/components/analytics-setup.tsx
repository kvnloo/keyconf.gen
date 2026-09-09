// @ts-nocheck
import { inject } from '@vercel/analytics';

inject({ mode: 'production' });

export default function AnalyticsSetup() {
  return null;
}
