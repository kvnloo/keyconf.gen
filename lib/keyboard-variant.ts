export function isQ1MaxAssembly(build: {
  layout: string;
  selection: { case: string; pcb: string; plate: string };
}): boolean {
  return (
    build.layout === '75' &&
    build.selection.case === 'q1-max-case' &&
    build.selection.pcb === 'q1-max-pcb' &&
    build.selection.plate === 'q1-max-plate'
  );
}
