import Ocr, { registerBackend } from "../ocr-common";
import { splitIntoLineImages } from "../ocr-common/backend/splitIntoLineImages";
import { InferenceSession } from "onnxruntime-web";
import { FileUtils } from "./FileUtils";
import { ImageRaw } from "./ImageRaw";

registerBackend({
  FileUtils,
  ImageRaw,
  InferenceSession,
  splitIntoLineImages,
  defaultModels: undefined,
});

export * from "../ocr-common";
export default Ocr;
