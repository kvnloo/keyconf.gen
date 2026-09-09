// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
const geistSans = Geist(stryMutAct_9fa48("1866") ? {} : (stryCov_9fa48("1866"), {
  variable: stryMutAct_9fa48("1867") ? "" : (stryCov_9fa48("1867"), '--font-geist-sans'),
  subsets: stryMutAct_9fa48("1868") ? [] : (stryCov_9fa48("1868"), [stryMutAct_9fa48("1869") ? "" : (stryCov_9fa48("1869"), 'latin')])
}));
const geistMono = Geist_Mono(stryMutAct_9fa48("1870") ? {} : (stryCov_9fa48("1870"), {
  variable: stryMutAct_9fa48("1871") ? "" : (stryCov_9fa48("1871"), '--font-geist-mono'),
  subsets: stryMutAct_9fa48("1872") ? [] : (stryCov_9fa48("1872"), [stryMutAct_9fa48("1873") ? "" : (stryCov_9fa48("1873"), 'latin')])
}));
export const metadata: Metadata = stryMutAct_9fa48("1874") ? {} : (stryCov_9fa48("1874"), {
  title: stryMutAct_9fa48("1875") ? "" : (stryCov_9fa48("1875"), 'Keyconf | Your keyboard, every detail'),
  icons: stryMutAct_9fa48("1876") ? {} : (stryCov_9fa48("1876"), {
    icon: stryMutAct_9fa48("1877") ? "" : (stryCov_9fa48("1877"), 'favicon.svg')
  }),
  description: stryMutAct_9fa48("1878") ? "" : (stryCov_9fa48("1878"), 'Build a keyboard in 3D. Explore materials, colors, parts, and sound with source-backed compatibility.')
});
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (stryMutAct_9fa48("1879")) {
    {}
  } else {
    stryCov_9fa48("1879");
    return <html lang="en">
      <head>
        <base href="/" />
      </head>
      <body className={stryMutAct_9fa48("1880") ? `` : (stryCov_9fa48("1880"), `${geistSans.variable} ${geistMono.variable} antialiased`)}>
        {children}
      </body>
    </html>;
  }
}