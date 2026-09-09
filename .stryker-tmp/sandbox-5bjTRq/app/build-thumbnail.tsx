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
import genericLayouts from '../public/models/layouts.json';
import q1Layout from '../docs/reference-assets/keychron-q1-max-layout.json';
import type { BuildThumbnail as Thumbnail } from '../lib/build-thumbnail';
import { q1StockEncoderColor } from '../lib/keyboard-variant';
import './build-thumbnail.css';
const layouts = stryMutAct_9fa48("431") ? {} : (stryCov_9fa48("431"), {
  'generic-60': stryMutAct_9fa48("432") ? {} : (stryCov_9fa48("432"), {
    keys: genericLayouts[stryMutAct_9fa48("433") ? "" : (stryCov_9fa48("433"), '60')],
    width: 15,
    height: 5,
    label: stryMutAct_9fa48("434") ? "" : (stryCov_9fa48("434"), '60% layout study')
  }),
  'generic-65': stryMutAct_9fa48("435") ? {} : (stryCov_9fa48("435"), {
    keys: genericLayouts[stryMutAct_9fa48("436") ? "" : (stryCov_9fa48("436"), '65')],
    width: 16,
    height: 5,
    label: stryMutAct_9fa48("437") ? "" : (stryCov_9fa48("437"), '65% layout study')
  }),
  'generic-75': stryMutAct_9fa48("438") ? {} : (stryCov_9fa48("438"), {
    keys: genericLayouts[stryMutAct_9fa48("439") ? "" : (stryCov_9fa48("439"), '75')],
    width: 16,
    height: 6,
    label: stryMutAct_9fa48("440") ? "" : (stryCov_9fa48("440"), '75% layout study')
  }),
  'q1-max-ansi': stryMutAct_9fa48("441") ? {} : (stryCov_9fa48("441"), {
    keys: q1Layout.keys,
    ...q1Layout.bounds,
    label: stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), 'Q1 Max ANSI · illustrated case')
  })
});
export default function BuildThumbnail({
  thumbnail
}: {
  thumbnail: Thumbnail | null;
}) {
  if (stryMutAct_9fa48("443")) {
    {}
  } else {
    stryCov_9fa48("443");
    if (stryMutAct_9fa48("446") ? false : stryMutAct_9fa48("445") ? true : stryMutAct_9fa48("444") ? thumbnail : (stryCov_9fa48("444", "445", "446"), !thumbnail)) return <div className="build-thumbnail-unavailable">
        Visual preview unavailable
      </div>;
    const {
      keys,
      width,
      height,
      label
    } = layouts[thumbnail.geometry];
    const {
      colors
    } = thumbnail;
    return <figure className="build-thumbnail" data-geometry={thumbnail.geometry} aria-label={stryMutAct_9fa48("447") ? `` : (stryCov_9fa48("447"), `${label}. Saved keyboard colors; accessories not shown.`)}>
      <svg viewBox={stryMutAct_9fa48("448") ? `` : (stryCov_9fa48("448"), `${stryMutAct_9fa48("449") ? -width / 2 + 1 : (stryCov_9fa48("449"), (stryMutAct_9fa48("450") ? -width * 2 : (stryCov_9fa48("450"), (stryMutAct_9fa48("451") ? +width : (stryCov_9fa48("451"), -width)) / 2)) - 1)} ${stryMutAct_9fa48("452") ? -height / 2 + 0.9 : (stryCov_9fa48("452"), (stryMutAct_9fa48("453") ? -height * 2 : (stryCov_9fa48("453"), (stryMutAct_9fa48("454") ? +height : (stryCov_9fa48("454"), -height)) / 2)) - 0.9)} ${stryMutAct_9fa48("455") ? width - 2 : (stryCov_9fa48("455"), width + 2)} ${stryMutAct_9fa48("456") ? height - 1.8 : (stryCov_9fa48("456"), height + 1.8)}`)} aria-hidden="true">
        <rect x={stryMutAct_9fa48("457") ? -width / 2 + 0.35 : (stryCov_9fa48("457"), (stryMutAct_9fa48("458") ? -width * 2 : (stryCov_9fa48("458"), (stryMutAct_9fa48("459") ? +width : (stryCov_9fa48("459"), -width)) / 2)) - 0.35)} y={stryMutAct_9fa48("460") ? -height / 2 + 0.2 : (stryCov_9fa48("460"), (stryMutAct_9fa48("461") ? -height * 2 : (stryCov_9fa48("461"), (stryMutAct_9fa48("462") ? +height : (stryCov_9fa48("462"), -height)) / 2)) - 0.2)} width={stryMutAct_9fa48("463") ? width - 0.7 : (stryCov_9fa48("463"), width + 0.7)} height={stryMutAct_9fa48("464") ? height - 0.7 : (stryCov_9fa48("464"), height + 0.7)} rx="0.35" fill="#000000" opacity="0.35" />
        <rect data-part="case" x={stryMutAct_9fa48("465") ? -width / 2 + 0.3 : (stryCov_9fa48("465"), (stryMutAct_9fa48("466") ? -width * 2 : (stryCov_9fa48("466"), (stryMutAct_9fa48("467") ? +width : (stryCov_9fa48("467"), -width)) / 2)) - 0.3)} y={stryMutAct_9fa48("468") ? -height / 2 + 0.3 : (stryCov_9fa48("468"), (stryMutAct_9fa48("469") ? -height * 2 : (stryCov_9fa48("469"), (stryMutAct_9fa48("470") ? +height : (stryCov_9fa48("470"), -height)) / 2)) - 0.3)} width={stryMutAct_9fa48("471") ? width - 0.6 : (stryCov_9fa48("471"), width + 0.6)} height={stryMutAct_9fa48("472") ? height - 0.6 : (stryCov_9fa48("472"), height + 0.6)} rx="0.3" fill={thumbnail.caseColor} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.04" />
        <rect x={stryMutAct_9fa48("473") ? -width / 2 + 0.06 : (stryCov_9fa48("473"), (stryMutAct_9fa48("474") ? -width * 2 : (stryCov_9fa48("474"), (stryMutAct_9fa48("475") ? +width : (stryCov_9fa48("475"), -width)) / 2)) - 0.06)} y={stryMutAct_9fa48("476") ? -height / 2 + 0.06 : (stryCov_9fa48("476"), (stryMutAct_9fa48("477") ? -height * 2 : (stryCov_9fa48("477"), (stryMutAct_9fa48("478") ? +height : (stryCov_9fa48("478"), -height)) / 2)) - 0.06)} width={stryMutAct_9fa48("479") ? width - 0.12 : (stryCov_9fa48("479"), width + 0.12)} height={stryMutAct_9fa48("480") ? height - 0.12 : (stryCov_9fa48("480"), height + 0.12)} rx="0.13" fill="#000000" opacity="0.28" />
        {keys.map(key => {
          if (stryMutAct_9fa48("481")) {
            {}
          } else {
            stryCov_9fa48("481");
            const role = (stryMutAct_9fa48("482") ? [] : (stryCov_9fa48("482"), [stryMutAct_9fa48("483") ? "" : (stryCov_9fa48("483"), 'Escape'), stryMutAct_9fa48("484") ? "" : (stryCov_9fa48("484"), 'EscapeFn'), stryMutAct_9fa48("485") ? "" : (stryCov_9fa48("485"), 'Enter')])).includes(key.code) ? stryMutAct_9fa48("486") ? "" : (stryCov_9fa48("486"), 'accent') : (stryMutAct_9fa48("489") ? key.code === 'Space' && key.code.startsWith('Arrow') : stryMutAct_9fa48("488") ? false : stryMutAct_9fa48("487") ? true : (stryCov_9fa48("487", "488", "489"), (stryMutAct_9fa48("491") ? key.code !== 'Space' : stryMutAct_9fa48("490") ? false : (stryCov_9fa48("490", "491"), key.code === (stryMutAct_9fa48("492") ? "" : (stryCov_9fa48("492"), 'Space')))) || (stryMutAct_9fa48("493") ? key.code.endsWith('Arrow') : (stryCov_9fa48("493"), key.code.startsWith(stryMutAct_9fa48("494") ? "" : (stryCov_9fa48("494"), 'Arrow')))))) ? stryMutAct_9fa48("495") ? "" : (stryCov_9fa48("495"), 'space') : (stryMutAct_9fa48("498") ? key.label.length !== 1 : stryMutAct_9fa48("497") ? false : stryMutAct_9fa48("496") ? true : (stryCov_9fa48("496", "497", "498"), key.label.length === 1)) ? stryMutAct_9fa48("499") ? "" : (stryCov_9fa48("499"), 'alpha') : stryMutAct_9fa48("500") ? "" : (stryCov_9fa48("500"), 'mod');
            return <g key={key.code} data-key={key.code} data-color-role={role}>
              <rect x={stryMutAct_9fa48("501") ? key.x - key.width / 2 - 0.04 : (stryCov_9fa48("501"), (stryMutAct_9fa48("502") ? key.x + key.width / 2 : (stryCov_9fa48("502"), key.x - (stryMutAct_9fa48("503") ? key.width * 2 : (stryCov_9fa48("503"), key.width / 2)))) + 0.04)} y={stryMutAct_9fa48("504") ? -key.y + 0.44 : (stryCov_9fa48("504"), (stryMutAct_9fa48("505") ? +key.y : (stryCov_9fa48("505"), -key.y)) - 0.44)} width={stryMutAct_9fa48("506") ? key.width + 0.08 : (stryCov_9fa48("506"), key.width - 0.08)} height="0.91" rx="0.11" fill={colors[role]} />
              <rect x={stryMutAct_9fa48("507") ? key.x - key.width / 2 - 0.11 : (stryCov_9fa48("507"), (stryMutAct_9fa48("508") ? key.x + key.width / 2 : (stryCov_9fa48("508"), key.x - (stryMutAct_9fa48("509") ? key.width * 2 : (stryCov_9fa48("509"), key.width / 2)))) + 0.11)} y={stryMutAct_9fa48("510") ? -key.y + 0.39 : (stryCov_9fa48("510"), (stryMutAct_9fa48("511") ? +key.y : (stryCov_9fa48("511"), -key.y)) - 0.39)} width={stryMutAct_9fa48("512") ? key.width + 0.22 : (stryCov_9fa48("512"), key.width - 0.22)} height="0.67" rx="0.09" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="0.035" />
              <path d={stryMutAct_9fa48("513") ? `` : (stryCov_9fa48("513"), `M${stryMutAct_9fa48("514") ? key.x - key.width / 2 - 0.13 : (stryCov_9fa48("514"), (stryMutAct_9fa48("515") ? key.x + key.width / 2 : (stryCov_9fa48("515"), key.x - (stryMutAct_9fa48("516") ? key.width * 2 : (stryCov_9fa48("516"), key.width / 2)))) + 0.13)},${stryMutAct_9fa48("517") ? -key.y - 0.36 : (stryCov_9fa48("517"), (stryMutAct_9fa48("518") ? +key.y : (stryCov_9fa48("518"), -key.y)) + 0.36)}h${stryMutAct_9fa48("519") ? key.width + 0.26 : (stryCov_9fa48("519"), key.width - 0.26)}`)} stroke="#000000" strokeOpacity="0.18" strokeWidth="0.055" strokeLinecap="round" />
            </g>;
          }
        })}
        {stryMutAct_9fa48("522") ? thumbnail.geometry === 'q1-max-ansi' || <g data-part="encoder">
            <circle cx={q1Layout.stockEncoder.x} cy={-q1Layout.stockEncoder.y} r="0.42" fill={q1StockEncoderColor} stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.04" />
            <circle cx={q1Layout.stockEncoder.x} cy={-q1Layout.stockEncoder.y} r="0.29" fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="0.025" />
          </g> : stryMutAct_9fa48("521") ? false : stryMutAct_9fa48("520") ? true : (stryCov_9fa48("520", "521", "522"), (stryMutAct_9fa48("524") ? thumbnail.geometry !== 'q1-max-ansi' : stryMutAct_9fa48("523") ? true : (stryCov_9fa48("523", "524"), thumbnail.geometry === (stryMutAct_9fa48("525") ? "" : (stryCov_9fa48("525"), 'q1-max-ansi')))) && <g data-part="encoder">
            <circle cx={q1Layout.stockEncoder.x} cy={stryMutAct_9fa48("526") ? +q1Layout.stockEncoder.y : (stryCov_9fa48("526"), -q1Layout.stockEncoder.y)} r="0.42" fill={q1StockEncoderColor} stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.04" />
            <circle cx={q1Layout.stockEncoder.x} cy={stryMutAct_9fa48("527") ? +q1Layout.stockEncoder.y : (stryCov_9fa48("527"), -q1Layout.stockEncoder.y)} r="0.29" fill="none" stroke="#000000" strokeOpacity="0.2" strokeWidth="0.025" />
          </g>)}
      </svg>
      <figcaption>{label}</figcaption>
    </figure>;
  }
}