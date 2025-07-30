import React from "react";

/**
 * PUBLIC_INTERFACE
 * CodeEditor is a simple textarea-based code editor with basic syntax highlighting for JS keywords.
 * For scalability, you may replace this with a more advanced editor later.
 * @param {object} props
 * @param {string} props.code - The code value in the editor.
 * @param {function} props.onChange - Callback triggered when code changes.
 * @param {string} props.theme - Current theme ("light" or "dark").
 * @returns JSX.Element
 */
function CodeEditor({ code, onChange, theme }) {
  // Basic JS keyword highlighting using regex (for demo/minimal package footprint).
  // Not production-grade but fits minimal requirements.
  function highlight(codeStr) {
    const keywords =
      /\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|true|false|null|undefined|new|class|try|catch|finally|throw)\b/g;
    return codeStr.replace(
      keywords,
      (match) => `<span class="ce-js-keyword">${match}</span>`
    );
  }

  return (
    <div className={`code-editor ${theme}`}>
      <pre
        className="code-highlight"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: highlight(code) || " " }}
      />
      <textarea
        className="code-input"
        aria-label="Javascript code editor"
        spellCheck={false}
        value={code}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        wrap="off"
      />
    </div>
  );
}

export default CodeEditor;
