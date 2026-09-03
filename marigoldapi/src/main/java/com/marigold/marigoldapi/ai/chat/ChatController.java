package com.marigold.marigoldapi.ai.chat;

import com.marigold.marigoldapi.ai.RateLimiter;
import com.marigold.marigoldapi.security.CurrentUserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai/chat")
public class ChatController {

    private final ChatService chatService;
    private final RateLimiter rateLimiter;
    private final CurrentUserService currentUserService;

    public ChatController(ChatService chatService, RateLimiter rateLimiter, CurrentUserService currentUserService) {
        this.chatService = chatService;
        this.rateLimiter = rateLimiter;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    public ChatResponse chat(@Valid @RequestBody ChatRequest request) {
        rateLimiter.checkAndRecord(currentUserService.getCurrentEmail());
        return new ChatResponse(chatService.reply(request.message()));
    }
}
