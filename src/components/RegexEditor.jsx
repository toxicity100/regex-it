import { useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';

// * codemirror
import CodeMirror from 'codemirror';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/lib/codemirror.css';
import './Editor.css';
import './RegexEditor.css';

// * hooks
import useSwitch from '../hooks/useSwitch';
import useClickOutside from '../hooks/useClickOutside';

// * context
import { RegexCtx } from '../context/RegexContextProvider';

// * components
import Tooltip from './Tooltip';
import FlagsTooltip from './FlagsTooltip';

const RegexEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const endWidgetRef = useRef(null);
  const flagsButtonRef = useRef(null);
  const { regex, setRegex, flagsString, matchCount } = useContext(RegexCtx);
  const [shown, shownToggler] = useSwitch();
  useClickOutside(flagsButtonRef, () => shownToggler(false));
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

    endWidgetRef.current = endWidget;

    startWidget.className = 'editor-widget';
    endWidget.className = 'editor-widget';

    startWidget.innerHTML = '/';
    endWidget.innerHTML = '/' + flagsString;

    editor.addWidget({ line: 0, ch: 0 }, startWidget, true);
    editor.addWidget({ line: 0, ch: 0 }, endWidget, true);

    editor.on('change', editor => setRegex(editor.getValue()));
    editor.on('beforeChange', (_, change) => {
      if (change.text.length === 2 && change.text.join('') === '')
        return change.cancel();
    });
  }, [flagsString, editorRef.current, editorInstance.current]);

  useEffect(() => {
    if (!editorInstance.current) return;

    const editor = editorInstance.current;
    const doc = editor.getDoc();
    const marks = editor.getAllMarks();
    const regexes = [
      [/\(.*\)/g, 'regex-group'],
      [/\[[^\[\]]*]/g, 'regex-charset'],
      [/\\[WwDdSs]/g, 'regex-shorthand'],
      [/\\\d/g, 'regex-group-backreference'],
      [/\\[Bb]|\^|\$/g, 'regex-anchor'],
      [/[\*\+\?]|\{\d,?\d?}/g, 'regex-quantifier'],
      [/\\[^WwDdSs]|\\u[A-Fa-f0-9]{4}/g, 'regex-escaped-char'],
      [/\|/g, 'regex-alternator'],
    ];
    let cursor;

    regexes.forEach(([regex, className]) => {
      cursor = editor.getSearchCursor(regex);

      if (marks && marks.length > 0) marks.forEach(mark => mark.clear());

      while (cursor.findNext()) {
        const from = cursor.from(),
          to = cursor.to();

        doc.markText(
          { line: from.line, ch: from.ch },
          { line: to.line, ch: to.ch },
          { className }
        );
      }
    });
  }, [regex, editorInstance.current]);

  useEffect(() => {
    if (endWidgetRef.current)
      endWidgetRef.current.textContent = '/' + flagsString;
  }, [flagsString]);

  return (
    <section className='regex-editor-section'>
      <header className='section-header flex justify-between items-start'>
        <h2 className='title grow font-semibold mb-2'>
          JavaScript Regex - add debounce and throttle
        </h2>
        <button
          ref={flagsButtonRef}
          onClick={shownToggler}
          className='flag-button relative mr-4'
        >
          <img
            src='/flag.svg'
            alt='flag icon'
            className='flag-icon inline w-4 mr-1'
          />
          flags
          <Tooltip shown={shown}>
            <FlagsTooltip />
          </Tooltip>
        </button>
        <span
          className={clsx(
            'match-count text-sm text-white rounded-md px-3 pt-1 pb-1.5 -mt-0.5',
            matchCount === 0 ? 'bg-gray-500/60' : 'bg-gray-600'
          )}
        >
          {clsx(
            matchCount === 0 && 'no match',
            matchCount === 1 && '1 match',
            matchCount > 1 && [matchCount, 'matches']
          )}
        </span>
      </header>
      <div className='editor-container flex items-center justify-center border border-gray-300 pb-0.5'>
        <div ref={editorRef} className='editor regex-editor w-full' />
      </div>
    </section>
  );
};

export default RegexEditor;
