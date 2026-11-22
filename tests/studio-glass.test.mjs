import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GLASS,
  MIN_UI_CONTRAST,
  contrastRatio,
  glassComposite,
  glassContrast,
  lensComposite,
} from '../lib/theme.ts';
import {
  DEFAULT_LIGHTING,
  LIGHTING_PRESETS,
  PRESET_COPY,
  ROOM_LIGHT,
  brightnessGain,
  clampBrightness,
  parseLighting,
} from '../lib/studio-lighting.ts';

test('glass ink and muted text pass over the brightest and darkest room', () => {
  const { ink, muted } = glassContrast();
  assert.ok(ink >= MIN_UI_CONTRAST, `glass ink ${ink.toFixed(2)}`);
  assert.ok(muted >= MIN_UI_CONTRAST, `glass muted ${muted.toFixed(2)}`);
  for (const backdrop of [GLASS.brightest, GLASS.darkest]) {
    assert.ok(
      contrastRatio(GLASS.ink, glassComposite(backdrop)) >= MIN_UI_CONTRAST,
    );
    assert.ok(
      contrastRatio(GLASS.muted, lensComposite(backdrop)) >= MIN_UI_CONTRAST,
    );
  }
});

test('a thinner glass tint would fail, so the check has teeth', () => {
  assert.ok(
    contrastRatio(GLASS.muted, glassComposite(GLASS.brightest, 0.3)) <
      MIN_UI_CONTRAST,
  );
});

test('every preset couples the whole room and keeps copy', () => {
  for (const preset of LIGHTING_PRESETS) {
    const light = ROOM_LIGHT[preset];
    assert.ok(light.exposure > 0 && light.lampIntensity >= 0);
    assert.ok(['day', 'sunset', 'storm', 'night'].includes(light.screen));
    assert.ok(PRESET_COPY[preset].title.length > 0);
  }
  // Night is lamp-led, the storm is diffuse and rainy, sunset is warm and low.
  assert.ok(
    ROOM_LIGHT.night.lampIntensity > ROOM_LIGHT.afternoon.lampIntensity,
  );
  assert.ok(ROOM_LIGHT.night.sunIntensity < ROOM_LIGHT.morning.sunIntensity);
  assert.equal(ROOM_LIGHT.thunderstorm.rain, 1);
  assert.ok(
    ROOM_LIGHT.thunderstorm.shaftDensity < ROOM_LIGHT.afternoon.shaftDensity,
  );
  assert.ok(ROOM_LIGHT.sunset.sunElevation < ROOM_LIGHT.afternoon.sunElevation);
});

test('stored lighting is validated and brightness is monotonic', () => {
  assert.deepEqual(parseLighting(null), DEFAULT_LIGHTING);
  assert.deepEqual(parseLighting('not json'), DEFAULT_LIGHTING);
  assert.deepEqual(parseLighting('{"preset":"disco","brightness":400}'), {
    preset: DEFAULT_LIGHTING.preset,
    brightness: 100,
  });
  assert.deepEqual(parseLighting('{"preset":"night","brightness":12.4}'), {
    preset: 'night',
    brightness: 12,
  });
  assert.equal(clampBrightness(Number.NaN), DEFAULT_LIGHTING.brightness);
  let previous = -1;
  for (let value = 0; value <= 100; value += 5) {
    const gain = brightnessGain(value);
    assert.ok(gain > previous);
    previous = gain;
  }
});
