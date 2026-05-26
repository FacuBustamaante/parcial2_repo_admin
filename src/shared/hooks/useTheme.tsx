import { useState, useEffect } from 'react'

export function useTheme() {
   const [theme, setTheme] = useState(() => {
      // Leer del localStorage, o usar 'dark' como default (ya que tu web es dark)
      return localStorage.getItem('theme') ?? 'dark'
   })

   useEffect(() => {
      const root = document.documentElement
      if (theme === 'dark') {
         root.classList.add('dark')
      } else {
         root.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
   }, [theme])

   const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

   return { theme, toggleTheme }
}