package com.marigold.marigoldapi.ai.chat.rag;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.TextReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DocumentIngestionService implements ApplicationRunner {

    private static final String SOURCE_TAG = "knowledge-base";

    private final VectorStore vectorStore;
    private final ApplicationContext applicationContext;

    public DocumentIngestionService(VectorStore vectorStore, ApplicationContext applicationContext) {
        this.vectorStore = vectorStore;
        this.applicationContext = applicationContext;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!vectorStore.similaritySearch("marigold bank policy").isEmpty()) {
            return;
        }

        Resource[] resources = applicationContext.getResources("classpath:knowledge-base/*.md");
        TokenTextSplitter splitter = TokenTextSplitter.builder().build();

        for (Resource resource : resources) {
            TextReader reader = new TextReader(resource);
            reader.getCustomMetadata().put("docTitle", titleFrom(resource));
            reader.getCustomMetadata().put("source", SOURCE_TAG);

            List<Document> chunks = splitter.apply(reader.get());
            vectorStore.add(chunks);
        }
    }

    private String titleFrom(Resource resource) {
        String filename = resource.getFilename();
        return filename == null ? "unknown" : filename.replace(".md", "").replace("-", " ");
    }
}
