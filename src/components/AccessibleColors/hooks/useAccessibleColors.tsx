import { useState, useEffect, useCallback } from "react";
import useLocalStorage from "../../../hooks/useStorage";
import { ColorBlock, TColorMode } from "../AccessibleColors";
import {
  calculateLuminance,
  determineAccessibility,
  buildColors,
  hslToRGB,
  rgbToHSL,
  hexToRGB,
} from "../../../utils";

const status = "colors";
const format = "hsl";

const defaultColors: ColorBlock[] = [
  {
    id: 1,
    color: "hsl(200, 50%, 10%)",
    luminance: 0.011540526030345211,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [4, 5],
      AA_UIComponents: [3, 4, 5],
      AA_RegularText: [3, 4, 5],
    },
  },
  {
    id: 2,
    color: "hsl(200, 50%, 35%)",
    luminance: 0.12179747967530058,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [],
      AA_UIComponents: [4, 5],
      AA_RegularText: [5],
    },
  },
  {
    id: 3,
    color: "hsl(200, 50%, 55%)",
    luminance: 0.3071249100459835,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [],
      AA_UIComponents: [1],
      AA_RegularText: [1],
    },
  },
  {
    id: 4,
    color: "hsl(200, 50%, 75%)",
    luminance: 0.5493970089199802,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [1],
      AA_UIComponents: [1, 2],
      AA_RegularText: [1],
    },
  },
  {
    id: 5,
    color: "hsl(200, 50%, 90%)",
    luminance: 0.800081557105977,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [1],
      AA_UIComponents: [1, 2],
      AA_RegularText: [1, 2],
    },
  },
];
const useAccessibleColors = (initialColorMode: TColorMode) => {
  const [colors, setColors, deleteColors] = useLocalStorage<ColorBlock[]>(
    "Jenniina-colorsAccessibility",
    defaultColors
  );

  // On initial load, check for colors param in URL
  useEffect(() => {
    const parseColorsFromUrl = () => {
      const url = new URL(window.location.href);
      const colorsParam = url.searchParams.get("colors");
      if (colorsParam) {
        try {
          const arr = colorsParam.split("_").map((pair) => {
            const parts = pair.split("-");
            const type = parts[0];
            let color = "";
            if (type === "hsl" && parts.length === 4) {
              color = `hsl(${parts[1]}, ${parts[2]}%, ${parts[3]}%)`;
            } else if (type === "rgb" && parts.length === 4) {
              color = `rgb(${parts[1]}, ${parts[2]}, ${parts[3]})`;
            } else if (type === "hex" && parts.length === 2) {
              color = `#${parts[1]}`;
            }
            return { type, color };
          });
          if (Array.isArray(arr)) {
            const loadedColors = arr.map((item, idx) => {
              let colorFormat = item.type as "hsl" | "rgb" | "hex";
              let color = item.color;
              // Calculate luminance from color string
              let rgb;
              if (colorFormat === "hex") {
                rgb = hexToRGB(color);
              } else if (colorFormat === "hsl") {
                const hslMatch = color.match(
                  /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i
                );
                if (hslMatch) {
                  const h = Number(hslMatch[1]);
                  const s = Number(hslMatch[2]);
                  const l = Number(hslMatch[3]);
                  rgb = hslToRGB(h, s, l);
                }
              } else if (colorFormat === "rgb") {
                const rgbMatch = color.match(
                  /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i
                );
                if (rgbMatch) {
                  rgb = {
                    r: Number(rgbMatch[1]),
                    g: Number(rgbMatch[2]),
                    b: Number(rgbMatch[3]),
                  };
                }
              }
              const lum = rgb ? calculateLuminance(rgb.r, rgb.g, rgb.b) : 0;
              return {
                id: idx + 1,
                color,
                luminance: lum,
                status,
                colorFormat,
                compliantColors: {
                  AA_RegularText: [],
                  AAA_RegularText: [],
                  AA_UIComponents: [],
                },
              };
            });
            setColors(loadedColors);
          }
        } catch (e) {
          // Ignore invalid param
        }
      }
    };
    // Initial parse
    parseColorsFromUrl();
    // Listen for popstate (browser navigation)
    const onPopState = () => {
      parseColorsFromUrl();
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const [currentColor, setCurrentColor] = useLocalStorage<string>(
    "Jenniina-currentColor",
    "#7D7D7D"
  );
  const [idCounter, setIdCounter] = useLocalStorage<number>(
    "Jenniina-idCounter",
    defaultColors.length + 1
  );
  const [mode, setMode] = useState<TColorMode>(initialColorMode);
  const [colorsReset, setColorsReset] = useState(false);

  const recalculateCompliance = useCallback((updatedColors: ColorBlock[]) => {
    return updatedColors.map((block) => {
      const compliance = determineComplianceForBlock(block, updatedColors);
      return {
        ...block,
        compliantColors: compliance,
      };
    });
  }, []);

  // Update all colors in URL as human-readable string
  const updateSearchParams = useCallback((colorBlocks: ColorBlock[]) => {
    const colorArr = colorBlocks.map((block) => {
      if (block.colorFormat === "hsl") {
        const hslMatch = block.color.match(
          /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i
        );
        if (hslMatch) {
          return `hsl-${hslMatch[1]}-${hslMatch[2]}-${hslMatch[3]}`;
        }
      } else if (block.colorFormat === "rgb") {
        const rgbMatch = block.color.match(
          /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i
        );
        if (rgbMatch) {
          return `rgb-${rgbMatch[1]}-${rgbMatch[2]}-${rgbMatch[3]}`;
        }
      } else if (block.colorFormat === "hex" && block.color.startsWith("#")) {
        return `hex-${block.color.slice(1)}`;
      }
      // fallback: store as is
      return `${block.colorFormat}-${block.color}`;
    });
    const url = new URL(window.location.href);
    url.searchParams.set("colors", colorArr.join("_"));
    window.history.replaceState(
      {},
      "",
      url.pathname + "?" + url.searchParams.toString() + url.hash
    );
  }, []);

  const determineComplianceForBlock = (
    block: ColorBlock,
    allColors: ColorBlock[]
  ) => {
    let aaa: number[] = [];
    let aaUI: number[] = [];
    let aaRegular: number[] = [];

    allColors.forEach((other) => {
      if (other.id === block.id) return;
      const accessibility = determineAccessibility(block, other);
      if (accessibility.isAAARegularTextCompliant) {
        aaa.push(other.id);
      }
      if (accessibility.isAARegularTextCompliant) {
        aaRegular.push(other.id);
      }
      if (accessibility.isAAUIComponentsCompliant) {
        aaUI.push(other.id);
      }
    });

    return {
      AAA_RegularText: Array.from(new Set(aaa)),
      AA_RegularText: Array.from(new Set(aaRegular)),
      AA_UIComponents: Array.from(new Set(aaUI)),
    };
  };

  const addColor = useCallback(() => {
    const { r, g, b } = hexToRGB(currentColor);
    const { h, s, l } = rgbToHSL(r, g, b);
    const lum = calculateLuminance(r, g, b);

    const newColorBlock: ColorBlock = {
      id: idCounter,
      color: `hsl(${h}, ${s}%, ${l}%)`,
      luminance: lum,
      status: "colors",
      colorFormat: "hsl",
      compliantColors: {
        AA_RegularText: [],
        AAA_RegularText: [],
        AA_UIComponents: [],
      },
    };

    const updatedColors = [...colors, newColorBlock];
    const recalculatedColors = recalculateCompliance(updatedColors);

    setColors(recalculatedColors);
    updateSearchParams(recalculatedColors);
    setIdCounter((prev) => prev + 1);
  }, [
    currentColor,
    idCounter,
    recalculateCompliance,
    setColors,
    updateSearchParams,
    setIdCounter,
    colors,
  ]);

  const removeColor = useCallback(
    (id: number) => {
      const updatedColors = colors
        .filter((block) => block.id !== id)
        .map((block) => ({
          ...block,
          compliantColors: {
            AAA_RegularText: block.compliantColors.AAA_RegularText.filter(
              (cid) => cid !== id
            ),
            AA_RegularText: block.compliantColors.AA_RegularText.filter(
              (cid) => cid !== id
            ),
            AA_UIComponents: block.compliantColors.AA_UIComponents.filter(
              (cid) => cid !== id
            ),
          },
        }));
      const recalculatedColors = recalculateCompliance(updatedColors);
      setColors(recalculatedColors);
      updateSearchParams(recalculatedColors);
    },
    [colors, recalculateCompliance, setColors, updateSearchParams]
  );

  const updateColor = useCallback(
    (id: number, newColor: string, format: "hex" | "rgb" | "hsl") => {
      try {
        let storedColor: string;
        let r: number, g: number, b: number;

        // Parse and store the color based on the selected format
        if (format === "hsl") {
          const hslMatch = newColor.match(
            /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
          );
          if (!hslMatch) throw new Error("Invalid HSL format");

          const h = Number(hslMatch[1]);
          const s = Number(hslMatch[2]);
          const l = Number(hslMatch[3]);

          if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
            throw new Error("HSL values out of range");
          }

          storedColor = `hsl(${h}, ${s}%, ${l}%)`;

          const rgb = hslToRGB(h, s, l);
          r = rgb.r;
          g = rgb.g;
          b = rgb.b;
        } else if (format === "rgb") {
          const rgbMatch = newColor.match(
            /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
          );
          if (!rgbMatch) throw new Error("Invalid RGB format");

          const rVal = Number(rgbMatch[1]);
          const gVal = Number(rgbMatch[2]);
          const bVal = Number(rgbMatch[3]);

          if ([rVal, gVal, bVal].some((v) => v < 0 || v > 255)) {
            throw new Error("RGB values must be between 0 and 255");
          }

          storedColor = `rgb(${rVal}, ${gVal}, ${bVal})`;
          r = rVal;
          g = gVal;
          b = bVal;
        } else if (format === "hex") {
          if (!/^#([0-9A-F]{3}){1,2}$/i.test(newColor))
            throw new Error("Invalid Hex format");

          storedColor = newColor.toUpperCase();
          const rgb = hexToRGB(storedColor);
          r = rgb.r;
          g = rgb.g;
          b = rgb.b;
        } else {
          throw new Error("Unsupported color format");
        }

        const lum = calculateLuminance(r, g, b);

        const updatedColors = colors.map((block) => {
          if (block.id === id) {
            return {
              ...block,
              color: storedColor,
              colorFormat: format,
              luminance: lum,
              compliantColors: {
                AAA_RegularText: [],
                AA_RegularText: [],
                AA_UIComponents: [],
              },
            };
          }
          return block;
        });

        const recalculatedColors = updatedColors.map((block) => {
          if (block.id === id) {
            return block;
          }

          const updatedBlock = updatedColors.find((c) => c.id === id);
          if (!updatedBlock) return block;

          const accessibility = determineAccessibility(block, updatedBlock);

          return {
            ...block,
            compliantColors: {
              AAA_RegularText: accessibility.isAAARegularTextCompliant
                ? [...new Set([...block.compliantColors.AAA_RegularText, id])]
                : block.compliantColors.AAA_RegularText.filter(
                    (cid) => cid !== id
                  ),
              AA_RegularText: accessibility.isAARegularTextCompliant
                ? [...new Set([...block.compliantColors.AA_RegularText, id])]
                : block.compliantColors.AA_RegularText.filter(
                    (cid) => cid !== id
                  ),
              AA_UIComponents: accessibility.isAAUIComponentsCompliant
                ? [...new Set([...block.compliantColors.AA_UIComponents, id])]
                : block.compliantColors.AA_UIComponents.filter(
                    (cid) => cid !== id
                  ),
            },
          };
        });

        const updatedColorBlock = recalculatedColors.find(
          (block) => block.id === id
        );
        if (updatedColorBlock) {
          const recalculatedCompliance = determineComplianceForBlock(
            updatedColorBlock,
            recalculatedColors
          );

          const finalColors = recalculatedColors.map((block) =>
            block.id === id
              ? { ...block, compliantColors: recalculatedCompliance }
              : block
          );

          setColors(finalColors);
          updateSearchParams(finalColors);
        } else {
          setColors(recalculatedColors);
          updateSearchParams(recalculatedColors);
        }
      } catch (error) {
        console.error("Error updating color:", error);
      }
    },
    [colors, setColors, recalculateCompliance, updateSearchParams]
  );

  const resetColors = useCallback(() => {
    deleteColors();
    setColors(defaultColors);
    updateSearchParams(defaultColors);
    setIdCounter(defaultColors.length + 1);
  }, [deleteColors, setColors, setIdCounter, updateSearchParams]);

  const clearColors = useCallback(() => {
    deleteColors();
    setColors([]);
    updateSearchParams([]);
    setIdCounter(1);
  }, [deleteColors, setColors, setIdCounter, updateSearchParams]);

  const makeColorPalette = useCallback(() => {
    const newHSLColors = buildColors(colors, mode, colorsReset);
    let newIdCounter = idCounter;
    const newColorBlocks: ColorBlock[] = newHSLColors.map((hsl) => {
      const rgb = hslToRGB(hsl[0], hsl[1], hsl[2]);
      const lum = calculateLuminance(rgb.r, rgb.g, rgb.b);
      return {
        id: newIdCounter++,
        color: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
        luminance: lum,
        status: status,
        colorFormat: "hsl",
        compliantColors: {
          AA_RegularText: [],
          AAA_RegularText: [],
          AA_UIComponents: [],
        },
      };
    });

    let updatedColors = [...colors, ...newColorBlocks];
    updatedColors = recalculateCompliance(updatedColors);

    setColors(updatedColors);
    updateSearchParams(updatedColors);
    setIdCounter(newIdCounter);
    setColorsReset(false);
  }, [
    colors,
    mode,
    colorsReset,
    recalculateCompliance,
    setColors,
    updateSearchParams,
    setIdCounter,
  ]);

  useEffect(() => {
    if (colorsReset && colors.length === 0) {
      makeColorPalette();
    }
  }, [colorsReset, colors]);

  return {
    colors,
    setColors,
    setColorsReset,
    addColor,
    removeColor,
    updateColor,
    resetColors,
    clearColors,
    currentColor,
    setCurrentColor,
    mode,
    setMode,
    makeColorPalette,
    updateSearchParams,
  };
};

export default useAccessibleColors;
