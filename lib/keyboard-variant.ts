export const q1StockEncoderColor = '#858887';

type CoreBuild = {
  layout: string;
  selection: { case: string; pcb: string; plate: string };
};

export function isQ1MaxAssembly(build: CoreBuild): boolean {
  return (
    build.layout === '75' &&
    build.selection.case === 'q1-max-case' &&
    build.selection.pcb === 'q1-max-pcb' &&
    build.selection.plate === 'q1-max-plate'
  );
}

export function isHatsuAssembly(build: CoreBuild): boolean {
  return (
    build.layout === '45' &&
    build.selection.case === 'am-hatsu-case' &&
    build.selection.pcb === 'am-hatsu-pcb' &&
    build.selection.plate === 'am-hatsu-plate'
  );
}

export function isCyberboardR2Assembly(build: CoreBuild): boolean {
  return (
    build.layout === '75' &&
    build.selection.case === 'am-cyberboard-r2-case' &&
    build.selection.pcb === 'am-cyberboard-r2-pcb' &&
    build.selection.plate === 'am-cyberboard-r2-plate'
  );
}
