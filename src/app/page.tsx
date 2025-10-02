"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Create worker once
    workerRef.current = new Worker(
      new URL("./ocr.worker.ts", import.meta.url),
      { type: "module" }
    );

    workerRef.current.onmessage = (event) => {
      const { text, error } = event.data;
      if (error) console.error(error);
      else setOcrResult(text);

      setLoading(false);
    };

    return () => {
      // cleanup on component unmount
      workerRef.current?.terminate();
    };
  }, []);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    setLoading(true);

    // Convert the file into an object URL so worker can load it
    const imageUrl = URL.createObjectURL(file);
    workerRef.current?.postMessage({ imagePath: imageUrl });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
        className="block"
      />

      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}

      {/* Second button renamed */}
      <button
        onClick={() => console.log("second button clicked")}
        className="relative rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 flex items-center justify-center gap-2"
      >
        Non blocking UI Button
      </button>

      {/* OCR results */}
      {ocrResult && (
        <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm w-full max-w-xl overflow-auto">
          {ocrResult}
        </pre>
      )}

      {/* Non-blocking UI input */}
      <input
        type="text"
        placeholder="non blocking ui"
        className="border px-3 py-2 rounded w-full max-w-sm text-black"
      />
    </div>
  );
}
