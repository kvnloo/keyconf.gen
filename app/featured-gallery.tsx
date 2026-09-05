/* oxlint-disable next/no-img-element -- Pre-sized local Blender renders also ship unchanged to the static Pages export. */
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Cpu,
  Layers,
  Keyboard,
  Grip,
  SquareDashed,
} from 'lucide-react';
import { featuredBuilds, type FeaturedBuild } from '../lib/featured-builds';
import { catalog, categories } from '../lib/catalog';
import { controlDecks } from '../lib/control-deck';

export function FeaturedGallery({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (preset: FeaturedBuild) => void;
}) {
  return (
    <section className="featured-gallery" aria-label="Featured builds">
      <div className="gallery-title">
        <span>Featured builds</span>
        <span>Find your starting point</span>
      </div>
      <div className="featured-cards">
        {featuredBuilds.map((preset, index) => (
          <button
            className="featured-card"
            key={preset.id}
            aria-pressed={selected === preset.id}
            aria-label={`Preview ${preset.name}`}
            onClick={() => onSelect(preset)}
          >
            <img
              src={`models/${preset.id}.png`}
              alt=""
              width="640"
              height="380"
              loading="lazy"
            />
            <span className="featured-card-line">
              <span className="featured-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <ArrowUpRight size={14} />
            </span>
            <strong>{preset.name}</strong>
            <small>{preset.subtitle}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

const categoryNames = {
  case: 'Case',
  pcb: 'PCB',
  plate: 'Plate',
  switch: 'Switches',
  keycaps: 'Keycaps',
  stabilizers: 'Stabilizers',
};
const icons = {
  case: Box,
  pcb: Cpu,
  plate: Layers,
  switch: SquareDashed,
  keycaps: Keyboard,
  stabilizers: Grip,
};
export function FeaturedInspector({
  featured,
  onCustomize,
}: {
  featured: FeaturedBuild;
  onCustomize: () => void;
}) {
  const colors =
    featured.kind === 'keyboard'
      ? [
          featured.build.palette.alpha,
          featured.build.palette.mod,
          featured.build.palette.accent,
          featured.build.palette.space,
        ]
      : Object.values(featured.build.colors);
  return (
    <aside className="featured-inspector" aria-label="Featured build preview">
      <div className="preview-eyebrow">A starting point</div>
      <h2>{featured.name}</h2>
      <p className="featured-subtitle">{featured.subtitle}</p>
      <div className="featured-color-strip" aria-label="Preview colors">
        {colors.map((color, index) => (
          <span key={index} style={{ background: color }} />
        ))}
      </div>
      {featured.kind === 'keyboard' ? (
        <>
          <div className="preview-parts">
            {categories.map((category) => {
              const part = catalog.find(
                (part) => part.id === featured.build.selection[category],
              );
              const Icon = icons[category];
              return (
                <div className="preview-part" key={category}>
                  <span className="part-icon">
                    <Icon size={24} strokeWidth={1} />
                  </span>
                  <div>
                    <span>{categoryNames[category]}</span>
                    <small>{part?.name ?? 'Not selected'}</small>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="preview-note">
            An original 3D study. The palette is independent of the retail
            keycap reference. Review part fit in the workshop.
          </p>
        </>
      ) : (
        <div className="preview-deck-note">
          <p>{controlDecks[featured.build.device].description}</p>
          <p>{controlDecks[featured.build.device].provenance}</p>
          <p>
            Explore its keys, dial, lighting and layers. Local previews, with no
            agent connection or verified device recording.
          </p>
        </div>
      )}
      <button className="button full" onClick={onCustomize}>
        Customize this build <ArrowRight size={17} />
      </button>
      <span className="preview-safe">
        Browsing keeps your current build intact.
      </span>
    </aside>
  );
}
