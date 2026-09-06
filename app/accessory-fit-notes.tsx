import type {
  AccessoryCompatibility,
  AccessoryProduct,
  AccessorySelection,
} from '../lib/build-accessories';

export default function AccessoryFitNotes({
  selections,
  products,
  checks,
}: {
  selections: AccessorySelection[];
  products: readonly AccessoryProduct[];
  checks: Record<string, AccessoryCompatibility>;
}) {
  if (!selections.length) return null;
  return (
    <section
      className="accessory-fit-notes"
      aria-label="Accessory compatibility notes"
    >
      <h3>Accessory compatibility</h3>
      {selections.map((selection) => {
        const check = checks[selection.id];
        const product = products.find(
          (product) => product.id === selection.productId,
        );
        return (
          <section key={selection.id}>
            <h4>
              {product?.name ?? selection.productId} · {check.status}
            </h4>
            <ul>
              {check.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
            {check.sources.map((source) => (
              <a key={source} href={source} target="_blank" rel="noreferrer">
                Compatibility source ↗
              </a>
            ))}
          </section>
        );
      })}
    </section>
  );
}
