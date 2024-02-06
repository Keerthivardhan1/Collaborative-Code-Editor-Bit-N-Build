"use client"
// import React, { useRef, useEffect } from 'react';
// import CodeMirror from 'codemirror';
// import * as Y from 'yjs';
// import { WebrtcProvider } from 'y-webrtc';
// import { CodemirrorBinding } from 'y-codemirror.next';
// import '@codemirror/language';

// export default function CodemirrorEditor() {
//     const editorRef = useRef(null);

//     useEffect(() => {
//       if (editorRef.current) return; // Skip setup on first renderif()
//         if(editorRef === null) return;
//         if (!editorRef.current) return;

//         const ydoc = new Y.Doc();
//         const provider = new WebrtcProvider('test-room', ydoc);
//         const yText = ydoc.getText('codemirror');

//         const editor = CodeMirror(editorRef.current, {
//             mode: 'javascript',
//             lineNumbers: true
//         });

//         const binding = new CodemirrorBinding(yText, editor, provider.awareness);

//         return () => {
//             // Cleanup
//             binding.destroy();
//             provider.disconnect();
//         };
//     }, []);

//     return <div ref={editorRef}></div>;
// }


import { useEffect } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { yCollab } from 'y-codemirror.next';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';
import * as random from 'lib0/random';

export default function CodeMirrorEditor() {
  let view = null
    useEffect(() => {
      if(view  != null) return
        const usercolors = [
            { color: '#30bced', light: '#30bced33' },
            { color: '#6eeb83', light: '#6eeb8333' },
            { color: '#ffbc42', light: '#ffbc4233' },
            { color: '#ecd444', light: '#ecd44433' },
            { color: '#ee6352', light: '#ee635233' },
            { color: '#9ac2c9', light: '#9ac2c933' },
            { color: '#8acb88', light: '#8acb8833' },
            { color: '#1be7ff', light: '#1be7ff33' }
        ];

        // select a random color for this user
        const userColor = usercolors[random.uint32() % usercolors.length];

        const ydoc = new Y.Doc();
        const provider = new WebrtcProvider('codemirror6-demo-room', ydoc);
        const ytext = ydoc.getText('codemirror');

        const undoManager = new Y.UndoManager(ytext);

        provider.awareness.setLocalStateField('user', {
            name: 'Anonymous ' + Math.floor(Math.random() * 100),
            color: userColor.color,
            colorLight: userColor.light
        });

        const state = EditorState.create({
            doc: ytext.toString(),
            extensions: [
                basicSetup,
                javascript(),
                yCollab(ytext, provider.awareness, { undoManager })
            ]
        });

         view = new EditorView({
            state,
            parent: document.querySelector('#editor')
        });

        // Cleanup function
        return () => {
            view.destroy();
            provider.destroy();
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return <div id="editor" />;
}
