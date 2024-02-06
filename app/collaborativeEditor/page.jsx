import dynamic from 'next/dynamic';
import React from 'react';

const DynamicEditor = dynamic(() => import('@/components/MonacoEditor2'), {
  ssr: false // Disable server-side rendering
});

export default function CollaborativeEditor() {
  return (
    <main className="flex">
        <section></section>
        <section className="lg:w-[80vw] lg:h-[90vh]">
            <DynamicEditor />
        </section>
    </main>
  );
}

