# Creator publishing interface

Status: planned interface over tested private request handlers. Google setup remains deferred. No public publishing control is activated.

## One explicit decision

Start from a private saved snapshot in the account list. The action is “Prepare publication.” Opening it must not save, publish, or overwrite the studio draft. Load that snapshot by its owned ID and show its name, keyboard illustration, parts/source links and recording/geometry limits. The preview represents this saved revision, not subsequent studio edits.

The creator chooses a title and optional note. A secondary “Creator drop” choice reveals availability text and an optional original purchase/enquiry link. Do not infer stock, prices or sales promises. Keep payment and checkout out of the interface.

Before publishing, show the chosen creator profile and all information that will become public. Explain that anyone with access to the public site can view and copy the configuration. Private account identifiers, email and unrelated saves must not appear. The final button says “Publish build” or “Publish drop.” A review screen is the user's publication decision; there is no extra conversational approval step.

## State and recovery

Capture one validated publication request and operation ID when the creator confirms. A retry after an uncertain response resends that exact request, even if the form or current studio draft changes. Do not silently generate a replacement operation ID. On rejection, retain the entered details and offer an explicit return to editing. If the outcome is uncertain, explain that a release may already exist before starting another operation.

A successful receipt links to the actual published build and names the acknowledged revision. A profile-required response links back to profile editing and preserves the prepared details. Session expiry preserves the review and operation where supported; full redirect recovery remains an account activation gate.

The publication list shows each owned release and whether it is withdrawn. Withdrawing has an explicit confirmation explaining that the live page and discovery entry become unavailable, while previously copied files cannot be recalled. Repeat withdrawal preserves the original withdrawn state. Never withdraw or publish on navigation, mounting or incidental field changes.

## Verification required

- Save privately, prepare, cancel, and prove no public record was created.
- Review one saved revision, edit the studio draft, publish, and prove the frozen saved revision was used.
- Lose a successful response, retry, and prove there is exactly one release.
- Reject a changed payload with the same operation ID; preserve the original release.
- Verify original maker links, profile attribution, plain-text notes and explicit acoustic/geometry limits in the real public viewer.
- Test creator drops with original external links and no checkout or invented availability.
- Verify owner-only list/withdrawal, anonymous mutation rejection, profile-required recovery and expired-session recovery.
- Withdraw, then verify discovery exclusion and unavailable public/favorite views without leaking private details.
- Drive all controls by keyboard at 320px, check focus after asynchronous completion, and inspect the rendered review.

The existing request factory is preparation, not evidence that this complete workflow exists.
