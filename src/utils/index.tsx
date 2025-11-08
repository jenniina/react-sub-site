import { Fragment } from "react";
import {
  ELanguages,
  ELanguagesLong,
  translations as t,
  TranslationKey,
  TranslationLang,
} from "../types";
import { SelectOption } from "../components/Select/Select";
import {
  ColorBlock,
  ComplianceResult,
  HSLColor,
  TColorMode,
} from "../components/AccessibleColors/AccessibleColors";
import {
  ECategories,
  EJokeType,
  ESafemode,
  TCategoryByLanguages,
} from "../components/Jokes/types";

export function getRandomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const splitToLines = (details: string) => {
  return details.split("\n").map((line: string, index: number) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      <br />
    </Fragment>
  ));
};
export const firstToLowerCase = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
};
export const firstToUpperCase = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sanitize = (name: string = getRandomString(9)): string => {
  return name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "-");
};

export const first3Words = (name: string, language: ELanguages): string => {
  // if name is less than 5 words, return the name
  if (name.split(" ").length <= 4) return name;
  // else return the first 3 words
  else return name.split(" ").slice(0, 3).join(" ") + " " + t["Etc"][language];
};

export const options = (enumObj: typeof ELanguagesLong) => {
  return Object.keys(enumObj).map((key) => ({
    value: key,
    label: enumObj[key as keyof typeof enumObj],
  })) as SelectOption[];
};

export const getRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const getRandomLetters = (length: number, capitals: boolean = false) => {
  const lettersAll = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const lettersCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const characters = capitals ? lettersCapital : lettersAll;
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const getRandomMinMax = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

type ScrollLogicalPosition = "center" | "end" | "nearest" | "start";

export const scrollIntoView = (
  id: string,
  block: ScrollLogicalPosition = "start",
  inline: ScrollLogicalPosition = "nearest"
) => {
  const element = document?.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block, inline });
  }
};

export const RandomRGBvalue = () => {
  return Math.floor(Math.random() * 256);
};

const randomUpTo100 = () => {
  const value = Math.ceil(getRandomBetween(30, 100));
  return clampValue(30, value, 100);
};
export const randomUpTo90 = () => {
  const value = Math.ceil(getRandomBetween(5, 90));
  return clampValue(5, value, 90);
};
export const randomHSLColor = (type: string = "array") => {
  const randomOneOrTwo = Math.random() < 0.5 ? 1 : 2;
  if (type === "hsl") {
    const h = Math.floor(Math.random() * 360);
    const s = randomUpTo100();
    const l = randomUpTo90();
    return `hsl(${h}, ${s}%, ${l}%)`;
  } else {
    const h = Math.floor(Math.random() * 360);
    const s = randomUpTo100();
    const l = randomOneOrTwo === 1 ? 5 : 85;
    return [h, s, l];
  }
};
export const generateColors = (
  mode: TColorMode,
  baseHSL: HSLColor
): number[][] => {
  const randomOneOrTwo = baseHSL.l < 50 ? 1 : 2;
  const adjustment = Math.round(getRandomBetween(15, 20));
  const colorset: number[][] = [];
  switch (mode) {
    case "analogous":
      for (let i = 1; i <= 4; i++) {
        let adjustedL =
          randomOneOrTwo === 1
            ? (baseHSL.l + adjustment * i) % 90
            : (baseHSL.l - adjustment * i + 90) % 90;
        adjustedL = clampValue(0, adjustedL, 90);
        const analogousHSL: [number, number, number] = [
          (baseHSL.h + 30 * i) % 360,
          randomUpTo100(),
          adjustedL,
        ];
        colorset.push(analogousHSL);
      }
      break;
    case "complementary":
      let adjustedL =
        randomOneOrTwo === 1 ? baseHSL.l + adjustment : baseHSL.l - adjustment;
      adjustedL = clampValue(0, adjustedL, 90);
      for (let i = 1; i <= 4; i++) {
        let adjustedL =
          randomOneOrTwo === 1
            ? (baseHSL.l + adjustment * i) % 90
            : (baseHSL.l - adjustment * i + 90) % 90;
        adjustedL = clampValue(0, adjustedL, 90);
        const variationHSL: [number, number, number] = [
          i % 2 === 0 ? baseHSL.h : (baseHSL.h + 180) % 360,
          randomUpTo100(),
          adjustedL,
        ];
        colorset.push(variationHSL);
      }
      break;
    case "triad":
      for (let i = 1; i <= 2; i++) {
        let adjustedL =
          randomOneOrTwo === 1
            ? (baseHSL.l + adjustment * i) % 90
            : (baseHSL.l - adjustment * i + 90) % 90;
        adjustedL = clampValue(0, adjustedL, 90);
        const triadHSL: [number, number, number] = [
          (baseHSL.h + 120 * i) % 360,
          randomUpTo100(),
          adjustedL,
        ];
        colorset.push(triadHSL);
      }
      break;
    case "monochromatic":
      for (let i = 1; i <= 4; i++) {
        let adjustedL =
          randomOneOrTwo === 1
            ? (baseHSL.l + adjustment * i) % 90
            : (baseHSL.l - adjustment * i + 90) % 90;
        adjustedL = clampValue(0, adjustedL, 90);
        const adjustedHSL: [number, number, number] = [
          baseHSL.h,
          randomUpTo100(),
          adjustedL,
        ];
        colorset.push(adjustedHSL);
      }
      break;
    case "tetrad":
      for (let i = 1; i <= 3; i++) {
        let adjustedL =
          randomOneOrTwo === 1
            ? (baseHSL.l + adjustment * i) % 90
            : (baseHSL.l - adjustment * i + 90) % 90;
        adjustedL = clampValue(0, adjustedL, 90);
        const tetradHSL: [number, number, number] = [
          (baseHSL.h + 90 * i) % 360,
          randomUpTo100(),
          adjustedL,
        ];
        colorset.push(tetradHSL);
      }
      break;
    default:
      // Fallback to analogous
      for (let i = 1; i <= 4; i++) {
        let adjustedL =
          randomOneOrTwo === 1
            ? (baseHSL.l + adjustment * i) % 90
            : (baseHSL.l - adjustment * i + 90) % 90;
        adjustedL = clampValue(0, adjustedL, 90);
        const defaultHSL: [number, number, number] = [
          (baseHSL.h + 30 * i) % 360,
          randomUpTo100(),
          adjustedL,
        ];
        colorset.push(defaultHSL);
      }
      break;
  }
  return colorset;
};

