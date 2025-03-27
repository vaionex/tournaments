"use client";
import { useState } from 'react';

export default function TestSimplePage() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="p-10 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Simple Test Page</h1>
      <p className="mb-4">This is a minimal test page with no complex components.</p>
      
      <div className="mb-4">
        <p>Counter: {counter}</p>
        <button 
          className="px-4 py-2 bg-blue-600 rounded mt-2"
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
      </div>
      
      <p>If you can see this page and use the counter, basic Next.js functionality is working.</p>
    </div>
  );
} 