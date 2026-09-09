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
export const controlDecks = stryMutAct_9fa48("9507") ? {} : (stryCov_9fa48("9507"), {
  'grok-bot': stryMutAct_9fa48("9508") ? {} : (stryCov_9fa48("9508"), {
    name: stryMutAct_9fa48("9509") ? "" : (stryCov_9fa48("9509"), 'Grok Bot / 01'),
    provenance: stryMutAct_9fa48("9510") ? "" : (stryCov_9fa48("9510"), 'Independent concept'),
    source: stryMutAct_9fa48("9511") ? "" : (stryCov_9fa48("9511"), 'https://x.com/omarsar0/status/2096321091148947887'),
    description: stryMutAct_9fa48("9512") ? "" : (stryCov_9fa48("9512"), 'A compact home for a hypothetical team of bots. Screen, dial, eleven keycaps and four colored role keys.'),
    colors: stryMutAct_9fa48("9513") ? {} : (stryCov_9fa48("9513"), {
      case: stryMutAct_9fa48("9514") ? "" : (stryCov_9fa48("9514"), '#495354'),
      keys: stryMutAct_9fa48("9515") ? "" : (stryCov_9fa48("9515"), '#4b575b'),
      commands: stryMutAct_9fa48("9516") ? "" : (stryCov_9fa48("9516"), '#30383b'),
      wide: stryMutAct_9fa48("9517") ? "" : (stryCov_9fa48("9517"), '#e8e9df')
    }),
    keys: stryMutAct_9fa48("9518") ? [] : (stryCov_9fa48("9518"), [stryMutAct_9fa48("9519") ? "" : (stryCov_9fa48("9519"), '1 · Chief'), stryMutAct_9fa48("9520") ? "" : (stryCov_9fa48("9520"), '2 · Research'), stryMutAct_9fa48("9521") ? "" : (stryCov_9fa48("9521"), '3 · Build'), stryMutAct_9fa48("9522") ? "" : (stryCov_9fa48("9522"), '4 · Comms'), stryMutAct_9fa48("9523") ? "" : (stryCov_9fa48("9523"), 'Q · Focus'), stryMutAct_9fa48("9524") ? "" : (stryCov_9fa48("9524"), 'W · Routine'), stryMutAct_9fa48("9525") ? "" : (stryCov_9fa48("9525"), 'E · Approve'), stryMutAct_9fa48("9526") ? "" : (stryCov_9fa48("9526"), 'R · Pause'), stryMutAct_9fa48("9527") ? "" : (stryCov_9fa48("9527"), 'A · Voice'), stryMutAct_9fa48("9528") ? "" : (stryCov_9fa48("9528"), 'Space · Delegate'), stryMutAct_9fa48("9529") ? "" : (stryCov_9fa48("9529"), 'F · Next task')])
  }),
  'codex-micro': stryMutAct_9fa48("9530") ? {} : (stryCov_9fa48("9530"), {
    name: stryMutAct_9fa48("9531") ? "" : (stryCov_9fa48("9531"), 'Codex Micro'),
    provenance: stryMutAct_9fa48("9532") ? "" : (stryCov_9fa48("9532"), 'OpenAI × Work Louder · product study'),
    source: stryMutAct_9fa48("9533") ? "" : (stryCov_9fa48("9533"), 'https://openai.com/supply/co-lab/work-louder/'),
    description: stryMutAct_9fa48("9534") ? "" : (stryCov_9fa48("9534"), 'A study of the compact Codex controller. Six translucent agent caps, command keys, a dial, joystick and touch sensor.'),
    colors: stryMutAct_9fa48("9535") ? {} : (stryCov_9fa48("9535"), {
      case: stryMutAct_9fa48("9536") ? "" : (stryCov_9fa48("9536"), '#e2e7e4'),
      keys: stryMutAct_9fa48("9537") ? "" : (stryCov_9fa48("9537"), '#c8d1cd'),
      commands: stryMutAct_9fa48("9538") ? "" : (stryCov_9fa48("9538"), '#e9efea'),
      wide: stryMutAct_9fa48("9539") ? "" : (stryCov_9fa48("9539"), '#edf1ea')
    }),
    keys: stryMutAct_9fa48("9540") ? [] : (stryCov_9fa48("9540"), [stryMutAct_9fa48("9541") ? "" : (stryCov_9fa48("9541"), '1–6 · Agent keys'), stryMutAct_9fa48("9542") ? "" : (stryCov_9fa48("9542"), 'Q · Fast'), stryMutAct_9fa48("9543") ? "" : (stryCov_9fa48("9543"), 'W · Accept'), stryMutAct_9fa48("9544") ? "" : (stryCov_9fa48("9544"), 'E · Decline'), stryMutAct_9fa48("9545") ? "" : (stryCov_9fa48("9545"), 'R · Fork'), stryMutAct_9fa48("9546") ? "" : (stryCov_9fa48("9546"), 'Space · Voice'), stryMutAct_9fa48("9547") ? "" : (stryCov_9fa48("9547"), 'Enter · Send')])
  })
});
export type DeckId = keyof typeof controlDecks;
export const deckLighting = ['Studio', 'Daylight', 'After hours'] as const;
export type DeckBuild = {
  version: 1;
  kind: 'control-deck';
  device: DeckId;
  name: string;
  colors: {
    case: string;
    keys: string;
    commands: string;
    wide: string;
  };
  lighting: typeof deckLighting[number];
  dial: number;
};
export function newDeck(device: DeckId): DeckBuild {
  if (stryMutAct_9fa48("9548")) {
    {}
  } else {
    stryCov_9fa48("9548");
    return stryMutAct_9fa48("9549") ? {} : (stryCov_9fa48("9549"), {
      version: 1,
      kind: stryMutAct_9fa48("9550") ? "" : (stryCov_9fa48("9550"), 'control-deck'),
      device,
      name: controlDecks[device].name,
      colors: stryMutAct_9fa48("9551") ? {} : (stryCov_9fa48("9551"), {
        ...controlDecks[device].colors
      }),
      lighting: stryMutAct_9fa48("9552") ? "" : (stryCov_9fa48("9552"), 'Studio'),
      dial: 0.5
    });
  }
}
function object(value: unknown): value is Record<string, unknown> {
  if (stryMutAct_9fa48("9553")) {
    {}
  } else {
    stryCov_9fa48("9553");
    return stryMutAct_9fa48("9556") ? typeof value === 'object' && value !== null || !Array.isArray(value) : stryMutAct_9fa48("9555") ? false : stryMutAct_9fa48("9554") ? true : (stryCov_9fa48("9554", "9555", "9556"), (stryMutAct_9fa48("9558") ? typeof value === 'object' || value !== null : stryMutAct_9fa48("9557") ? true : (stryCov_9fa48("9557", "9558"), (stryMutAct_9fa48("9560") ? typeof value !== 'object' : stryMutAct_9fa48("9559") ? true : (stryCov_9fa48("9559", "9560"), typeof value === (stryMutAct_9fa48("9561") ? "" : (stryCov_9fa48("9561"), 'object')))) && (stryMutAct_9fa48("9563") ? value === null : stryMutAct_9fa48("9562") ? true : (stryCov_9fa48("9562", "9563"), value !== null)))) && (stryMutAct_9fa48("9564") ? Array.isArray(value) : (stryCov_9fa48("9564"), !Array.isArray(value))));
  }
}
function color(value: unknown): value is string {
  if (stryMutAct_9fa48("9565")) {
    {}
  } else {
    stryCov_9fa48("9565");
    return stryMutAct_9fa48("9568") ? typeof value === 'string' || /^#[\da-f]{6}$/i.test(value) : stryMutAct_9fa48("9567") ? false : stryMutAct_9fa48("9566") ? true : (stryCov_9fa48("9566", "9567", "9568"), (stryMutAct_9fa48("9570") ? typeof value !== 'string' : stryMutAct_9fa48("9569") ? true : (stryCov_9fa48("9569", "9570"), typeof value === (stryMutAct_9fa48("9571") ? "" : (stryCov_9fa48("9571"), 'string')))) && (stryMutAct_9fa48("9576") ? /^#[\Da-f]{6}$/i : stryMutAct_9fa48("9575") ? /^#[^\da-f]{6}$/i : stryMutAct_9fa48("9574") ? /^#[\da-f]$/i : stryMutAct_9fa48("9573") ? /^#[\da-f]{6}/i : stryMutAct_9fa48("9572") ? /#[\da-f]{6}$/i : (stryCov_9fa48("9572", "9573", "9574", "9575", "9576"), /^#[\da-f]{6}$/i)).test(value));
  }
}
export function parseDeck(value: unknown): DeckBuild {
  if (stryMutAct_9fa48("9577")) {
    {}
  } else {
    stryCov_9fa48("9577");
    if (stryMutAct_9fa48("9580") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors) || !color(value.colors.case) || !color(value.colors.keys) || !color(value.colors.commands) || !color(value.colors.wide) || typeof value.dial !== 'number' || !Number.isFinite(value.dial) || value.dial < 0) && value.dial > 1 : stryMutAct_9fa48("9579") ? false : stryMutAct_9fa48("9578") ? true : (stryCov_9fa48("9578", "9579", "9580"), (stryMutAct_9fa48("9582") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors) || !color(value.colors.case) || !color(value.colors.keys) || !color(value.colors.commands) || !color(value.colors.wide) || typeof value.dial !== 'number' || !Number.isFinite(value.dial)) && value.dial < 0 : stryMutAct_9fa48("9581") ? false : (stryCov_9fa48("9581", "9582"), (stryMutAct_9fa48("9584") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors) || !color(value.colors.case) || !color(value.colors.keys) || !color(value.colors.commands) || !color(value.colors.wide) || typeof value.dial !== 'number') && !Number.isFinite(value.dial) : stryMutAct_9fa48("9583") ? false : (stryCov_9fa48("9583", "9584"), (stryMutAct_9fa48("9586") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors) || !color(value.colors.case) || !color(value.colors.keys) || !color(value.colors.commands) || !color(value.colors.wide)) && typeof value.dial !== 'number' : stryMutAct_9fa48("9585") ? false : (stryCov_9fa48("9585", "9586"), (stryMutAct_9fa48("9588") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors) || !color(value.colors.case) || !color(value.colors.keys) || !color(value.colors.commands)) && !color(value.colors.wide) : stryMutAct_9fa48("9587") ? false : (stryCov_9fa48("9587", "9588"), (stryMutAct_9fa48("9590") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors) || !color(value.colors.case) || !color(value.colors.keys)) && !color(value.colors.commands) : stryMutAct_9fa48("9589") ? false : (stryCov_9fa48("9589", "9590"), (stryMutAct_9fa48("9592") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors) || !color(value.colors.case)) && !color(value.colors.keys) : stryMutAct_9fa48("9591") ? false : (stryCov_9fa48("9591", "9592"), (stryMutAct_9fa48("9594") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80 || !object(value.colors)) && !color(value.colors.case) : stryMutAct_9fa48("9593") ? false : (stryCov_9fa48("9593", "9594"), (stryMutAct_9fa48("9596") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string' || value.name.length > 80) && !object(value.colors) : stryMutAct_9fa48("9595") ? false : (stryCov_9fa48("9595", "9596"), (stryMutAct_9fa48("9598") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro' || typeof value.name !== 'string') && value.name.length > 80 : stryMutAct_9fa48("9597") ? false : (stryCov_9fa48("9597", "9598"), (stryMutAct_9fa48("9600") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1 || value.device !== 'grok-bot' && value.device !== 'codex-micro') && typeof value.name !== 'string' : stryMutAct_9fa48("9599") ? false : (stryCov_9fa48("9599", "9600"), (stryMutAct_9fa48("9602") ? (!object(value) || value.kind !== 'control-deck' || value.version !== 1) && value.device !== 'grok-bot' && value.device !== 'codex-micro' : stryMutAct_9fa48("9601") ? false : (stryCov_9fa48("9601", "9602"), (stryMutAct_9fa48("9604") ? (!object(value) || value.kind !== 'control-deck') && value.version !== 1 : stryMutAct_9fa48("9603") ? false : (stryCov_9fa48("9603", "9604"), (stryMutAct_9fa48("9606") ? !object(value) && value.kind !== 'control-deck' : stryMutAct_9fa48("9605") ? false : (stryCov_9fa48("9605", "9606"), (stryMutAct_9fa48("9607") ? object(value) : (stryCov_9fa48("9607"), !object(value))) || (stryMutAct_9fa48("9609") ? value.kind === 'control-deck' : stryMutAct_9fa48("9608") ? false : (stryCov_9fa48("9608", "9609"), value.kind !== (stryMutAct_9fa48("9610") ? "" : (stryCov_9fa48("9610"), 'control-deck')))))) || (stryMutAct_9fa48("9612") ? value.version === 1 : stryMutAct_9fa48("9611") ? false : (stryCov_9fa48("9611", "9612"), value.version !== 1)))) || (stryMutAct_9fa48("9614") ? value.device !== 'grok-bot' || value.device !== 'codex-micro' : stryMutAct_9fa48("9613") ? false : (stryCov_9fa48("9613", "9614"), (stryMutAct_9fa48("9616") ? value.device === 'grok-bot' : stryMutAct_9fa48("9615") ? true : (stryCov_9fa48("9615", "9616"), value.device !== (stryMutAct_9fa48("9617") ? "" : (stryCov_9fa48("9617"), 'grok-bot')))) && (stryMutAct_9fa48("9619") ? value.device === 'codex-micro' : stryMutAct_9fa48("9618") ? true : (stryCov_9fa48("9618", "9619"), value.device !== (stryMutAct_9fa48("9620") ? "" : (stryCov_9fa48("9620"), 'codex-micro')))))))) || (stryMutAct_9fa48("9622") ? typeof value.name === 'string' : stryMutAct_9fa48("9621") ? false : (stryCov_9fa48("9621", "9622"), typeof value.name !== (stryMutAct_9fa48("9623") ? "" : (stryCov_9fa48("9623"), 'string')))))) || (stryMutAct_9fa48("9626") ? value.name.length <= 80 : stryMutAct_9fa48("9625") ? value.name.length >= 80 : stryMutAct_9fa48("9624") ? false : (stryCov_9fa48("9624", "9625", "9626"), value.name.length > 80)))) || (stryMutAct_9fa48("9627") ? object(value.colors) : (stryCov_9fa48("9627"), !object(value.colors))))) || (stryMutAct_9fa48("9628") ? color(value.colors.case) : (stryCov_9fa48("9628"), !color(value.colors.case))))) || (stryMutAct_9fa48("9629") ? color(value.colors.keys) : (stryCov_9fa48("9629"), !color(value.colors.keys))))) || (stryMutAct_9fa48("9630") ? color(value.colors.commands) : (stryCov_9fa48("9630"), !color(value.colors.commands))))) || (stryMutAct_9fa48("9631") ? color(value.colors.wide) : (stryCov_9fa48("9631"), !color(value.colors.wide))))) || (stryMutAct_9fa48("9633") ? typeof value.dial === 'number' : stryMutAct_9fa48("9632") ? false : (stryCov_9fa48("9632", "9633"), typeof value.dial !== (stryMutAct_9fa48("9634") ? "" : (stryCov_9fa48("9634"), 'number')))))) || (stryMutAct_9fa48("9635") ? Number.isFinite(value.dial) : (stryCov_9fa48("9635"), !Number.isFinite(value.dial))))) || (stryMutAct_9fa48("9638") ? value.dial >= 0 : stryMutAct_9fa48("9637") ? value.dial <= 0 : stryMutAct_9fa48("9636") ? false : (stryCov_9fa48("9636", "9637", "9638"), value.dial < 0)))) || (stryMutAct_9fa48("9641") ? value.dial <= 1 : stryMutAct_9fa48("9640") ? value.dial >= 1 : stryMutAct_9fa48("9639") ? false : (stryCov_9fa48("9639", "9640", "9641"), value.dial > 1)))) throw new Error(stryMutAct_9fa48("9643") ? "" : (stryCov_9fa48("9643"), 'This control deck could not be read. Open a complete studio link or choose a preset.'));
    const lighting = deckLighting.find(stryMutAct_9fa48("9644") ? () => undefined : (stryCov_9fa48("9644"), light => stryMutAct_9fa48("9647") ? light !== value.lighting : stryMutAct_9fa48("9646") ? false : stryMutAct_9fa48("9645") ? true : (stryCov_9fa48("9645", "9646", "9647"), light === value.lighting)));
    if (stryMutAct_9fa48("9650") ? false : stryMutAct_9fa48("9649") ? true : stryMutAct_9fa48("9648") ? lighting : (stryCov_9fa48("9648", "9649", "9650"), !lighting)) throw new Error(stryMutAct_9fa48("9652") ? "" : (stryCov_9fa48("9652"), 'This control deck has an unsupported lighting setting.'));
    return stryMutAct_9fa48("9653") ? {} : (stryCov_9fa48("9653"), {
      version: 1,
      kind: stryMutAct_9fa48("9654") ? "" : (stryCov_9fa48("9654"), 'control-deck'),
      device: value.device,
      name: stryMutAct_9fa48("9657") ? value.name.trim() && controlDecks[value.device].name : stryMutAct_9fa48("9656") ? false : stryMutAct_9fa48("9655") ? true : (stryCov_9fa48("9655", "9656", "9657"), (stryMutAct_9fa48("9658") ? value.name : (stryCov_9fa48("9658"), value.name.trim())) || controlDecks[value.device].name),
      colors: stryMutAct_9fa48("9659") ? {} : (stryCov_9fa48("9659"), {
        case: value.colors.case,
        keys: value.colors.keys,
        commands: value.colors.commands,
        wide: value.colors.wide
      }),
      lighting,
      dial: value.dial
    });
  }
}
export function encodeDeck(deck: DeckBuild) {
  if (stryMutAct_9fa48("9660")) {
    {}
  } else {
    stryCov_9fa48("9660");
    return btoa(Array.from(new TextEncoder().encode(JSON.stringify(deck)), stryMutAct_9fa48("9661") ? () => undefined : (stryCov_9fa48("9661"), byte => String.fromCharCode(byte))).join(stryMutAct_9fa48("9662") ? "Stryker was here!" : (stryCov_9fa48("9662"), ''))).replaceAll(stryMutAct_9fa48("9663") ? "" : (stryCov_9fa48("9663"), '+'), stryMutAct_9fa48("9664") ? "" : (stryCov_9fa48("9664"), '-')).replaceAll(stryMutAct_9fa48("9665") ? "" : (stryCov_9fa48("9665"), '/'), stryMutAct_9fa48("9666") ? "" : (stryCov_9fa48("9666"), '_')).replace(stryMutAct_9fa48("9668") ? /=$/ : stryMutAct_9fa48("9667") ? /=+/ : (stryCov_9fa48("9667", "9668"), /=+$/), stryMutAct_9fa48("9669") ? "Stryker was here!" : (stryCov_9fa48("9669"), ''));
  }
}
export function decodeDeck(encoded: string): DeckBuild {
  if (stryMutAct_9fa48("9670")) {
    {}
  } else {
    stryCov_9fa48("9670");
    if (stryMutAct_9fa48("9673") ? false : stryMutAct_9fa48("9672") ? true : stryMutAct_9fa48("9671") ? /^[\w-]{1,4000}$/.test(encoded) : (stryCov_9fa48("9671", "9672", "9673"), !(stryMutAct_9fa48("9678") ? /^[\W-]{1,4000}$/ : stryMutAct_9fa48("9677") ? /^[^\w-]{1,4000}$/ : stryMutAct_9fa48("9676") ? /^[\w-]$/ : stryMutAct_9fa48("9675") ? /^[\w-]{1,4000}/ : stryMutAct_9fa48("9674") ? /[\w-]{1,4000}$/ : (stryCov_9fa48("9674", "9675", "9676", "9677", "9678"), /^[\w-]{1,4000}$/)).test(encoded))) throw new Error(stryMutAct_9fa48("9680") ? "" : (stryCov_9fa48("9680"), 'This control deck link is incomplete.'));
    try {
      if (stryMutAct_9fa48("9681")) {
        {}
      } else {
        stryCov_9fa48("9681");
        const bytes = Uint8Array.from(atob(encoded.replaceAll(stryMutAct_9fa48("9682") ? "" : (stryCov_9fa48("9682"), '-'), stryMutAct_9fa48("9683") ? "" : (stryCov_9fa48("9683"), '+')).replaceAll(stryMutAct_9fa48("9684") ? "" : (stryCov_9fa48("9684"), '_'), stryMutAct_9fa48("9685") ? "" : (stryCov_9fa48("9685"), '/'))), stryMutAct_9fa48("9686") ? () => undefined : (stryCov_9fa48("9686"), c => c.charCodeAt(0)));
        return parseDeck(JSON.parse(new TextDecoder(stryMutAct_9fa48("9687") ? "" : (stryCov_9fa48("9687"), 'utf-8'), stryMutAct_9fa48("9688") ? {} : (stryCov_9fa48("9688"), {
          fatal: stryMutAct_9fa48("9689") ? false : (stryCov_9fa48("9689"), true)
        })).decode(bytes)));
      }
    } catch {
      if (stryMutAct_9fa48("9690")) {
        {}
      } else {
        stryCov_9fa48("9690");
        throw new Error(stryMutAct_9fa48("9692") ? "" : (stryCov_9fa48("9692"), 'This control deck link could not be read. Open another link or choose a preset.'));
      }
    }
  }
}