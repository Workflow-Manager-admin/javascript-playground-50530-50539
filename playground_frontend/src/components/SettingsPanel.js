import React from "react";

/**
 * PUBLIC_INTERFACE
 * SettingsPanel for toggling future advanced options (stub for now).
 */
function SettingsPanel({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <strong>Settings</strong>
        <button className="settings-close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="settings-body">
        <label>
          {/* Expand with user settings in the future */}
          <span style={{ color: 'var(--text-secondary)' }}>
            No extra settings yet.
          </span>
        </label>
      </div>
    </div>
  );
}

export default SettingsPanel;
