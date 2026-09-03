package com.marigold.marigoldapi.buildtools;

import org.springframework.ai.transformers.TransformersEmbeddingModel;

// Run only at Docker build time to pre-download the ONNX model and PyTorch native
// libs into the image, so the deployed container never needs network access to boot.
public class EmbeddingModelWarmup {

    public static void main(String[] args) throws Exception {
        try (TransformersEmbeddingModel model = new TransformersEmbeddingModel()) {
            model.setResourceCacheDirectory(args[0]);
            model.afterPropertiesSet();
            model.embed("warmup");
            System.out.println("Embedding model warmup complete.");
        }
    }
}
