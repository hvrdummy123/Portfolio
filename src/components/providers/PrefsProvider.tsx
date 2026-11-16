"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Role } from "@/content/data/types";
import { siteConfig } from "@/content/data/site.config";

type Theme = "light" | "dark";

type Prefs = {
  theme: Theme;
  role: Role;
  cursorCat: boolean;
  sound: boolean;
  reducedMotion: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setRole: (r: Role) => void;
  setCursorCat: (v: boolean) => void;
  setSound: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
};

const PrefsContext = createContext<Prefs | null>(null);
const ROLE_KEY = "hr-role";
const THEME_KEY = "hr-theme";
const CAT_KEY = "hr-cursor-cat";
const SOUND_KEY = "hr-sound";
const MOTION_KEY = "hr-reduced-motion";

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [role, setRoleState] = useState<Role>("backend");
  const [cursorCat, setCursorCatState] = useState(false);
  const [sound, setSoundState] = useState(false);
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    setThemeState(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    const storedRole = localStorage.getItem(ROLE_KEY) as Role | null;
    if (storedRole) setRoleState(storedRole);

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const storedCat = localStorage.getItem(CAT_KEY);
    setCursorCatState(
      storedCat !== null
        ? storedCat === "1"
        : isMobile
          ? siteConfig.featureFlags.cursorCatDefaultMobile
          : siteConfig.featureFlags.cursorCatDefaultDesktop,
    );

    const storedSound = localStorage.getItem(SOUND_KEY);
    setSoundState(storedSound === "1");

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const storedMotion = localStorage.getItem(MOTION_KEY);
    const nextReduce = storedMotion !== null ? storedMotion === "1" : prefersReduce;
    setReducedMotionState(nextReduce);
    document.documentElement.classList.toggle("reduce-motion", nextReduce);

    setReady(true);

    // Easter: console hire-me
    console.log(
      `%c /\\_/\\  \n( o.o )  hire me → ${siteConfig.email}\n > ^ <  `,
      "font-family:monospace;color:#B8456F;font-size:12px;",
    );
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    localStorage.setItem(ROLE_KEY, r);
  }, []);

  const setCursorCat = useCallback((v: boolean) => {
    setCursorCatState(v);
    localStorage.setItem(CAT_KEY, v ? "1" : "0");
  }, []);

  const setSound = useCallback((v: boolean) => {
    setSoundState(v);
    localStorage.setItem(SOUND_KEY, v ? "1" : "0");
  }, []);

  const setReducedMotion = useCallback((v: boolean) => {
    setReducedMotionState(v);
    localStorage.setItem(MOTION_KEY, v ? "1" : "0");
    document.documentElement.classList.toggle("reduce-motion", v);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      role,
      cursorCat,
      sound,
      reducedMotion,
      setTheme,
      toggleTheme,
      setRole,
      setCursorCat,
      setSound,
      setReducedMotion,
    }),
    [
      theme,
      role,
      cursorCat,
      sound,
      reducedMotion,
      setTheme,
      toggleTheme,
      setRole,
      setCursorCat,
      setSound,
      setReducedMotion,
    ],
  );

  return (
    <PrefsContext.Provider value={value}>
      <div data-prefs-ready={ready ? "1" : "0"}>{children}</div>
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used within PrefsProvider");
  return ctx;
}
