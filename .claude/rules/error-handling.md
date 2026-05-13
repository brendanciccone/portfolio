# Error Handling

## Boundaries Only
- Don't wrap code in `try`/`catch` unless it's at a real boundary: external API calls, user input parsing, file I/O, database queries
- Internal function calls between trusted code should not be wrapped
- Let errors propagate to the boundary where you can do something useful

## Never Swallow Errors
- No empty `catch` blocks
- No catch-and-return-null
- No catch-and-log-and-continue — these hide real failures
- If you catch, either handle meaningfully, rethrow, or rethrow as a more specific error

## No Silent Fallbacks
- Returning a default value when an operation fails masks the failure
- Error responses need enough context to diagnose the issue

## Loops
- Never catch-and-continue in loops if an iteration fails in a way that indicates bad state
