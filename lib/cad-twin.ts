import cadRevisions from '../docs/reference-assets/cad-revisions.json' with { type: 'json' };

export const UNIT_MM = 19.05;

export type GeometryGrade =
  | 'unmodeled'
  | 'illustrative'
  | 'layout-verified'
  | 'dimension-verified'
  | 'cad-derived'
  | 'measured';

export type CadPartRole =
  | 'case_bottom'
  | 'plate'
  | 'pcb'
  | 'weight'
  | 'control_dial'
  | 'key';

export type CadEvidenceKind =
  | 'photo'
  | 'layout'
  | 'dimensions'
  | 'cad'
  | 'measurement';

/** Generated mesh listed for a part: repository path plus its content hash. */
export type CadScene = {
  glb: string;
  sha256: string;
};

export type CadPart = {
  role: CadPartRole;
  grade: GeometryGrade;
  source: string;
  license?: string;
  sha256?: string;
  envelopeMm?: { size: [number, number, number] };
  scene?: CadScene;
};

export type CadRevision = {
  id: string;
  parts: CadPart[];
};

/** One displayable part: which mesh to load and which study mesh it replaces. */
export type CadDisplayRequest = {
  role: CadPartRole;
  glb: string;
  assetPath: string;
  sha256: string;
};

export type CadDisplayDevice = {
  kind: string;
  q1Max?: boolean;
  hatsu?: boolean;
  cyberboard?: boolean;
};

export type CadDisplayPlan = {
  revisionId: string | null;
  requests: CadDisplayRequest[];
  twin: boolean;
};

export type CatalogGeometry =
  | { status: 'unmodeled'; evidence?: string[] }
  | {
      status: 'modeled';
      modelId: string;
      fidelity: Exclude<GeometryGrade, 'unmodeled'>;
      evidence: string[];
      cad?: {
        source: string;
        license: string;
        sha256: string;
        parts: CadPartRole[];
      };
    };

const GRADE_RANK: Record<GeometryGrade, number> = {
  unmodeled: 0,
  illustrative: 1,
  'layout-verified': 2,
  'dimension-verified': 3,
  'cad-derived': 4,
  measured: 5,
};

const TWIN_ROLES: CadPartRole[] = ['case_bottom', 'plate', 'pcb'];

const MODELED_GRADES = new Set<GeometryGrade>([
  'illustrative',
  'layout-verified',
  'dimension-verified',
  'cad-derived',
  'measured',
]);

/** Studies and layout traces never display a mesh, even if one is listed. */
const DISPLAY_GRADES = new Set<GeometryGrade>([
  'dimension-verified',
  'cad-derived',
  'measured',
]);

const PUBLIC_PREFIX = 'public/';

const CAD_GLB_PATH = /^public\/models\/cad\/[A-Za-z0-9._-]+\.glb$/;

const SHA256_HEX = /^[0-9a-f]{64}$/;

const KEYBOARD_REVISIONS: readonly {
  flag: 'hatsu' | 'cyberboard' | 'q1Max';
  revisionId: string;
}[] = [
  { flag: 'hatsu', revisionId: 'am-hatsu' },
  { flag: 'cyberboard', revisionId: 'cyberboard-r2' },
  { flag: 'q1Max', revisionId: 'q1-max-ansi-encoder' },
];

const REVISIONS = cadRevisions.revisions as CadRevision[];

export function geometryGrade(geometry: {
  status: string;
  fidelity?: string;
}): GeometryGrade {
  if (geometry.status !== 'modeled') return 'unmodeled';
  return MODELED_GRADES.has(geometry.fidelity as GeometryGrade)
    ? (geometry.fidelity as GeometryGrade)
    : 'unmodeled';
}

export function weakerGrade(
  left: GeometryGrade,
  right: GeometryGrade,
): GeometryGrade {
  return GRADE_RANK[left] <= GRADE_RANK[right] ? left : right;
}

export function assemblyGrade(parts: readonly CadPart[]): GeometryGrade {
  return TWIN_ROLES.reduce<GeometryGrade>((grade, role) => {
    const part = parts.find((entry) => entry.role === role);
    return weakerGrade(grade, part?.grade ?? 'unmodeled');
  }, 'measured');
}

