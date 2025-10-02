/* eslint-disable @typescript-eslint/no-explicit-any */
// model-worker.ts - SIMPLIFIED
import { Tensor } from "onnxruntime-common";

// We'll store the actual InferenceSession globally in the worker
let model: any = null;

onmessage = async (e: MessageEvent<any>) => {
  // First message: store the model reference
  if (e.data.type === "SET_MODEL") {
    model = e.data.model;
    return;
  }

  // Inference message
  if (e.data.type === "RUN") {
    const { inputName, outputName, modelData, onnxOptions } = e.data;

    if (!model) {
      postMessage({ error: "Model not set in worker" });
      return;
    }

    const inp = Float32Array.from(modelData.data);
    const input = new Tensor("float32", inp, [
      1,
      3,
      modelData.height,
      modelData.width,
    ]);

    const outputs = await model.run({ [inputName]: input }, onnxOptions);
    const output = outputs[outputName];

    postMessage({
      output: {
        data: output.data,
        dims: output.dims,
        type: output.type,
      },
    });
  }
};
