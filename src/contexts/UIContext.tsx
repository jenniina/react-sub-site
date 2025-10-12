import {
  createContext,
  useState,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { isTouchDevice } from "../hooks/useDraggable";
import { useTheme } from "../hooks/useTheme";
import { useScrollbarWidth } from "../hooks/useScrollbarWidth";
import { ELanguages, RefObject } from "../types";

interface UIContextProps {
  menuStyleAltTransform: boolean;
  setMenuStyleAltTransform: Dispatch<SetStateAction<boolean>>;
  touchDevice: boolean;
  lightTheme: boolean;
}

export const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider: FC<{
  language: ELanguages;
  menuStyle: RefObject<{ getStyle: () => boolean }>;
  children: ReactNode;
}> = ({ language, menuStyle, children }) => {
  const [menuStyleAltTransform, setMenuStyleAltTransform] = useState(false);
  const touchDevice = isTouchDevice();
  const lightTheme = useTheme();
  const scrollbarWidth = useScrollbarWidth();
  const styleInnerWrap: React.CSSProperties = {
    ["--scrollbar_width" as string]: `${scrollbarWidth}px`,
  };

  // Update menuStyleAltTransform when lightTheme changes
  useEffect(() => {
    setMenuStyleAltTransform(false);
    const timer = setTimeout(() => {
      setMenuStyleAltTransform(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [lightTheme]);

  //So transformations don't take place when changing menu style or toggling light/dark mode:
  useEffect(() => {
    setMenuStyleAltTransform(false);
    setTimeout(() => {
      setMenuStyleAltTransform(true);
    }, 300);
  }, [lightTheme, menuStyle.current]);

  return (
    <UIContext.Provider
      value={{
        menuStyleAltTransform,
        setMenuStyleAltTransform,
        touchDevice,
        lightTheme,
      }}
    >
      <div
        className={`App ${lightTheme ? "light" : ""} ${
          touchDevice ? "touch" : ""
        }  ${menuStyleAltTransform ? `transformations` : ""} ${language}`}
      >
        <div className="App-inner-wrap" style={styleInnerWrap}>
          {children}
        </div>
      </div>
    </UIContext.Provider>
  );
};
