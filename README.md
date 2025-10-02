# OCR Browser (Worker-Friendly Fork)

This project is a fork(ish) of [@guteneye/ocr-browser](https://www.npmjs.com/package/@guteneye/ocr-browser), modified to run **OCR in a Web Worker** so that image processing **does not block the main UI thread**.

## Key Differences from the Original

- Original `@guteneye/ocr-browser` runs entirely on the main thread using `Image` objects.
- This fork replaces the image loading and processing code with `fetch` + `createImageBitmap` to work in **worker threads**.
- OCR models are now loaded **once** in the worker and reused across multiple requests.
- The UI remains fully responsive while processing images.
- Compatible with modern browsers and **Next.js / React apps** using module workers.

## Usage

1. **Create a Worker in the Main Thread**

   Create a worker and send image paths to it. The worker will handle OCR and send back the recognized text.

2. **Worker Initialization**

   In the worker file, create the OCR instance **once** and reuse it for multiple images. The worker listens for messages containing image paths, processes them, and posts the results back.

3. **Handling Results**

   The main thread receives messages from the worker containing either the OCR text or an error message. You can update the UI or log errors accordingly.

## Features

- Non-blocking UI using Web Workers.
- Reuses OCR models for multiple image inputs.
- Supports modern ONNX-based detection and recognition models.
- Compatible with file inputs, drag-and-drop, or dynamic image URLs.

## Notes

- This fork is intended for developers who want to run OCR in **React, Next.js, or browser apps** without freezing the main thread.
- For best performance, images are loaded and decoded using `createImageBitmap` in the worker.
- You can still use file inputs or dynamic URLs—no changes are required for different image sources.
