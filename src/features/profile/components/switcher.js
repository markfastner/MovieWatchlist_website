import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import DarkMode from "../../../features/profile/components/darkMode";

// switching component for dark mode and light mode
// using the dark mode hook from the darkMode.js file
// and the DarkModeSwitch from the react-toggle-dark-mode package so we can switch from sun and moon with a transition
export default function Switcher() {
    const [colorTheme, setTheme] = DarkMode();
    const [darkMode, setDarkMode] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkMode(checked);
    };

    
    
    return (
        <>
            <DarkModeSwitch
                style={{ marginBottom: "2rem" }}
                checked={darkMode}
                onChange={toggleDarkMode}
                size={30}
            />
        </>
    );
}