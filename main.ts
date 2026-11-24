import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Vacuum's Alibi: One Line, 200
// Characters" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): a robot vacuum's
// excuse for missing a spot, in the machine's own deadpan voice.
// Pass 1 blamed the map: the missed area was struck from it after
// an incident the vacuum refuses to discuss. Pass 2 replaces the
// mystery with a confession that turns into a verdict: the vacuum
// ran over the spot three times, so if the dirt survived, the dirt
// has legally settled in — "tenure" lands as the last word, and the
// machine sounds smug rather than sorry: it did its job; the dirt
// simply outranks it now.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ALIBI_BEATS = [
  "I ran over that spot three times.",
  "If it is still dirty, the dirt has tenure.",
] as const;

export function buildEntryLine(): string {
  return ALIBI_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