export const buildColors = (
  existingColors: ColorBlock[],
  colorMode: string | undefined,
  colorsReset: boolean
): number[][] => {
  const newColors: number[][] = [];

  if (existingColors.length === 0 || colorsReset) {
    const baseColor = randomHSLColor("array");
    if (Array.isArray(baseColor)) {
      newColors.push(baseColor);
    }

    // Generate additional colors based on the selected colorMode
    const generated = generateColors(colorMode as TColorMode, {
      h: baseColor[0] as number,
      s: baseColor[1] as number,
      l: baseColor[2] as number,
    });
    newColors.push(...generated);

    return newColors;
  } else {
    // Generate two new colors based on the last existing color
    const baseColor = existingColors[existingColors.length - 1];
    let baseHSL: HSLColor;

    try {
      if (baseColor.colorFormat === "hex") {
        const rgb = hexToRGB(baseColor.color);
        baseHSL = rgbToHSL(rgb.r, rgb.g, rgb.b);
      } else if (baseColor.colorFormat === "rgb") {
        const rgbMatch = baseColor.color.match(
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
        );
        if (rgbMatch) {
          const r = Number(rgbMatch[1]);
          const g = Number(rgbMatch[2]);
          const b = Number(rgbMatch[3]);
          baseHSL = rgbToHSL(r, g, b);
        } else {
          throw new Error("Invalid RGB format");
        }
      } else if (baseColor.colorFormat === "hsl") {
        const hslMatch = baseColor.color.match(
          /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
        );
        if (hslMatch) {
          const h = Number(hslMatch[1]);
          const s = Number(hslMatch[2]);
          const l = Number(hslMatch[3]);
          baseHSL = { h, s, l };
        } else {
          throw new Error("Invalid HSL format");
        }
      } else {
        throw new Error("Unsupported color format");
      }

      const generated = generateColors(colorMode as TColorMode, baseHSL);
      if (colorMode === "tetrad") newColors.push(...generated.slice(0, 3));
      else newColors.push(...generated.slice(0, 3));
    } catch (error) {
      console.error("Error generating new colors:", error);
      // Fallback to generating three random colors
      for (let i = 0; i < 3; i++) {
        const randomColor = randomHSLColor("array");
        if (Array.isArray(randomColor)) {
          newColors.push(randomColor);
        }
      }
    }
  }
  if (!colorsReset && existingColors.length > 0) {
    return newColors;
  }
  return newColors;
};

export function clampValue(min: number, val: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export function createSelectOptions(
  enums: Array<Record<ELanguages, string>>,
  language: ELanguages
): SelectOption[] {
  return enums.map((enumObj) => {
    const label = enumObj[language];
    return { label, value: label };
  });
}

export function createSelectOptionsFromT(
  array: string[],
  language: ELanguages
): SelectOption[] {
  return array.map((key) => ({
    value: key as string,
    label: t[key as TranslationKey]
      ? t[key as TranslationKey][language as TranslationLang]
      : (key as string),
  }));
}

export const hexToRGB = (hex: string) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

export const rgbToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(Math.min(s * 100, 100)),
    l: Math.round(l * 100),
  };
};

