import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx|md|mdx)$/.test(name)) acc.push(p);
  }
  return acc;
}

const files = walk(join(process.cwd(), "src")).concat(
  walk(join(process.cwd(), ".")).filter((f) => f.endsWith("CONTENT_TODO.md")),
);

const todos = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    if (line.includes("TODO_FROM_HARSHITA")) {
      todos.push(`${file}:${i + 1}: ${line.trim()}`);
    }
  });
}

console.log(`Found ${todos.length} TODO_FROM_HARSHITA placeholders:`);
for (const t of todos.slice(0, 50)) console.log(" -", t);
if (todos.length > 50) console.log(` ...and ${todos.length - 50} more`);
process.exit(0);
