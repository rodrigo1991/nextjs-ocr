import * as ort from "onnxruntime-web";
import Ocr, { registerBackend } from "../ocr-common";
import { splitIntoLineImages } from "../ocr-common/backend/splitIntoLineImages";
import { FileUtils } from "./FileUtils";
import { ImageRaw } from "./ImageRaw";

registerBackend({
  FileUtils,
  ImageRaw,
  InferenceSession: ort.InferenceSession,
  splitIntoLineImages,
  defaultModels: undefined,
});

export * from "../ocr-common";
export default Ocr;
