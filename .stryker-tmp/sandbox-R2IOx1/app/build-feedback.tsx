// @ts-nocheck
'use client';

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
import { useRef, useState } from 'react';
import { Copy } from 'lucide-react';
import type { Build } from '../lib/build';
import { previewLink } from '../lib/shared-preview';
export default function BuildFeedback({
  build,
  linkMode = stryMutAct_9fa48("349") ? "" : (stryCov_9fa48("349"), 'preview')
}: {
  build: Build;
  linkMode?: 'preview' | 'publication' | 'root-preview' | 'file';
}) {
  if (stryMutAct_9fa48("350")) {
    {}
  } else {
    stryCov_9fa48("350");
    const [note, setNote] = useState(stryMutAct_9fa48("351") ? "Stryker was here!" : (stryCov_9fa48("351"), ''));
    const [result, setResult] = useState<{
      key: string;
      receipt: string;
      manualCopy: string;
    } | null>(null);
    const request = useRef(0);
    const key = JSON.stringify(stryMutAct_9fa48("352") ? [] : (stryCov_9fa48("352"), [build, note, linkMode]));
    const receipt = (stryMutAct_9fa48("355") ? result?.key !== key : stryMutAct_9fa48("354") ? false : stryMutAct_9fa48("353") ? true : (stryCov_9fa48("353", "354", "355"), (stryMutAct_9fa48("356") ? result.key : (stryCov_9fa48("356"), result?.key)) === key)) ? result.receipt : stryMutAct_9fa48("357") ? "Stryker was here!" : (stryCov_9fa48("357"), '');
    const manualCopy = (stryMutAct_9fa48("360") ? result?.key !== key : stryMutAct_9fa48("359") ? false : stryMutAct_9fa48("358") ? true : (stryCov_9fa48("358", "359", "360"), (stryMutAct_9fa48("361") ? result.key : (stryCov_9fa48("361"), result?.key)) === key)) ? result.manualCopy : stryMutAct_9fa48("362") ? "Stryker was here!" : (stryCov_9fa48("362"), '');
    const fallback = useRef<HTMLTextAreaElement | null>(null);
    async function copy() {
      if (stryMutAct_9fa48("363")) {
        {}
      } else {
        stryCov_9fa48("363");
        const attempt = stryMutAct_9fa48("364") ? --request.current : (stryCov_9fa48("364"), ++request.current);
        if (stryMutAct_9fa48("365")) {
          ;
        } else {
          stryCov_9fa48("365");
          setResult(null);
        }
        function finish(receipt: string, manualCopy = stryMutAct_9fa48("366") ? "Stryker was here!" : (stryCov_9fa48("366"), '')) {
          if (stryMutAct_9fa48("367")) {
            {}
          } else {
            stryCov_9fa48("367");
            if (stryMutAct_9fa48("370") ? request.current !== attempt : stryMutAct_9fa48("369") ? false : stryMutAct_9fa48("368") ? true : (stryCov_9fa48("368", "369", "370"), request.current === attempt)) setResult(stryMutAct_9fa48("372") ? {} : (stryCov_9fa48("372"), {
              key,
              receipt,
              manualCopy
            }));
          }
        }
        let link: string;
        try {
          if (stryMutAct_9fa48("373")) {
            {}
          } else {
            stryCov_9fa48("373");
            link = (stryMutAct_9fa48("376") ? linkMode !== 'file' : stryMutAct_9fa48("375") ? false : stryMutAct_9fa48("374") ? true : (stryCov_9fa48("374", "375", "376"), linkMode === (stryMutAct_9fa48("377") ? "" : (stryCov_9fa48("377"), 'file')))) ? stryMutAct_9fa48("378") ? "Stryker was here!" : (stryCov_9fa48("378"), '') : (stryMutAct_9fa48("381") ? linkMode !== 'publication' : stryMutAct_9fa48("380") ? false : stryMutAct_9fa48("379") ? true : (stryCov_9fa48("379", "380", "381"), linkMode === (stryMutAct_9fa48("382") ? "" : (stryCov_9fa48("382"), 'publication')))) ? window.location.href : previewLink(build, (stryMutAct_9fa48("385") ? linkMode !== 'root-preview' : stryMutAct_9fa48("384") ? false : stryMutAct_9fa48("383") ? true : (stryCov_9fa48("383", "384", "385"), linkMode === (stryMutAct_9fa48("386") ? "" : (stryCov_9fa48("386"), 'root-preview')))) ? new URL(stryMutAct_9fa48("387") ? "" : (stryCov_9fa48("387"), '/'), window.location.href).href : window.location.href);
          }
        } catch {
          if (stryMutAct_9fa48("388")) {
            {}
          } else {
            stryCov_9fa48("388");
            finish(stryMutAct_9fa48("390") ? "" : (stryCov_9fa48("390"), 'This build is too large for a link. Download your variation and share the file with your notes.'), stryMutAct_9fa48("391") ? note : (stryCov_9fa48("391"), note.trim()));
            return;
          }
        }
        const message = stryMutAct_9fa48("392") ? `` : (stryCov_9fa48("392"), `Feedback on ${build.name}\n\n${stryMutAct_9fa48("393") ? note : (stryCov_9fa48("393"), note.trim())}\n\n${(stryMutAct_9fa48("396") ? linkMode !== 'file' : stryMutAct_9fa48("395") ? false : stryMutAct_9fa48("394") ? true : (stryCov_9fa48("394", "395", "396"), linkMode === (stryMutAct_9fa48("397") ? "" : (stryCov_9fa48("397"), 'file')))) ? stryMutAct_9fa48("398") ? "" : (stryCov_9fa48("398"), 'Attach the downloaded build file to this message.') : stryMutAct_9fa48("399") ? `` : (stryCov_9fa48("399"), `Build preview: ${link}`)}`);
        try {
          if (stryMutAct_9fa48("400")) {
            {}
          } else {
            stryCov_9fa48("400");
            await navigator.clipboard.writeText(message);
            finish(stryMutAct_9fa48("402") ? "" : (stryCov_9fa48("402"), 'Copied. Paste it into your conversation with the builder.'));
          }
        } catch {
          if (stryMutAct_9fa48("403")) {
            {}
          } else {
            stryCov_9fa48("403");
            finish(stryMutAct_9fa48("405") ? "" : (stryCov_9fa48("405"), 'Select and copy the message below with your browser menu.'), message);
          }
        }
      }
    }
    return <details className="preview-feedback">
      <summary>Feedback for the builder</summary>
      <p>
        What would you keep or change?{stryMutAct_9fa48("406") ? "" : (stryCov_9fa48("406"), ' ')}
        {(stryMutAct_9fa48("409") ? linkMode !== 'file' : stryMutAct_9fa48("408") ? false : stryMutAct_9fa48("407") ? true : (stryCov_9fa48("407", "408", "409"), linkMode === (stryMutAct_9fa48("410") ? "" : (stryCov_9fa48("410"), 'file')))) ? stryMutAct_9fa48("411") ? "" : (stryCov_9fa48("411"), 'Copy your notes and attach the downloaded build file in your conversation.') : stryMutAct_9fa48("412") ? "" : (stryCov_9fa48("412"), 'Copy your notes with this build link and share them in your conversation.')}
      </p>
      <label htmlFor="build-feedback-note">Your notes</label>
      <textarea id="build-feedback-note" rows={4} maxLength={2000} value={note} placeholder="I love the green accents. Could we try a quieter switch?" onChange={event => {
        if (stryMutAct_9fa48("413")) {
          {}
        } else {
          stryCov_9fa48("413");
          if (stryMutAct_9fa48("414")) {
            ;
          } else {
            stryCov_9fa48("414");
            setNote(event.target.value);
          }
          stryMutAct_9fa48("415") ? request.current-- : (stryCov_9fa48("415"), request.current++);
          if (stryMutAct_9fa48("416")) {
            ;
          } else {
            stryCov_9fa48("416");
            setResult(null);
          }
        }
      }} />
      <p className="preview-tip">
        Notes stay here until you leave this preview. Nothing is sent
        automatically.
      </p>
      <button className="preview-customize" disabled={stryMutAct_9fa48("417") ? note.trim() : (stryCov_9fa48("417"), !(stryMutAct_9fa48("418") ? note : (stryCov_9fa48("418"), note.trim())))} onClick={copy}>
        <Copy size={16} />{stryMutAct_9fa48("419") ? "" : (stryCov_9fa48("419"), ' ')}
        {(stryMutAct_9fa48("422") ? linkMode !== 'file' : stryMutAct_9fa48("421") ? false : stryMutAct_9fa48("420") ? true : (stryCov_9fa48("420", "421", "422"), linkMode === (stryMutAct_9fa48("423") ? "" : (stryCov_9fa48("423"), 'file')))) ? stryMutAct_9fa48("424") ? "" : (stryCov_9fa48("424"), 'Copy notes') : stryMutAct_9fa48("425") ? "" : (stryCov_9fa48("425"), 'Copy notes & build link')}
      </button>
      <output aria-live="polite">{receipt}</output>
      {stryMutAct_9fa48("428") ? manualCopy || <>
          <label htmlFor="build-feedback-copy">Message to copy</label>
          <textarea id="build-feedback-copy" ref={fallback} rows={5} readOnly value={manualCopy} onFocus={() => fallback.current?.select()} />
        </> : stryMutAct_9fa48("427") ? false : stryMutAct_9fa48("426") ? true : (stryCov_9fa48("426", "427", "428"), manualCopy && <>
          <label htmlFor="build-feedback-copy">Message to copy</label>
          <textarea id="build-feedback-copy" ref={fallback} rows={5} readOnly value={manualCopy} onFocus={stryMutAct_9fa48("429") ? () => undefined : (stryCov_9fa48("429"), () => stryMutAct_9fa48("430") ? fallback.current.select() : (stryCov_9fa48("430"), fallback.current?.select()))} />
        </>)}
    </details>;
  }
}