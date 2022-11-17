export const generateTint = (rgb, tintFactor) => {
  const tint = {
    r: Math.round(rgb.r + (255 - rgb.r) * tintFactor),
    g: Math.round(rgb.g + (255 - rgb.g) * tintFactor),
    b: Math.round(rgb.b + (255 - rgb.b) * tintFactor),
  };
  return `rgb(${tint.r}, ${tint.g}, ${tint.b})`;
};

export const generateShade = (rgb, shadeFactor) => {
  const shade = {
    r: Math.round(rgb.r * shadeFactor),
    g: Math.round(rgb.g * shadeFactor),
    b: Math.round(rgb.b * shadeFactor),
  };
  return `rgb(${shade.r}, ${shade.g}, ${shade.b})`;
};

export const generatePalette = (color) => {
  return {
    50: generateTint(color, 0.9),
    100: generateTint(color, 0.8),
    200: generateTint(color, 0.7),
    300: generateTint(color, 0.6),
    400: generateTint(color, 0.5),
    500: generateShade(color, 1),
    600: generateShade(color, 0.9),
    700: generateShade(color, 0.8),
    800: generateShade(color, 0.7),
    900: generateShade(color, 0.6),
  };
};
