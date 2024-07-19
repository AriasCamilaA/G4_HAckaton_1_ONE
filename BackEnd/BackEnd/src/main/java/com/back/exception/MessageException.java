package com.back.exception;

import java.net.http.HttpHeaders;
import java.time.LocalDateTime;

public record MessageException(
        LocalDateTime timestamp,
        String message,
        String headers
) {
}
