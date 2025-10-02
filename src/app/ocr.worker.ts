import Ocr from "../ocr-browser";

let ocrInstance: Ocr | null = null;

onmessage = async (event) => {
  const { imagePath } = event.data;

  try {
    console.time("ocr");
    if (!ocrInstance) {
      ocrInstance = await Ocr.create({
        models: {
          detectionPath: "/mobile_det.onnx",
          recognitionPath: "/mobile_rec.onnx",
          dictionaryPath: "/ppocrv5_dict.txt",
        },
      });
    }

    // Process the image
    const result = await ocrInstance.detect(imagePath);
    const text = result.map((r) => r.text).join("\n");

    postMessage({ text });
  } catch (err) {
    postMessage({ error: err instanceof Error ? err.message : String(err) });
  }
};
