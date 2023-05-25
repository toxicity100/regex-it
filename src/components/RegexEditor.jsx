import { useContext, useEffect, useRef } from 'react';

// * codemirror
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import './Editor.css';

// * context
import { RegexCtx } from '../context/RegexContextProvider';

const RegexEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const { regex, setRegex } = useContext(RegexCtx);
  const config = {
    value: regex,
    lineWrapping: false,
  };

  useEffect(() => {
    if (!editorRef.current || editorInstance.current) return;

    const editor = CodeMirror(editorRef.current, config);
    editorInstance.current = editor;

    const startWidget = document.createElement('span');
    const endWidget = document.createElement('span');

    startWidget.className = 'editor-widget';
    endWidget.className = 'editor-widget';

    startWidget.innerHTML = '/';
    endWidget.innerHTML = '/gi';

    editor.addWidget({ line: 0, ch: 0 }, startWidget, true);
    editor.addWidget({ line: 0, ch: 0 }, endWidget, true);
    editor.on('change', e => setRegex(e.getValue()));
    editor.on('beforeChange', (_, change) => {
      if (change.text.length === 2 && change.text.join('') === '')
        return change.cancel();
    });
  }, [editorRef.current, editorInstance.current]);

  return (
    <div className='editor-container flex items-center justify-center bg-red-200 p-5'>
      <div ref={editorRef} className='editor regex-editor w-full' />
    </div>
  );
};

export default RegexEditor;
