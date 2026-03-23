---
description: Enforce strict TypeScript type safety to prevent runtime errors and subtle bugs
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Type Safety

This project uses `strict: true` in tsconfig. All new code must uphold that strictness — no shortcuts that shift errors from compile time to runtime.

## Hard Rules

1. **Never use `any`** — use `unknown` and narrow with type guards, Zod parsing, or conditional checks. If you inherit `any` from a third-party API, cast to `unknown` first, then narrow.
2. **Never use `as` type assertions to silence errors** — assertions like `as SomeType` bypass the compiler. Use them only when the type system genuinely cannot infer the correct type (e.g., Supabase `.single()` results), and add a comment explaining why.
3. **Never use `!` non-null assertions** — handle `null`/`undefined` explicitly with early returns, optional chaining, or nullish coalescing.
4. **Never use `@ts-ignore` or `@ts-expect-error`** — fix the underlying type issue instead.
5. **Never use `eslint-disable` as a typing shortcut** — fix the type issue first. If a suppression is truly unavoidable, keep it as narrow as possible and document why inline.

## External Data Boundaries

Data from outside the TypeScript boundary (API responses, JSON parsing, query params, form data, database results) is **untrusted** and must be validated before use.

- **API responses**: Parse with Zod or a type guard before accessing properties. Typed HTTP helpers with generics are fine when the caller knows the shape, but any user-facing or security-critical data should be validated.
- **`JSON.parse()`**: The return type is `any`. Immediately assign to `unknown` and validate.
- **URL search params**: Always treat as `string | null`. Parse numbers with `Number()` and check `Number.isFinite()`. Never trust a query param as an identifier without auth verification.
- **Supabase query results**: Check `.error` before accessing `.data`. Type the expected row shape explicitly.

```typescript
// BAD — trusting raw JSON
const data = JSON.parse(body)
doSomething(data.fid)

// GOOD — validate at the boundary
const raw: unknown = JSON.parse(body)
const parsed = mySchema.safeParse(raw)
if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
doSomething(parsed.data.fid)
```

## Function Signatures

- **Always type return values** for exported functions. Inferred returns are fine for small internal helpers, but exported functions need explicit return types so breaking changes surface at compile time.
- **Use `readonly` for array/object params** that should not be mutated.
- **Prefer discriminated unions** over boolean flags when a function behaves differently based on a mode.

```typescript
// BAD — boolean flag creates two hidden code paths
const fetchUser = (fid: number, includeScore: boolean): Promise<User | UserWithScore>

// GOOD — discriminated union makes each path explicit
type FetchUserOpts =
  | { mode: 'basic'; fid: number }
  | { mode: 'withScore'; fid: number }
```

## Narrowing & Guards

- **Use `satisfies`** to validate object literals against a type without widening.
- **Use `in` operator or discriminant checks** to narrow union types — never rely on array index access or property assumptions.
- **Prefer `Map<K, V>` over `Record<string, V>`** when keys are dynamic and may not exist — `Record` does not encode missing keys in its type.

## Common Pitfalls in This Codebase

| Pattern | Risk | Fix |
|---------|------|-----|
| `(req as any)` in route tests | Hides missing request shape issues | Build a proper `Request` object and cast explicitly (e.g. `req as unknown as NextRequest`) only at the route boundary |
| `.data!` on Supabase results | Crashes if query errored | Check `.error` first, early return |
| Untyped event handlers | `e.target.value` can be `null` | Type the event: `React.ChangeEvent<HTMLInputElement>` |
| `Object.keys()` returns `string[]` | Loses key specificity | Use a typed helper or `(Object.keys(obj) as Array<keyof typeof obj>)` with a comment |
