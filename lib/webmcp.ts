export type StudyInput = { layout: '60' | '65' | '75'; palette: string };
export function parseStudy(input: unknown): StudyInput {
  if (
    typeof input !== 'object' ||
    input === null ||
    !('layout' in input) ||
    !['60', '65', '75'].includes(String(input.layout)) ||
    !('palette' in input) ||
    typeof input.palette !== 'string'
  )
    throw new Error('Choose a supported layout and named palette.');
  const layout = input.layout;
  if (layout !== '60' && layout !== '65' && layout !== '75')
    throw new Error('Unsupported layout.');
  if (
    !['Matcha & cream', 'Midnight', 'Porcelain', 'Botanical'].includes(
      input.palette,
    )
  )
    throw new Error('Unsupported palette.');
  return { layout, palette: input.palette };
}
type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean };
  execute: (input: unknown) => unknown;
};
declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: Tool,
        options: { signal: AbortSignal },
      ) => void | Promise<void>;
    };
  }
}
export function registerStudioTools(
  read: () => unknown,
  configure: (input: StudyInput) => void,
) {
  const context = document.modelContext;
  if (!context) return;
  const controller = new AbortController();
  const tools: Tool[] = [
    {
      name: 'read_keyboard_build',
      description:
        'Read the current keyboard study, selected components, and compatibility results.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: () => read(),
    },
    {
      name: 'configure_keyboard_study',
      description:
        'Set the visible keyboard layout and color palette. Changes the illustrative study, not selected retail parts.',
      inputSchema: {
        type: 'object',
        properties: {
          layout: { type: 'string', enum: ['60', '65', '75'] },
          palette: {
            type: 'string',
            enum: ['Matcha & cream', 'Midnight', 'Porcelain', 'Botanical'],
          },
        },
        required: ['layout', 'palette'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: async (input) => {
        const parsed = parseStudy(input);
        configure(parsed);
        await new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        );
        return read();
      },
    },
  ];
  for (const tool of tools) {
    try {
      void Promise.resolve(
        context.registerTool(tool, { signal: controller.signal }),
      ).catch(() => {});
    } catch {}
  }
  return () => controller.abort();
}