export function canHostScene(grade: GeometryGrade): boolean {
  return grade !== 'unmodeled';
}

export function isCadTwin(grade: GeometryGrade): boolean {
  return grade === 'cad-derived' || grade === 'measured';
}

export function sceneLabel(grade: GeometryGrade): string {
  switch (grade) {
    case 'unmodeled':
      return 'Unmodeled · no CAD twin';
    case 'illustrative':
      return 'Illustrative study · not CAD';
    case 'layout-verified':
      return 'Layout-verified · not CAD';
    case 'dimension-verified':
      return 'Dimension-verified · not manufacturer CAD';
    case 'cad-derived':
      return 'CAD twin';
    case 'measured':
      return 'Measured CAD twin';
  }
}

export function canPromote(
  from: GeometryGrade,
  to: GeometryGrade,
  evidence: CadEvidenceKind,
): boolean {
  if (GRADE_RANK[to] <= GRADE_RANK[from]) return true;
  if (evidence === 'photo') return false;
  if (to === 'layout-verified') return evidence === 'layout';
  if (to === 'dimension-verified') return evidence === 'dimensions';
  if (to === 'cad-derived') return evidence === 'cad';
  if (to === 'measured') return evidence === 'measurement';
  return to === 'illustrative';
}

export function assertCadDerived(geometry: CatalogGeometry): void {
  if (geometry.status !== 'modeled' || geometry.fidelity !== 'cad-derived')
    return;
  const cad = geometry.cad;
  if (!cad?.sha256 || !cad.source || !cad.license)
    throw new Error('cad-derived geometry requires source, license, and hash');
}

export function sceneUnitsFromMm(mm: number, unitMm = UNIT_MM): number {
  return mm / unitMm;
}

export function requiredEnvelope(
  revision: CadRevision,
  role: CadPartRole,
): { size: [number, number, number]; source: string } {
  const part = revision.parts.find((entry) => entry.role === role);
  if (!part?.envelopeMm)
    throw new Error(`Missing ${role} envelope on ${revision.id}`);
  return { size: part.envelopeMm.size, source: part.source };
}

export function cadRevisionById(id: string): CadRevision {
  const revision = REVISIONS.find((entry) => entry.id === id);
  if (!revision) throw new Error(`Missing CAD revision: ${id}`);
  return revision;
}

/** Listing a mesh is not enough: the grade and its evidence must earn it. */
export function canDisplayCadPart(part: CadPart): boolean {
  const scene = part.scene;
  if (!scene || !CAD_GLB_PATH.test(scene.glb) || !SHA256_HEX.test(scene.sha256))
    return false;
  if (!DISPLAY_GRADES.has(part.grade)) return false;
  if (!isCadTwin(part.grade)) return true;
  return !!part.license && SHA256_HEX.test(part.sha256 ?? '');
}

export function cadDisplayRequests(
  parts: readonly CadPart[],
): CadDisplayRequest[] {
  const requests: CadDisplayRequest[] = [];
  for (const part of parts) {
    const scene = part.scene;
    if (!scene || !canDisplayCadPart(part)) continue;
    requests.push({
      role: part.role,
      glb: scene.glb,
      assetPath: scene.glb.slice(PUBLIC_PREFIX.length),
      sha256: scene.sha256,
    });
  }
  return requests;
}

export function cadDisplayForKeyboard(
  device: CadDisplayDevice,
): CadDisplayPlan {
  const empty: CadDisplayPlan = {
    revisionId: null,
    requests: [],
    twin: false,
  };
  if (device.kind !== 'keyboard') return empty;
  const match = KEYBOARD_REVISIONS.find((entry) => device[entry.flag]);
  const revision =
    match && REVISIONS.find((entry) => entry.id === match.revisionId);
  if (!revision) return empty;
  return {
    revisionId: revision.id,
    requests: cadDisplayRequests(revision.parts),
    twin: isCadTwin(assemblyGrade(revision.parts)),
  };
}
