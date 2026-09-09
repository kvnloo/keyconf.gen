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
import { layouts, palettes, type Build } from './build.ts';
const paletteNames = palettes.map(stryMutAct_9fa48("14653") ? () => undefined : (stryCov_9fa48("14653"), palette => palette.name));
export type StudyInput = {
  layout: Build['layout'];
  palette: string;
};
export function parseStudy(input: unknown): StudyInput {
  if (stryMutAct_9fa48("14654")) {
    {}
  } else {
    stryCov_9fa48("14654");
    if (stryMutAct_9fa48("14657") ? (typeof input !== 'object' || input === null || !('layout' in input) || !('palette' in input)) && typeof input.palette !== 'string' : stryMutAct_9fa48("14656") ? false : stryMutAct_9fa48("14655") ? true : (stryCov_9fa48("14655", "14656", "14657"), (stryMutAct_9fa48("14659") ? (typeof input !== 'object' || input === null || !('layout' in input)) && !('palette' in input) : stryMutAct_9fa48("14658") ? false : (stryCov_9fa48("14658", "14659"), (stryMutAct_9fa48("14661") ? (typeof input !== 'object' || input === null) && !('layout' in input) : stryMutAct_9fa48("14660") ? false : (stryCov_9fa48("14660", "14661"), (stryMutAct_9fa48("14663") ? typeof input !== 'object' && input === null : stryMutAct_9fa48("14662") ? false : (stryCov_9fa48("14662", "14663"), (stryMutAct_9fa48("14665") ? typeof input === 'object' : stryMutAct_9fa48("14664") ? false : (stryCov_9fa48("14664", "14665"), typeof input !== (stryMutAct_9fa48("14666") ? "" : (stryCov_9fa48("14666"), 'object')))) || (stryMutAct_9fa48("14668") ? input !== null : stryMutAct_9fa48("14667") ? false : (stryCov_9fa48("14667", "14668"), input === null)))) || (stryMutAct_9fa48("14669") ? 'layout' in input : (stryCov_9fa48("14669"), !((stryMutAct_9fa48("14670") ? "" : (stryCov_9fa48("14670"), 'layout')) in input))))) || (stryMutAct_9fa48("14671") ? 'palette' in input : (stryCov_9fa48("14671"), !((stryMutAct_9fa48("14672") ? "" : (stryCov_9fa48("14672"), 'palette')) in input))))) || (stryMutAct_9fa48("14674") ? typeof input.palette === 'string' : stryMutAct_9fa48("14673") ? false : (stryCov_9fa48("14673", "14674"), typeof input.palette !== (stryMutAct_9fa48("14675") ? "" : (stryCov_9fa48("14675"), 'string')))))) throw new Error(stryMutAct_9fa48("14677") ? "" : (stryCov_9fa48("14677"), 'Choose a supported layout and named palette.'));
    const layout = layouts.find(stryMutAct_9fa48("14678") ? () => undefined : (stryCov_9fa48("14678"), layout => stryMutAct_9fa48("14681") ? layout !== input.layout : stryMutAct_9fa48("14680") ? false : stryMutAct_9fa48("14679") ? true : (stryCov_9fa48("14679", "14680", "14681"), layout === input.layout)));
    if (stryMutAct_9fa48("14684") ? false : stryMutAct_9fa48("14683") ? true : stryMutAct_9fa48("14682") ? layout : (stryCov_9fa48("14682", "14683", "14684"), !layout)) throw new Error(stryMutAct_9fa48("14686") ? "" : (stryCov_9fa48("14686"), 'Unsupported layout.'));
    if (stryMutAct_9fa48("14689") ? false : stryMutAct_9fa48("14688") ? true : stryMutAct_9fa48("14687") ? paletteNames.includes(input.palette) : (stryCov_9fa48("14687", "14688", "14689"), !paletteNames.includes(input.palette))) throw new Error(stryMutAct_9fa48("14691") ? "" : (stryCov_9fa48("14691"), 'Unsupported palette.'));
    return stryMutAct_9fa48("14692") ? {} : (stryCov_9fa48("14692"), {
      layout,
      palette: input.palette
    });
  }
}
type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: {
    readOnlyHint: boolean;
  };
  execute: (input: unknown) => unknown;
};
declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: Tool, options: {
        signal: AbortSignal;
      }) => void | Promise<void>;
    };
  }
}
export function registerStudioTools(read: () => unknown, configure: (input: StudyInput) => void) {
  if (stryMutAct_9fa48("14693")) {
    {}
  } else {
    stryCov_9fa48("14693");
    const context = document.modelContext;
    if (stryMutAct_9fa48("14696") ? false : stryMutAct_9fa48("14695") ? true : stryMutAct_9fa48("14694") ? context : (stryCov_9fa48("14694", "14695", "14696"), !context)) return;
    const controller = new AbortController();
    const tools: Tool[] = stryMutAct_9fa48("14697") ? [] : (stryCov_9fa48("14697"), [stryMutAct_9fa48("14698") ? {} : (stryCov_9fa48("14698"), {
      name: stryMutAct_9fa48("14699") ? "" : (stryCov_9fa48("14699"), 'read_keyboard_build'),
      description: stryMutAct_9fa48("14700") ? "" : (stryCov_9fa48("14700"), 'Read the current keyboard study, selected components, and compatibility results.'),
      inputSchema: stryMutAct_9fa48("14701") ? {} : (stryCov_9fa48("14701"), {
        type: stryMutAct_9fa48("14702") ? "" : (stryCov_9fa48("14702"), 'object'),
        properties: {},
        additionalProperties: stryMutAct_9fa48("14703") ? true : (stryCov_9fa48("14703"), false)
      }),
      annotations: stryMutAct_9fa48("14704") ? {} : (stryCov_9fa48("14704"), {
        readOnlyHint: stryMutAct_9fa48("14705") ? false : (stryCov_9fa48("14705"), true)
      }),
      execute: stryMutAct_9fa48("14706") ? () => undefined : (stryCov_9fa48("14706"), () => read())
    }), stryMutAct_9fa48("14707") ? {} : (stryCov_9fa48("14707"), {
      name: stryMutAct_9fa48("14708") ? "" : (stryCov_9fa48("14708"), 'configure_keyboard_study'),
      description: stryMutAct_9fa48("14709") ? "" : (stryCov_9fa48("14709"), 'Set the visible keyboard layout and color palette. Changes the illustrative study, not selected retail parts.'),
      inputSchema: stryMutAct_9fa48("14710") ? {} : (stryCov_9fa48("14710"), {
        type: stryMutAct_9fa48("14711") ? "" : (stryCov_9fa48("14711"), 'object'),
        properties: stryMutAct_9fa48("14712") ? {} : (stryCov_9fa48("14712"), {
          layout: stryMutAct_9fa48("14713") ? {} : (stryCov_9fa48("14713"), {
            type: stryMutAct_9fa48("14714") ? "" : (stryCov_9fa48("14714"), 'string'),
            enum: layouts
          }),
          palette: stryMutAct_9fa48("14715") ? {} : (stryCov_9fa48("14715"), {
            type: stryMutAct_9fa48("14716") ? "" : (stryCov_9fa48("14716"), 'string'),
            enum: paletteNames
          })
        }),
        required: stryMutAct_9fa48("14717") ? [] : (stryCov_9fa48("14717"), [stryMutAct_9fa48("14718") ? "" : (stryCov_9fa48("14718"), 'layout'), stryMutAct_9fa48("14719") ? "" : (stryCov_9fa48("14719"), 'palette')]),
        additionalProperties: stryMutAct_9fa48("14720") ? true : (stryCov_9fa48("14720"), false)
      }),
      annotations: stryMutAct_9fa48("14721") ? {} : (stryCov_9fa48("14721"), {
        readOnlyHint: stryMutAct_9fa48("14722") ? true : (stryCov_9fa48("14722"), false)
      }),
      execute: async input => {
        if (stryMutAct_9fa48("14723")) {
          {}
        } else {
          stryCov_9fa48("14723");
          const parsed = parseStudy(input);
          if (stryMutAct_9fa48("14724")) {
            ;
          } else {
            stryCov_9fa48("14724");
            configure(parsed);
          }
          await new Promise(stryMutAct_9fa48("14725") ? () => undefined : (stryCov_9fa48("14725"), resolve => requestAnimationFrame(stryMutAct_9fa48("14726") ? () => undefined : (stryCov_9fa48("14726"), () => requestAnimationFrame(resolve)))));
          return read();
        }
      }
    })]);
    for (const tool of tools) {
      if (stryMutAct_9fa48("14727")) {
        {}
      } else {
        stryCov_9fa48("14727");
        try {
          if (stryMutAct_9fa48("14728")) {
            {}
          } else {
            stryCov_9fa48("14728");
            void Promise.resolve(context.registerTool(tool, stryMutAct_9fa48("14729") ? {} : (stryCov_9fa48("14729"), {
              signal: controller.signal
            }))).catch(() => {});
          }
        } catch {}
      }
    }
    return stryMutAct_9fa48("14730") ? () => undefined : (stryCov_9fa48("14730"), () => controller.abort());
  }
}