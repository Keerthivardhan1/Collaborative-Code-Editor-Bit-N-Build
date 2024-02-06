import Editor from '@/components/MonacoEditor2'
import React from 'react'

export default function collaborativeEditor() {
  return (
    <main className="flex">
        <section></section>
        <section className="lg:w-[80vw] lg:h-[90vh] "  >
            <Editor/>
        </section>
    </main>
  )
}
