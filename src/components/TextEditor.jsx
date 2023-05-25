import React, { useContext, useEffect, useRef, useState } from 'react';

// * codemirror
import CodeMirror from 'codemirror';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/lib/codemirror.css';
import './Editor.css';

// * context
import { RegexCtx } from '../context/RegexContextProvider';

const TextEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [text, setText] = useState('sina bayan');
  const { regex } = useContext(RegexCtx);

  useEffect(() => {
    if (!editorRef.current || editorInstance.current) return;

    const editor = CodeMirror(editorRef.current);
    editorInstance.current = editor;
    editor.on('change', e => setText(e.getValue()));
  }, [editorRef.current, editorInstance.current]);

  useEffect(() => {
    if (!editorInstance.current || !regex) return;

    const editor = editorInstance.current;
    const doc = editor.getDoc();
    const allMarkers = editor.getAllMarks();
    let searchRegex;

    if (allMarkers && allMarkers.length > 0)
      allMarkers.forEach(marker => marker.clear());

    try {
      searchRegex = new RegExp(regex, 'gi');
    } catch (err) {
      return;
    }

    let cursor = editor.getSearchCursor(searchRegex);
    while (cursor.findNext()) {
      const from = cursor.from(),
        to = cursor.to();

      doc.markText(
        { line: from.line, ch: from.ch },
        { line: to.line, ch: to.ch },
        { className: 'highlighted-text' }
      );
    }
  }, [text, regex, editorInstance.current]);

  return (
    <div className='editor-container bg-blue-200 p-5'>
      <div ref={editorRef} className='editor text-editor' />
    </div>
  );
};

export default TextEditor;