export const hslToRGB = (h: number, s: number, l: number) => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(Math.min(r * 255, 255)),
    g: Math.round(Math.min(g * 255, 255)),
    b: Math.round(Math.min(b * 255, 255)),
  };
};

export const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hk = h / 360;
    r = hue2rgb(p, q, hk + 1 / 3);
    g = hue2rgb(p, q, hk);
    b = hue2rgb(p, q, hk - 1 / 3);
  }

  return rgbToHex(
    Math.round(Math.min(r * 255, 255)),
    Math.round(Math.min(g * 255, 255)),
    Math.round(Math.min(b * 255, 255))
  );
};

export const calculateLuminance = (r: number, g: number, b: number): number => {
  const [R, G, B] = [r, g, b].map((v) => {
    const normalized = v / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });
  return R * 0.2126 + G * 0.7152 + B * 0.0722;
};

export const getContrastRatio = (lum1: number, lum2: number) => {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
};

export const determineAccessibility = (
  color1: ColorBlock,
  color2: ColorBlock
): ComplianceResult => {
  const parseC = (color: ColorBlock) => {
    let r: number, g: number, b: number;

    if (color.colorFormat === "hex") {
      ({ r, g, b } = hexToRGB(color.color));
    } else if (color.colorFormat === "rgb") {
      const rgbMatch = color.color.match(
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
      );
      if (rgbMatch) {
        r = Number(rgbMatch[1]);
        g = Number(rgbMatch[2]);
        b = Number(rgbMatch[3]);
      } else {
        throw new Error("Invalid RGB format");
      }
    } else if (color.colorFormat === "hsl") {
      const hslMatch = color.color.match(
        /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
      );
      if (hslMatch) {
        const h = Number(hslMatch[1]);
        const s = Number(hslMatch[2]);
        const l = Number(hslMatch[3]);
        ({ r, g, b } = hslToRGB(h, s, l));
      } else {
        throw new Error("Invalid HSL format");
      }
    } else {
      throw new Error("Unsupported color format");
    }

    return { r, g, b };
  };

  const rgb1 = parseC(color1);
  const rgb2 = parseC(color2);

  const lum1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);

  const contrastRatio = getContrastRatio(lum1, lum2);

  return {
    isAAARegularTextCompliant: contrastRatio >= 7,
    isAARegularTextCompliant: contrastRatio >= 4.5,
    isAAUIComponentsCompliant: contrastRatio >= 3,
  };
};

export function elementsOverlap(element1: HTMLElement, element2: HTMLElement) {
  const domRect1 = element1.getBoundingClientRect();
  const domRect2 = element2.getBoundingClientRect();

  return !(
    domRect1.top + 5 > domRect2.bottom - 5 ||
    domRect1.right < domRect2.left ||
    domRect1.bottom - 5 < domRect2.top + 5 ||
    domRect1.left > domRect2.right
  );
}

export function removeMinus(val: number): number {
  return val < 0 ? -val : val;
}

export const translate = <T extends string | number | symbol>(
  translationMap: Record<T, Record<ELanguages, string>>,
  key: T,
  language: ELanguages
): string => {
  return translationMap[key]?.[language] || (key as string);
};

export function getKeyByValue(
  enumObj:
    | TCategoryByLanguages
    | typeof EJokeType
    | typeof ESafemode
    | typeof ELanguages,
  value: ECategories | EJokeType | ESafemode | ELanguages
) {
  for (const key in enumObj) {
    if (enumObj[key as keyof typeof enumObj] === value) {
      return key as SelectOption["label"];
    }
  }
  // Handle the case where the value is not found in the enum
  return undefined;
}

// Helper to get hex value from any color format
export const getHexFromColor = (color: string, type: string) => {
  if (type === "hex") return color.toUpperCase();
  if (type === "hsl") {
    const hslMatch = color.match(
      /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i
    );
    if (hslMatch) {
      const h = Number(hslMatch[1]);
      const s = Number(hslMatch[2]);
      const l = Number(hslMatch[3]);
      const rgb = hslToRGB(h, s, l);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
  }
  if (type === "rgb") {
    const rgbMatch = color.match(
      /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i
    );
    if (rgbMatch) {
      const r = Number(rgbMatch[1]);
      const g = Number(rgbMatch[2]);
      const b = Number(rgbMatch[3]);
      return rgbToHex(r, g, b);
    }
  }
  return color;
};
