// Theme variables
import 'firebase/auth';
import 'firebase/database';
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../../firebase"
// Importing the dark use effect from tailwindcss


export default function useDarkSide() {

    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme]
}