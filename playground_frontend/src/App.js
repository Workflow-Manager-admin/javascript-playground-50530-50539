import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import CodeEditor from "./components/CodeEditor";
import OutputPanel from "./components/OutputPanel";
import SettingsPanel from "./components/SettingsPanel";

/**
 * PUBLIC_INTERFACE
 * Main Playground App Component
 * - Layout: Top nav, two-column (editor left, output/console right)
 * - Color/theme toggling
 * - Code execution with log/error handling
 * - Settings and minimalistic, modern design
 */
function App() {
  // App state
  const [theme, setTheme] = useState("light");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [code, setCode] = useState(
    "// Write Javascript code here!\nconsole.log('Hello, Kavia!');"
  );
  const [output, setOutput] = useState([]);
  const [errors, setErrors] = useState([]);
  const [logs, setLogs] = useState([]);
  const codeRef = useRef();
  const debounceTimer = useRef();

  // Effect: apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Effect: execute code in real time (with debounce)
  useEffect(() => {
    // Debounce execution for typing delay
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      executeCode(code);
    }, 350);
    // Cleanup
    return () => clearTimeout(debounceTimer.current);
    // eslint-disable-next-line
  }, [code]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  // PUBLIC_INTERFACE
  const openSettings = () => setSettingsOpen(true);
  // PUBLIC_INTERFACE
  const closeSettings = () => setSettingsOpen(false);

  // PUBLIC_INTERFACE
  // Executes user code and captures output/errors/logs in a sandboxed way.
  function executeCode(jsCode) {
    // Buffers for output, errors, logs
    const newOutput = [];
    const newErrors = [];
    const newLogs = [];

    // Custom log object to intercept output
    const customConsole = {
      log: (...args) => {
        newLogs.push(args.join(" "));
      },
    };

    try {
      // eslint-disable-next-line no-new-func
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const fn = new AsyncFunction("console", jsCode);
      Promise.resolve(fn(customConsole)).then(
        (result) => {
          if (typeof result !== "undefined") newOutput.push(String(result));
          setOutput(newOutput);
          setErrors(newErrors);
          setLogs(newLogs);
        },
        (err) => {
          newErrors.push(String(err));
          setErrors(newErrors);
          setOutput(newOutput);
          setLogs(newLogs);
        }
      );
    } catch (err) {
      newErrors.push(String(err));
      setErrors(newErrors);
      setOutput(newOutput);
      setLogs(newLogs);
    }
  }

  return (
    <div className="App playground-root">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <span className="nav-title" style={{ color: "#f7df1e" }}>
          <strong>Javascript Playground</strong>
        </span>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button className="settings-btn" onClick={openSettings}>
            ⚙️ Settings
          </button>
        </div>
      </nav>
      {/* Main Split Layout */}
      <div className="playground-main">
        {/* Left: Code Editor */}
        <section className="editor-section">
          <CodeEditor
            code={code}
            onChange={setCode}
            theme={theme}
            ref={codeRef}
          />
        </section>
        {/* Right: Output + Console */}
        <section className="output-section">
          <OutputPanel output={output} errors={errors} logs={logs} />
        </section>
      </div>
      {/* Settings Drawer */}
      <SettingsPanel show={settingsOpen} onClose={closeSettings} />
    </div>
  );
}

export default App;
