import React, { FC, useRef, useState, useEffect, useContext } from "react";
import styles from "./wordcloud.module.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { notify } from "../../reducers/notificationReducer";
import { ELanguages } from "../../types";
import { useTheme } from "../../hooks/useTheme";
import useWindowSize from "../../hooks/useWindowSize";
import { getRandomBetween } from "../../utils";
import { LanguageContext } from "../../contexts/LanguageContext";

interface Word {
  text: string;
  weight: number;
}

interface WordCloudProps {
  language: ELanguages;
  title?: string;
  onClick?: (text: string) => void;
  words: Word[];
  width?: number;
  height?: number;
}

let toggle = true;

const WordCloud: FC<WordCloudProps> = ({
  language,
  title,
  onClick,
  words,
  width = 600,
  height = 400,
}) => {
  const { t } = useContext(LanguageContext)!;

  const dispatch = useAppDispatch();
  const [placedWords, setPlacedWords] = useState<React.JSX.Element[]>([]);
  const lightMode = useTheme();
  const { windowWidth } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  // Function to calculate text width and height
  const calculateTextSize = (text: string, fontSize: number) => {
    const canvas = document?.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = `${fontSize}px Arial`;
      const metrics = context.measureText(text);
      const width = metrics.width + 2;
      const ascent = fontSize * 0.65; // for a tighter fit
      const descent = fontSize * 0.2;
      const height = ascent + descent;
      return { width, height, ascent, descent };
    }
    return { width: 0, height: 0, ascent: 0, descent: 0 };
  };

  const calculateBoundingBox = (word: Word, fontSize: number) => {
    const {
      width: textWidth,
      height: textHeight,
      ascent,
    } = calculateTextSize(word.text, fontSize);
    return { width: textWidth, height: textHeight, ascent };
  };

  const generateAdjacentPositions = (
    placedWordPos: { x: number; y: number; width: number; height: number },
    newWordBox: { width: number; height: number }
  ) => {
    const positions = [];

    const offsetWidth = newWordBox.width * getRandomBetween(0.2, 0.4); // newWordBox.width * getRandomBetween(-0.3, 0.3)
    const offsetHeight = newWordBox.height * 0.2; // newWordBox.height * getRandomBetween(-0.3, 0.3)

    // Top
    positions.push({
      x: placedWordPos.x + offsetWidth,
      y: placedWordPos.y - newWordBox.height,
    });

    // Bottom
    positions.push({
      x: placedWordPos.x + offsetWidth,
      y: placedWordPos.y + placedWordPos.height,
    });

    // Right
    positions.push({
      x: placedWordPos.x + placedWordPos.width,
      y: placedWordPos.y + offsetHeight,
    });

    // Top-Right
    positions.push({
      x: placedWordPos.x + placedWordPos.width - offsetWidth,
      y: placedWordPos.y - newWordBox.height,
    });

    // Bottom-Right
    positions.push({
      x: placedWordPos.x + placedWordPos.width - offsetWidth,
      y: placedWordPos.y + placedWordPos.height,
    });

    // Left
    positions.push({
      x: placedWordPos.x - newWordBox.width,
      y: placedWordPos.y + offsetHeight,
    });

    // Bottom-Left
    positions.push({
      x: placedWordPos.x - newWordBox.width,
      y: placedWordPos.y + placedWordPos.height,
    });

    // Top-Left
    if (windowWidth < 500)
      positions.push({
        x: placedWordPos.x - newWordBox.width,
        y: placedWordPos.y - newWordBox.height,
      });

    if (windowWidth < 500)
      positions.push({
        x: placedWordPos.x - offsetWidth,
        y: placedWordPos.y + placedWordPos.height * 2,
      });

    if (windowWidth < 500)
      positions.push({
        x: placedWordPos.x - offsetWidth,
        y: placedWordPos.y - placedWordPos.height * 2,
      });

    if (windowWidth < 500)
      positions.push({
        x: placedWordPos.x + offsetWidth,
        y: placedWordPos.y + placedWordPos.height * 3,
      });

    if (windowWidth < 500)
      positions.push({
        x: placedWordPos.x + offsetWidth,
        y: placedWordPos.y - placedWordPos.height * 3,
      });

    if (windowWidth < 500)
      positions.push({
        x: placedWordPos.x - offsetWidth,
        y: placedWordPos.y + placedWordPos.height * 3,
      });

    if (windowWidth < 500)
      positions.push({
        x: placedWordPos.x - offsetWidth,
        y: placedWordPos.y - placedWordPos.height * 3,
      });

    return positions;
  };

  // Function to check for overlaps
  const isOverlapping = (
    x: number,
    y: number,
    width: number,
    height: number,
    existingPositions: { x: number; y: number; width: number; height: number }[]
  ) => {
    return existingPositions.some((pos) => {
      return (
        x < pos.x + pos.width &&
        x + width > pos.x &&
        y < pos.y + pos.height &&
        y + height > pos.y
      );
    });
  };

  const handleWordClick = async (text: string) => {
    const textToCopy = text;

    if (onClick) {
      onClick(text);
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          dispatch(notify(t("CopiedToClipboard"), false, 3));
        },
        (error) => {
          dispatch(notify(`${t("FailedToCopy")}`, true, 3));
          console.error("Failed to copy:", error);
        }
      );
    } else {
      // Fallback method for older browsers
      const textArea = document?.createElement("textarea");
      textArea.value = textToCopy;
      ref.current?.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document?.execCommand("copy");
        dispatch(notify(t("CopiedToClipboard"), false, 3));
      } catch (error: any) {
        console.error("Failed to copy:", error);
        dispatch(notify(`${t("FailedToCopy")}`, true, 3));
      }
      ref.current?.removeChild(textArea);
    }
  };

  useEffect(() => {
    if (words.length === 0) {
      setPlacedWords([]);
      return;
    }

    const sortedWords = [...words].sort((a, b) => {
      if (b.weight !== a.weight) {
        return b.weight - a.weight;
      } else {
        return a.text.length - b.text.length;
      }
    });
    const newPositions: {
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];
    const newPlacedWords: React.JSX.Element[] = [];

    sortedWords.forEach((word, index) => {
      const fontSize = word.weight;
      const {
        width: textWidth,
        height: textHeight,
        ascent,
      } = calculateBoundingBox(word, fontSize);

      let placed = false;
      const maxAttempts = 30;
      let attempts = 0;

      // For the first word, place it at the center
      if (index === 0) {
        const x = (width - textWidth) / 2;
        const y = (height + ascent - textHeight) / 2;
        newPositions.push({ x, y, width: textWidth, height: textHeight });
        newPlacedWords.push(
          <text
            key={`${word.text}-${index}`}
            x={x}
            y={y + ascent}
            fontSize={fontSize}
            fontFamily="Arial, sans-serif"
            fill={`hsl(${(index * 110) % 360}, 100%, ${
              lightMode ? "20" : "70"
            }%)`}
            className={styles.word}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleWordClick(word.text);
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleWordClick(word.text);
              }
            }}
            aria-label={title ?? `${t("CopyToClipboard")}: ${word.text}`}
          >
            {word.text}
          </text>
        );
        placed = true;
      }

      while (!placed && attempts < maxAttempts) {
        // Iterate through placed words to find adjacent positions
        for (let i = 0; i < newPositions.length && !placed; i++) {
          const placedWordPos = newPositions[i];
          const adjacentPositions = generateAdjacentPositions(placedWordPos, {
            width: textWidth,
            height: textHeight,
          });

          for (let pos of adjacentPositions) {
            const candidatePos = {
              x: pos.x,
              y: pos.y,
              width: textWidth,
              height: textHeight,
            };

            // Check boundaries
            if (
              candidatePos.x < 0 ||
              candidatePos.y < 0 ||
              candidatePos.x + candidatePos.width > width ||
              candidatePos.y + candidatePos.height > height
            ) {
              continue;
            }

            // Check for overlaps
            if (
              !isOverlapping(
                candidatePos.x,
                candidatePos.y,
                candidatePos.width,
                candidatePos.height,
                newPositions
              )
            ) {
              // Position is valid
              newPositions.push(candidatePos);
              newPlacedWords.push(
                <text
                  key={`${word.text}-${index}`}
                  x={candidatePos.x}
                  y={candidatePos.y + ascent}
                  fontSize={fontSize}
                  fontFamily="Arial, sans-serif"
                  fill={`hsl(${(index * 110) % 360}, 100%, ${
                    lightMode ? "20" : "70"
                  }%)`}
                  style={{ cursor: "pointer" }}
                  className={styles.word}
                  onClick={() => handleWordClick(word.text)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleWordClick(word.text);
                    }
                  }}
                  aria-label={title ?? `${t("CopyToClipboard")}: ${word.text}`}
                >
                  {word.text}
                </text>
              );
              placed = true;
              break;
            }
          }
        }
        attempts++;
      }

      // Optional: Handle words that couldn't be placed
      if (!placed) {
        console.warn(
          `Could not place word after ${attempts} attempts:: ${word.text}`
        );
      }
    });

    setPlacedWords(newPlacedWords);
  }, [words, width, height, language, lightMode, dispatch]);

  return (
    <div ref={ref} className={styles["cloud-wrap"]}>
      <svg width={width} height={height} className={styles.cloud}>
        {placedWords}
      </svg>
    </div>
  );
};

export default WordCloud;
