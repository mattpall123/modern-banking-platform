CREATE TABLE ai_interaction_log (
    id BIGSERIAL PRIMARY KEY,
    user_email VARCHAR(255),
    feature VARCHAR(50) NOT NULL,
    prompt TEXT NOT NULL,
    response TEXT,
    flagged BOOLEAN NOT NULL DEFAULT false,
    flag_reason VARCHAR(255),
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    latency_ms BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_interaction_log_created_at ON ai_interaction_log(created_at DESC);
CREATE INDEX idx_ai_interaction_log_flagged ON ai_interaction_log(flagged);
