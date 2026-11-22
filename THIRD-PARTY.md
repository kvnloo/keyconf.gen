# Third-party notices

## Meng To: Studio Glass skills (MIT)

`lib/glass-pass.ts`, `lib/shaft-pass.ts` and the lighting presets in `lib/desk-scene.ts` and `lib/studio-lighting.ts` adapt techniques from Meng To's skills `refract-liquid-glass`, `shade-glass-button-press` and `light-a-threejs-workspace`. These techniques are a rounded-box SDF lens refracting a backdrop with `refract()` at IOR 1.46, a Gaussian press indent with a release crest and RGB split, coupled window, sky and practical-lamp presets, and depth-clipped raymarched shafts through a window aperture and blind slats. The code was rewritten for this renderer, and no files were copied verbatim.

Those skills are distributed under the MIT License:

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

The copyright holder named in the upstream licence is Meng To.
