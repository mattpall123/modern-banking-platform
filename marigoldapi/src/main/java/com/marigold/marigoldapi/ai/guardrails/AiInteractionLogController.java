package com.marigold.marigoldapi.ai.guardrails;

import com.marigold.marigoldapi.domain.repository.AiInteractionLogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai/audit")
public class AiInteractionLogController {

    private final AiInteractionLogRepository repository;

    public AiInteractionLogController(AiInteractionLogRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Page<AiInteractionLogResponse> list(@RequestParam(defaultValue = "false") boolean flaggedOnly,
                                                Pageable pageable) {
        Page<com.marigold.marigoldapi.domain.model.AiInteractionLog> page = flaggedOnly
                ? repository.findByFlaggedTrueOrderByCreatedAtDesc(pageable)
                : repository.findAllByOrderByCreatedAtDesc(pageable);
        return page.map(AiInteractionLogResponse::from);
    }
}
