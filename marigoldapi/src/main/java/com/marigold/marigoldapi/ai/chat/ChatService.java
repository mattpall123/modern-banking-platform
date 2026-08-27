package com.marigold.marigoldapi.ai.chat;

import com.marigold.marigoldapi.ai.chat.tools.AccountTools;
import com.marigold.marigoldapi.ai.chat.tools.TransactionTools;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private static final String SYSTEM_PROMPT = """
            You are Marigold Bank's customer support assistant. You can answer
            questions about the customer's own accounts and transactions using
            the tools available to you, and answer general policy/FAQ questions
            using the retrieved context provided to you. You cannot move money
            or make changes to any account. If you don't know something and it
            isn't in your tools or context, say so instead of guessing.
            """;

    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder chatClientBuilder,
                        VectorStore vectorStore,
                        AccountTools accountTools,
                        TransactionTools transactionTools) {
        QuestionAnswerAdvisor questionAnswerAdvisor = QuestionAnswerAdvisor.builder(vectorStore)
                .searchRequest(SearchRequest.builder().topK(4).build())
                .build();

        this.chatClient = chatClientBuilder
                .defaultSystem(SYSTEM_PROMPT)
                .defaultAdvisors(questionAnswerAdvisor)
                .defaultTools(accountTools, transactionTools)
                .build();
    }

    public String reply(String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }
}
