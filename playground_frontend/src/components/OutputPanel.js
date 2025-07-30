import React from "react";

/**
 * PUBLIC_INTERFACE
 * OutputPanel displays output, errors, and logs from code execution.
 * @param {object} props
 * @param {string[]} props.output - Ordered list of output lines.
 * @param {string[]} props.errors - Ordered list of error lines.
 * @param {string[]} props.logs - Ordered list of console logs.
 */
function OutputPanel({ output = [], errors = [], logs = [] }) {
  return (
    <div className="output-panel">
      <h3>Output</h3>
      <pre className="output-text">
        {output.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </pre>
      <h3>Console / Logs</h3>
      <pre className="console-text">
        {logs.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        {errors.map((err, idx) => (
          <div key={`err-${idx}`} className="error-text">
            {err}
          </div>
        ))}
      </pre>
    </div>
  );
}

export default OutputPanel;
