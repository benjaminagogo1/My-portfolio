"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { Accessibility, RotateCcw, Monitor, Moon, Sun } from "lucide-react";
import { MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Theme = "system" | "light" | "dark";
type Preferences = {
  theme: Theme;
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
};
type Snapshot = Preferences & { storageAvailable: boolean };
const defaults: Snapshot = {
  theme: "system",
  largeText: false,
  highContrast: false,
  reduceMotion: false,
  storageAvailable: true,
};
const storageKey = "benjamin-portfolio-accessibility";
let snapshot = defaults;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function apply(preferences: Preferences) {
  const root = document.documentElement;
  root.dataset.textSize = preferences.largeText ? "large" : "standard";
  root.dataset.contrast = preferences.highContrast ? "high" : "standard";
  root.dataset.motion = preferences.reduceMotion ? "reduced" : "system";
  const dark =
    preferences.theme === "dark" ||
    (preferences.theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const themeChanged = root.dataset.theme !== (dark ? "dark" : "light");
  if (themeChanged) root.dataset.themeChanging = "true";
  root.dataset.theme = dark ? "dark" : "light";
  root.style.colorScheme = dark ? "dark" : "light";
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) =>
      meta.setAttribute("content", dark ? "#101b16" : "#f9faf6"),
    );
  if (themeChanged) {
    // Commit the complete palette before restoring ordinary hover transitions.
    void root.offsetHeight;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        delete root.dataset.themeChanging;
      }),
    );
  }
}
function publish(next: Snapshot) {
  snapshot = next;
  apply(next);
  listeners.forEach((listener) => listener());
}
function readSavedPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    publish({
      theme:
        saved?.theme === "light" || saved?.theme === "dark"
          ? saved.theme
          : "system",
      largeText: saved?.largeText === true,
      highContrast: saved?.highContrast === true,
      reduceMotion: saved?.reduceMotion === true,
      storageAvailable: true,
    });
  } catch {
    publish({ ...defaults, storageAvailable: false });
  }
}
function updatePreferences(next: Preferences) {
  const preferences = {
    theme: next.theme,
    largeText: next.largeText,
    highContrast: next.highContrast,
    reduceMotion: next.reduceMotion,
  };
  let storageAvailable = true;
  try {
    localStorage.setItem(storageKey, JSON.stringify(preferences));
  } catch {
    storageAvailable = false;
  }
  publish({ ...preferences, storageAvailable });
}

const AccessibilityContext = createContext<Snapshot>(defaults);
export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const preferences = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => defaults,
  );
  useEffect(() => {
    readSavedPreferences();
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null)
        readSavedPreferences();
    };
    window.addEventListener("storage", sync);
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => {
      if (snapshot.theme === "system") apply(snapshot);
    };
    systemTheme.addEventListener("change", updateSystemTheme);
    return () => {
      window.removeEventListener("storage", sync);
      systemTheme.removeEventListener("change", updateSystemTheme);
    };
  }, []);
  return (
    <AccessibilityContext.Provider value={preferences}>
      <MotionConfig
        reducedMotion={preferences.reduceMotion ? "always" : "user"}
      >
        {children}
      </MotionConfig>
    </AccessibilityContext.Provider>
  );
}

const options = [
  {
    key: "largeText",
    name: "Larger text",
    description: "Increase reading text size throughout the site.",
  },
  {
    key: "highContrast",
    name: "Higher contrast",
    description: "Give text and boundaries stronger definition.",
  },
  {
    key: "reduceMotion",
    name: "Reduce motion",
    description: "Keep movement minimal, including scroll transitions.",
  },
] as const;

export function AccessibilityControls() {
  const preferences = useAccessibility();
  const changed =
    preferences.theme !== "system" ||
    preferences.largeText ||
    preferences.highContrast ||
    preferences.reduceMotion;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="display-control"
          aria-label="Display and accessibility"
          title="Display and accessibility"
        >
          <Accessibility size={20} aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent
        closeLabel="Close accessibility settings"
        className="accessibility-panel"
      >
        <DialogTitle className="accessibility-title">
          Display & accessibility
        </DialogTitle>
        <DialogDescription className="accessibility-introduction">
          Choose an appearance and reading preferences that feel comfortable for
          you.
        </DialogDescription>
        <fieldset
          className="appearance-controls"
          aria-describedby="appearance-help"
        >
          <legend>Appearance</legend>
          <div className="theme-options">
            {[
              { value: "system", name: "System", icon: Monitor },
              { value: "light", name: "Light", icon: Sun },
              { value: "dark", name: "Dark", icon: Moon },
            ].map(({ value, name, icon: Icon }) => (
              <label key={value} className="theme-option">
                <input
                  type="radio"
                  name="appearance"
                  value={value}
                  checked={preferences.theme === value}
                  onChange={() =>
                    updatePreferences({ ...preferences, theme: value as Theme })
                  }
                  className="sr-only"
                />
                <Icon size={17} aria-hidden="true" />
                <span>{name}</span>
              </label>
            ))}
          </div>
          <p id="appearance-help">
            System follows your device’s light or dark theme.
          </p>
        </fieldset>
        <div className="accessibility-options">
          {options.map((option) => (
            <label
              key={option.key}
              className="accessibility-option"
              htmlFor={`accessibility-${option.key}`}
            >
              <span>
                <span
                  id={`label-${option.key}`}
                  className="accessibility-option-name"
                >
                  {option.name}
                </span>
                <span
                  id={`help-${option.key}`}
                  className="accessibility-option-help"
                >
                  {option.description}
                </span>
              </span>
              <input
                id={`accessibility-${option.key}`}
                type="checkbox"
                checked={preferences[option.key]}
                aria-labelledby={`label-${option.key}`}
                aria-describedby={`help-${option.key}`}
                onChange={(event) =>
                  updatePreferences({
                    ...preferences,
                    [option.key]: event.target.checked,
                  })
                }
              />
            </label>
          ))}
        </div>
        <p className="accessibility-save-note" role="status">
          {preferences.storageAvailable
            ? "Preferences are saved in this browser."
            : "Changes apply now. This browser is not allowing preferences to be saved."}
        </p>
        <Button
          variant="outline"
          className="accessibility-reset"
          disabled={!changed}
          onClick={() => updatePreferences(defaults)}
        >
          <RotateCcw aria-hidden="true" /> Reset to defaults
        </Button>
        <p className="accessibility-keyboard-note">
          Use Tab to move between controls and Escape to close this panel.
        </p>
      </DialogContent>
    </Dialog>
  );
}
