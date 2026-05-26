// src/components/ThemeToggle.jsx
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
   const { theme, toggleTheme } = useTheme()

   return (
      <button
         onClick={toggleTheme}
         aria-label="Toggle theme"
         className="p-2 rounded-lg bg-(--surface-3) dark:bg-(--amber) text-zinc-800  transition-colors"
      >
         {theme === 'dark' ? '☀️' : '🌙'}
      </button>
   )
}