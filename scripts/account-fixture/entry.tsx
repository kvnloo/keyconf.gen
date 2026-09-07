import { createRoot } from 'react-dom/client';
import { useCallback, useState } from 'react';
import FavoritesPanel, {
  FavoriteButton,
} from '../../app/account/favorites-panel';
import AccountPanel from '../../app/account/account-panel';
import { useBuild } from '../../app/use-build';
import '../../app/globals.css';

function Fixture() {
  const [favoriteRevision, setFavoriteRevision] = useState(0);
  const candidate = new URL(window.location.href).searchParams.get(
    'publication',
  );
  const [notice, setNotice] = useState('');
  const notify = useCallback((message: string) => setNotice(message), []);
  const { build, edit, undo, canUndo, ready } = useBuild(notify);
  return (
    <main style={{ padding: '12px', maxWidth: '1000px', margin: 'auto' }}>
      <section
        aria-label="Fixture studio"
        style={{ padding: '20px', display: 'grid', gap: '12px' }}
      >
        <label>
          Device build name
          <input
            value={build.name}
            onChange={(event) => edit({ name: event.target.value })}
          />
        </label>
        <button disabled={!canUndo} onClick={undo}>
          Undo studio change
        </button>
        <output>{notice}</output>
      </section>
      {ready && <AccountPanel draft={build} onOpen={(saved) => edit(saved)} />}
      {ready && (
        <>
          {candidate && (
            <FavoriteButton
              publicationId={candidate}
              onChange={() => setFavoriteRevision((value) => value + 1)}
            />
          )}
          <FavoritesPanel refreshKey={favoriteRevision} />
        </>
      )}
    </main>
  );
}

const root = document.getElementById('root');
if (root) createRoot(root).render(<Fixture />);
