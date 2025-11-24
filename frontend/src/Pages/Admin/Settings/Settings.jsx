import { useState, useEffect } from "react";
import { saveSettings, getSettings } from "../api/adminAPI";
import "./Settings.css";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  // Load saved settings on mount
  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const settings = await getSettings();
      if (settings.theme) setTheme(settings.theme);
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    await saveSettings({ theme });
    alert("Settings saved!");
  };

  return (
    <div className="settings-container">
      <h2>Admin Settings</h2>

      {loading ? (
        <p>Loading settings...</p>
      ) : (
        <div className="settings-form">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <button onClick={handleSave}>Save Settings</button>
        </div>
      )}
    </div>
  );
}
