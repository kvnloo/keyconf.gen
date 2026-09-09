/* oxlint-disable next/no-img-element -- Pre-sized local Blender renders also ship unchanged to the static Pages export. */
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
import { ArrowRight, Check, ChevronLeft, ChevronRight, Box, Cpu, Layers, Keyboard, Grip, SquareDashed } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { featuredBuilds, type FeaturedBuild } from '../lib/featured-builds';
import { catalog, categories } from '../lib/catalog';
import { controlDecks } from '../lib/control-deck';
export function FeaturedGallery({
  selected,
  onSelect
}: {
  selected: string;
  onSelect: (preset: FeaturedBuild) => void;
}) {
  if (stryMutAct_9fa48("1286")) {
    {}
  } else {
    stryCov_9fa48("1286");
    const strip = useRef<HTMLDivElement>(null);
    const stripId = useId();
    const [edges, setEdges] = useState(stryMutAct_9fa48("1287") ? {} : (stryCov_9fa48("1287"), {
      previous: stryMutAct_9fa48("1288") ? true : (stryCov_9fa48("1288"), false),
      next: stryMutAct_9fa48("1289") ? true : (stryCov_9fa48("1289"), false)
    }));
    useEffect(() => {
      if (stryMutAct_9fa48("1291")) {
        {}
      } else {
        stryCov_9fa48("1291");
        const element = strip.current;
        if (stryMutAct_9fa48("1294") ? false : stryMutAct_9fa48("1293") ? true : stryMutAct_9fa48("1292") ? element : (stryCov_9fa48("1292", "1293", "1294"), !element)) return;
        const measure = stryMutAct_9fa48("1295") ? () => undefined : (stryCov_9fa48("1295"), (() => {
          const measure = () => setEdges(stryMutAct_9fa48("1296") ? {} : (stryCov_9fa48("1296"), {
            previous: stryMutAct_9fa48("1300") ? element.scrollLeft <= 1 : stryMutAct_9fa48("1299") ? element.scrollLeft >= 1 : stryMutAct_9fa48("1298") ? false : stryMutAct_9fa48("1297") ? true : (stryCov_9fa48("1297", "1298", "1299", "1300"), element.scrollLeft > 1),
            next: stryMutAct_9fa48("1304") ? element.scrollLeft + element.clientWidth >= element.scrollWidth - 1 : stryMutAct_9fa48("1303") ? element.scrollLeft + element.clientWidth <= element.scrollWidth - 1 : stryMutAct_9fa48("1302") ? false : stryMutAct_9fa48("1301") ? true : (stryCov_9fa48("1301", "1302", "1303", "1304"), (stryMutAct_9fa48("1305") ? element.scrollLeft - element.clientWidth : (stryCov_9fa48("1305"), element.scrollLeft + element.clientWidth)) < (stryMutAct_9fa48("1306") ? element.scrollWidth + 1 : (stryCov_9fa48("1306"), element.scrollWidth - 1)))
          }));
          return measure;
        })());
        if (stryMutAct_9fa48("1307")) {
          ;
        } else {
          stryCov_9fa48("1307");
          measure();
        }
        const observer = new ResizeObserver(measure);
        if (stryMutAct_9fa48("1308")) {
          ;
        } else {
          stryCov_9fa48("1308");
          observer.observe(element);
        }
        element.addEventListener(stryMutAct_9fa48("1310") ? "" : (stryCov_9fa48("1310"), 'scroll'), measure, stryMutAct_9fa48("1311") ? {} : (stryCov_9fa48("1311"), {
          passive: stryMutAct_9fa48("1312") ? false : (stryCov_9fa48("1312"), true)
        }));
        return () => {
          if (stryMutAct_9fa48("1313")) {
            {}
          } else {
            stryCov_9fa48("1313");
            if (stryMutAct_9fa48("1314")) {
              ;
            } else {
              stryCov_9fa48("1314");
              observer.disconnect();
            }
            element.removeEventListener(stryMutAct_9fa48("1316") ? "" : (stryCov_9fa48("1316"), 'scroll'), measure);
          }
        };
      }
    }, stryMutAct_9fa48("1317") ? ["Stryker was here"] : (stryCov_9fa48("1317"), []));
    function browse(direction: -1 | 1) {
      if (stryMutAct_9fa48("1318")) {
        {}
      } else {
        stryCov_9fa48("1318");
        const element = strip.current;
        if (stryMutAct_9fa48("1321") ? false : stryMutAct_9fa48("1320") ? true : stryMutAct_9fa48("1319") ? element : (stryCov_9fa48("1319", "1320", "1321"), !element)) return;
        element.scrollBy(stryMutAct_9fa48("1323") ? {} : (stryCov_9fa48("1323"), {
          left: stryMutAct_9fa48("1324") ? direction / element.clientWidth : (stryCov_9fa48("1324"), direction * element.clientWidth),
          behavior: window.matchMedia(stryMutAct_9fa48("1325") ? "" : (stryCov_9fa48("1325"), '(prefers-reduced-motion: reduce)')).matches ? stryMutAct_9fa48("1326") ? "" : (stryCov_9fa48("1326"), 'instant') : stryMutAct_9fa48("1327") ? "" : (stryCov_9fa48("1327"), 'smooth')
        }));
      }
    }
    return <section className="featured-gallery" aria-label="Featured builds">
      <div className="gallery-title">
        <span>Choose a starting build</span>
        <div className="gallery-controls">
          <button type="button" aria-label="Previous builds" aria-controls={stripId} disabled={stryMutAct_9fa48("1328") ? edges.previous : (stryCov_9fa48("1328"), !edges.previous)} onClick={stryMutAct_9fa48("1329") ? () => undefined : (stryCov_9fa48("1329"), () => browse(stryMutAct_9fa48("1330") ? +1 : (stryCov_9fa48("1330"), -1)))}>
            <ChevronLeft size={17} />
          </button>
          <button type="button" aria-label="More builds" aria-controls={stripId} disabled={stryMutAct_9fa48("1331") ? edges.next : (stryCov_9fa48("1331"), !edges.next)} onClick={stryMutAct_9fa48("1332") ? () => undefined : (stryCov_9fa48("1332"), () => browse(1))}>
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
      <div className="featured-cards" id={stripId} ref={strip}>
        {featuredBuilds.map(stryMutAct_9fa48("1333") ? () => undefined : (stryCov_9fa48("1333"), (preset, index) => <button className="featured-card" key={preset.id} aria-pressed={stryMutAct_9fa48("1336") ? selected !== preset.id : stryMutAct_9fa48("1335") ? false : stryMutAct_9fa48("1334") ? true : (stryCov_9fa48("1334", "1335", "1336"), selected === preset.id)} aria-label={stryMutAct_9fa48("1337") ? `` : (stryCov_9fa48("1337"), `Preview ${preset.name}`)} onClick={stryMutAct_9fa48("1338") ? () => undefined : (stryCov_9fa48("1338"), () => onSelect(preset))}>
            <img src={stryMutAct_9fa48("1339") ? `` : (stryCov_9fa48("1339"), `models/${preset.id}.png`)} alt="" width="640" height="380" loading="lazy" />
            <span className="featured-card-line">
              <span className="featured-number">
                {String(stryMutAct_9fa48("1340") ? index - 1 : (stryCov_9fa48("1340"), index + 1)).padStart(2, stryMutAct_9fa48("1341") ? "" : (stryCov_9fa48("1341"), '0'))}
              </span>
              <span className="featured-card-state">
                {stryMutAct_9fa48("1344") ? selected === preset.id || <Check size={12} /> : stryMutAct_9fa48("1343") ? false : stryMutAct_9fa48("1342") ? true : (stryCov_9fa48("1342", "1343", "1344"), (stryMutAct_9fa48("1346") ? selected !== preset.id : stryMutAct_9fa48("1345") ? true : (stryCov_9fa48("1345", "1346"), selected === preset.id)) && <Check size={12} />)}
                {(stryMutAct_9fa48("1349") ? selected !== preset.id : stryMutAct_9fa48("1348") ? false : stryMutAct_9fa48("1347") ? true : (stryCov_9fa48("1347", "1348", "1349"), selected === preset.id)) ? stryMutAct_9fa48("1350") ? "" : (stryCov_9fa48("1350"), 'Selected') : stryMutAct_9fa48("1351") ? "" : (stryCov_9fa48("1351"), 'Preview')}
              </span>
            </span>
            <strong>{preset.name}</strong>
            <small>{preset.subtitle}</small>
          </button>))}
      </div>
    </section>;
  }
}
const categoryNames = stryMutAct_9fa48("1352") ? {} : (stryCov_9fa48("1352"), {
  case: stryMutAct_9fa48("1353") ? "" : (stryCov_9fa48("1353"), 'Case'),
  pcb: stryMutAct_9fa48("1354") ? "" : (stryCov_9fa48("1354"), 'PCB'),
  plate: stryMutAct_9fa48("1355") ? "" : (stryCov_9fa48("1355"), 'Plate'),
  switch: stryMutAct_9fa48("1356") ? "" : (stryCov_9fa48("1356"), 'Switches'),
  keycaps: stryMutAct_9fa48("1357") ? "" : (stryCov_9fa48("1357"), 'Keycaps'),
  stabilizers: stryMutAct_9fa48("1358") ? "" : (stryCov_9fa48("1358"), 'Stabilizers')
});
const icons = stryMutAct_9fa48("1359") ? {} : (stryCov_9fa48("1359"), {
  case: Box,
  pcb: Cpu,
  plate: Layers,
  switch: SquareDashed,
  keycaps: Keyboard,
  stabilizers: Grip
});
export function FeaturedInspector({
  featured,
  onCustomize
}: {
  featured: FeaturedBuild;
  onCustomize: () => void;
}) {
  if (stryMutAct_9fa48("1360")) {
    {}
  } else {
    stryCov_9fa48("1360");
    const colors = (stryMutAct_9fa48("1363") ? featured.kind !== 'keyboard' : stryMutAct_9fa48("1362") ? false : stryMutAct_9fa48("1361") ? true : (stryCov_9fa48("1361", "1362", "1363"), featured.kind === (stryMutAct_9fa48("1364") ? "" : (stryCov_9fa48("1364"), 'keyboard')))) ? stryMutAct_9fa48("1365") ? [] : (stryCov_9fa48("1365"), [featured.build.palette.alpha, featured.build.palette.mod, featured.build.palette.accent, featured.build.palette.space]) : Object.values(featured.build.colors);
    return <aside className="featured-inspector" aria-label="Featured build preview">
      <div className="preview-eyebrow">A starting point</div>
      <h2>{featured.name}</h2>
      <p className="featured-subtitle">{featured.subtitle}</p>
      <div className="featured-color-strip" aria-label="Preview colors">
        {colors.map(stryMutAct_9fa48("1366") ? () => undefined : (stryCov_9fa48("1366"), (color, index) => <span key={index} style={stryMutAct_9fa48("1367") ? {} : (stryCov_9fa48("1367"), {
          background: color
        })} />))}
      </div>
      {(stryMutAct_9fa48("1370") ? featured.kind !== 'keyboard' : stryMutAct_9fa48("1369") ? false : stryMutAct_9fa48("1368") ? true : (stryCov_9fa48("1368", "1369", "1370"), featured.kind === (stryMutAct_9fa48("1371") ? "" : (stryCov_9fa48("1371"), 'keyboard')))) ? <>
          <div className="preview-parts">
            {categories.map(category => {
            if (stryMutAct_9fa48("1372")) {
              {}
            } else {
              stryCov_9fa48("1372");
              const part = catalog.find(stryMutAct_9fa48("1373") ? () => undefined : (stryCov_9fa48("1373"), part => stryMutAct_9fa48("1376") ? part.id !== featured.build.selection[category] : stryMutAct_9fa48("1375") ? false : stryMutAct_9fa48("1374") ? true : (stryCov_9fa48("1374", "1375", "1376"), part.id === featured.build.selection[category])));
              const Icon = icons[category];
              return <div className="preview-part" key={category}>
                  <span className="part-icon">
                    <Icon size={24} strokeWidth={1} />
                  </span>
                  <div>
                    <span>{categoryNames[category]}</span>
                    <small>{stryMutAct_9fa48("1377") ? part?.name && 'Not selected' : (stryCov_9fa48("1377"), (stryMutAct_9fa48("1378") ? part.name : (stryCov_9fa48("1378"), part?.name)) ?? (stryMutAct_9fa48("1379") ? "" : (stryCov_9fa48("1379"), 'Not selected')))}</small>
                    {stryMutAct_9fa48("1382") ? category === 'keycaps' || <small className="preview-color-note">
                        Preview colors are independent.
                      </small> : stryMutAct_9fa48("1381") ? false : stryMutAct_9fa48("1380") ? true : (stryCov_9fa48("1380", "1381", "1382"), (stryMutAct_9fa48("1384") ? category !== 'keycaps' : stryMutAct_9fa48("1383") ? true : (stryCov_9fa48("1383", "1384"), category === (stryMutAct_9fa48("1385") ? "" : (stryCov_9fa48("1385"), 'keycaps')))) && <small className="preview-color-note">
                        Preview colors are independent.
                      </small>)}
                  </div>
                </div>;
            }
          })}
          </div>
          <p className="preview-note">
            Original 3D study. Review part fit in the workshop.
          </p>
        </> : <div className="preview-deck-note">
          <p>{controlDecks[featured.build.device].description}</p>
          <p>{controlDecks[featured.build.device].provenance}</p>
          <p>
            Explore its keys, dial, lighting and layers. Local previews, with no
            agent connection or verified device recording.
          </p>
        </div>}
      <button className="button full" onClick={onCustomize}>
        Customize {featured.name} <ArrowRight size={17} />
      </button>
      <span className="preview-safe">
        Browsing keeps your current build intact.
      </span>
    </aside>;
  }
}