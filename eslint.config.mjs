import coreWebVitals from "eslint-config-next/core-web-vitals"
import typescript from "eslint-config-next/typescript"

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "next-env.d.ts",
      // Agent worktrees hold full checkouts (e.g. the pre-redesign site);
      // they lint themselves in their own context
      ".claude/**",
      // Session/debug scratch files not part of the app
      "capture-old-tmp.mjs",
      "debug-capture-tmp.mjs",
    ],
  },
]

export default eslintConfig
