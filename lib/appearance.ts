function luminance(hex: string) {
  return [1, 3, 5].reduce((sum, offset, channel) => {
    const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    const linear =
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    return sum + linear * [0.2126, 0.7152, 0.0722][channel];
  }, 0);
}

export function legendInk(background: string) {
  const surface = luminance(background);
  const dark = '#20251f';
  const light = '#f8f8ef';
  const contrast = (ink: string) => {
    const value = luminance(ink);
    return (
      (Math.max(value, surface) + 0.05) / (Math.min(value, surface) + 0.05)
    );
  };
  return contrast(light) > contrast(dark) ? light : dark;
}
