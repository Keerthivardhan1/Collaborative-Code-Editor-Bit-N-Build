"use client"
import { Editor } from "@monaco-editor/react"
import {useRef} from 'react'
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"
import * as random from 'lib0/random';

export default function MonacoEditor2() {

  const editorRef = useRef(null)
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


  function handleEditorDidMount(editor , monaco) {
    const userColor = usercolors[random.uint32() % usercolors.length];
    editorRef.current = editor;

    const doc = new Y.Doc();

    const provider = new WebrtcProvider("test-room2" , doc);
    provider.awareness.setLocalStateField('user', {
      name: 'Anonymous ' + Math.floor(Math.random() * 100),
      color: userColor.color,
      colorLight: userColor.light
  });

    const type = doc.getText("monaco");

    const binding = new MonacoBinding(type,editorRef.current.getModel() , new Set([editorRef.current]) , provider.awareness)


  }

  return (
    <Editor
    height="100%"
    width="100%"
    theme= "vs-dark"  
    language="javascript"
    onMount = {handleEditorDidMount}
    />
  )
}
