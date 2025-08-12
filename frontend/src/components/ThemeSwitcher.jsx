import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      document.documentElement.getAttribute("data-theme") ||
      "dark";
    setCurrentTheme(savedTheme);
  }, []);

  const changeTheme = (theme) => {
    if (theme === currentTheme) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  const capitalizeTheme = (theme) =>
    theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <div className="h-fit container mx-auto px-4 pt-10 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your application interface.
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => changeTheme(theme)}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors cursor-pointer
                ${
                  currentTheme === theme
                    ? "bg-base-200"
                    : "hover:bg-base-200/50"
                }
              `}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={theme}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {capitalizeTheme(theme)}
              </span>
            </button>
          ))}
        </div>

        {/* Only logged-in users see preview */}
        {user && (
          <div>
            <div className="divider"></div>

            <h3 className="text-lg font-semibold my-3">Preview</h3>
            <div className="mt-10 my-10 flex justify-center">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <UserCard user={user} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
