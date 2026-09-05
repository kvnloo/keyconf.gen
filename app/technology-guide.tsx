import { ArrowUpRight } from 'lucide-react';

const technologies = [
  {
    name: 'Contact mechanical',
    text: 'A metal contact closes when the switch actuates. MX-style switches can be linear, tactile or clicky. Check 3/5-pin support and the exact socket.',
    example: 'Gateron G Pro 3.0',
    source: 'https://www.gateron.com/products/gateron-g-pro-30-switch-set',
  },
  {
    name: 'Hall effect',
    text: 'A sensor measures the magnetic field as a magnet moves. The board can use travel depth for adjustable actuation and rapid trigger. Magnet polarity and calibration are board-specific.',
    example: 'Wooting 80HE',
    source: 'https://wooting.io/wooting-80he',
  },
  {
    name: 'TMR magnetic',
    text: 'Another magnetic sensing method, using changes in electrical resistance. It does not make switches interchangeable. Some boards explicitly support both magnetic and contact switches.',
    example: 'Akko 5075 V5 TMR',
    source:
      'https://en.akkogear.com/product/5075-v5-tmr-magnetic-switch-keyboard/',
  },
  {
    name: 'Optical',
    text: 'Light sensing detects key movement. Some optical systems report analog travel. Optical switches need their own compatible sensor PCB.',
    example: 'Razer Analog Optical Gen-2',
    source:
      'https://www.razer.com/newsroom/product-news/razer-analog-optical-switches-gen-2',
  },
  {
    name: 'Topre / electrocapacitive',
    text: 'A rubber dome provides the feel; a spring and capacitive sensing detect the press. This is a different assembly and keycap ecosystem from ordinary MX hot-swap builds.',
    example: 'HHKB Professional',
    source: 'https://hhkeyboard.us/about/history',
  },
  {
    name: 'Low profile',
    text: 'Describes physical height, not one sensing technology. Mounts, travel and keycap spacing can differ between low-profile families, even when stems look similar.',
    example: 'Kailh Choc V2',
    source:
      'https://www.kailh.net/products/kailh-choc-v2-low-profile-switch-set',
  },
];
export default function TechnologyGuide() {
  return (
    <details className="technology-guide">
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
      {technologies.map((item) => (
        <section className="technology-item" key={item.name}>
          <h4>{item.name}</h4>
          <p>{item.text}</p>
          <a href={item.source} target="_blank" rel="noreferrer">
            {item.example} <ArrowUpRight size={13} />
          </a>
        </section>
      ))}
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
        <a
          href="https://www.rtings.com/keyboard/tests/latency"
          target="_blank"
          rel="noreferrer"
        >
          How latency is measured <ArrowUpRight size={13} />
        </a>
        <a
          href="https://wooting.io/wooting-80he"
          target="_blank"
          rel="noreferrer"
        >
          Manufacturer feature reference <ArrowUpRight size={13} />
        </a>
      </section>
    </details>
  );
}
