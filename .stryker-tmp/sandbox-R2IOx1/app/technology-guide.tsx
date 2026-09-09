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
import { ArrowUpRight } from 'lucide-react';
const technologies = stryMutAct_9fa48("4806") ? [] : (stryCov_9fa48("4806"), [stryMutAct_9fa48("4807") ? {} : (stryCov_9fa48("4807"), {
  name: stryMutAct_9fa48("4808") ? "" : (stryCov_9fa48("4808"), 'Contact mechanical'),
  text: stryMutAct_9fa48("4809") ? "" : (stryCov_9fa48("4809"), 'A metal contact closes when the switch actuates. MX-style switches can be linear, tactile or clicky. Check 3/5-pin support and the exact socket.'),
  example: stryMutAct_9fa48("4810") ? "" : (stryCov_9fa48("4810"), 'Gateron G Pro 3.0'),
  source: stryMutAct_9fa48("4811") ? "" : (stryCov_9fa48("4811"), 'https://www.gateron.com/products/gateron-g-pro-30-switch-set')
}), stryMutAct_9fa48("4812") ? {} : (stryCov_9fa48("4812"), {
  name: stryMutAct_9fa48("4813") ? "" : (stryCov_9fa48("4813"), 'Hall effect'),
  text: stryMutAct_9fa48("4814") ? "" : (stryCov_9fa48("4814"), 'A sensor measures the magnetic field as a magnet moves. The board can use travel depth for adjustable actuation and rapid trigger. Magnet polarity and calibration are board-specific.'),
  example: stryMutAct_9fa48("4815") ? "" : (stryCov_9fa48("4815"), 'Wooting 80HE'),
  source: stryMutAct_9fa48("4816") ? "" : (stryCov_9fa48("4816"), 'https://wooting.io/wooting-80he')
}), stryMutAct_9fa48("4817") ? {} : (stryCov_9fa48("4817"), {
  name: stryMutAct_9fa48("4818") ? "" : (stryCov_9fa48("4818"), 'TMR magnetic'),
  text: stryMutAct_9fa48("4819") ? "" : (stryCov_9fa48("4819"), 'Another magnetic sensing method, using changes in electrical resistance. It does not make switches interchangeable. Some boards explicitly support both magnetic and contact switches.'),
  example: stryMutAct_9fa48("4820") ? "" : (stryCov_9fa48("4820"), 'Akko 5075 V5 TMR'),
  source: stryMutAct_9fa48("4821") ? "" : (stryCov_9fa48("4821"), 'https://en.akkogear.com/product/5075-v5-tmr-magnetic-switch-keyboard/')
}), stryMutAct_9fa48("4822") ? {} : (stryCov_9fa48("4822"), {
  name: stryMutAct_9fa48("4823") ? "" : (stryCov_9fa48("4823"), 'Optical'),
  text: stryMutAct_9fa48("4824") ? "" : (stryCov_9fa48("4824"), 'Light sensing detects key movement. Some optical systems report analog travel. Optical switches need their own compatible sensor PCB.'),
  example: stryMutAct_9fa48("4825") ? "" : (stryCov_9fa48("4825"), 'Razer Analog Optical Gen-2'),
  source: stryMutAct_9fa48("4826") ? "" : (stryCov_9fa48("4826"), 'https://www.razer.com/newsroom/product-news/razer-analog-optical-switches-gen-2')
}), stryMutAct_9fa48("4827") ? {} : (stryCov_9fa48("4827"), {
  name: stryMutAct_9fa48("4828") ? "" : (stryCov_9fa48("4828"), 'Topre / electrocapacitive'),
  text: stryMutAct_9fa48("4829") ? "" : (stryCov_9fa48("4829"), 'A rubber dome provides the feel; a spring and capacitive sensing detect the press. This is a different assembly and keycap ecosystem from ordinary MX hot-swap builds.'),
  example: stryMutAct_9fa48("4830") ? "" : (stryCov_9fa48("4830"), 'HHKB Professional'),
  source: stryMutAct_9fa48("4831") ? "" : (stryCov_9fa48("4831"), 'https://hhkeyboard.us/about/history')
}), stryMutAct_9fa48("4832") ? {} : (stryCov_9fa48("4832"), {
  name: stryMutAct_9fa48("4833") ? "" : (stryCov_9fa48("4833"), 'Low profile'),
  text: stryMutAct_9fa48("4834") ? "" : (stryCov_9fa48("4834"), 'Describes physical height, not one sensing technology. Mounts, travel and keycap spacing can differ between low-profile families, even when stems look similar.'),
  example: stryMutAct_9fa48("4835") ? "" : (stryCov_9fa48("4835"), 'Kailh Choc V2'),
  source: stryMutAct_9fa48("4836") ? "" : (stryCov_9fa48("4836"), 'https://www.kailh.net/products/kailh-choc-v2-low-profile-switch-set')
})]);
export default function TechnologyGuide() {
  if (stryMutAct_9fa48("4837")) {
    {}
  } else {
    stryCov_9fa48("4837");
    return <details className="technology-guide">
      <summary>Switch types, feel & gaming speed</summary>
      <p className="muted">
        Start with how a key feels, then check how the board senses it.
      </p>
      <dl className="feel-guide">
        <div>
          <dt>Linear</dt>
          <dd>A smooth stroke without a deliberate bump.</dd>
        </div>
        <div>
          <dt>Tactile</dt>
          <dd>A bump you can feel during the stroke.</dd>
        </div>
        <div>
          <dt>Clicky</dt>
          <dd>
            A deliberate click mechanism. The whole build still shapes the
            sound.
          </dd>
        </div>
      </dl>
      {technologies.map(stryMutAct_9fa48("4838") ? () => undefined : (stryCov_9fa48("4838"), item => <section className="technology-item" key={item.name}>
          <h4>{item.name}</h4>
          <p>{item.text}</p>
          <a href={item.source} target="_blank" rel="noreferrer">
            {item.example} <ArrowUpRight size={13} />
          </a>
        </section>))}
      <section className="gaming-guide">
        <h4>What does 8 kHz actually buy?</h4>
        <div className="polling-comparison">
          <span>
            <strong>1,000 Hz</strong>1 ms report interval
          </span>
          <span>
            <strong>8,000 Hz</strong>0.125 ms report interval
          </span>
        </div>
        <p>
          These are USB report intervals, calculated as 1 ÷ polling rate. They
          are not total input latency. Scanning, debounce, firmware, connection
          mode, the game and display add their own timing.
        </p>
        <p>
          Rapid trigger changes when a key resets as it moves. Adjustable
          actuation changes the trigger depth. Neither is guaranteed by an 8 kHz
          label.
        </p>
        <p>
          Compare measured latency under the same test method and connection
          mode. A wired claim does not establish Bluetooth performance.
        </p>
        <a href="https://www.rtings.com/keyboard/tests/latency" target="_blank" rel="noreferrer">
          How latency is measured <ArrowUpRight size={13} />
        </a>
        <a href="https://wooting.io/wooting-80he" target="_blank" rel="noreferrer">
          Manufacturer feature reference <ArrowUpRight size={13} />
        </a>
      </section>
    </details>;
  }
}