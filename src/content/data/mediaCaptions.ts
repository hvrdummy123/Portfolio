/** Human captions for repo media — never show raw filenames on-page. */
export const mediaCaptions: Record<string, Record<string, string>> = {
  paybench: {
    "architecture.svg": "PayBench architecture: agents, ledger, and graders",
    "compare_timeout.png": "PayBench playground: the ambiguous timeout",
    "playground.png": "PayBench interactive playground",
  },
  "zkp-kyc": {
    "architecture.svg": "Issuance → proof → verification flow",
  },
  duihua: {
    "01-conversation.gif": "Conversation loop: STT → LLM → TTS",
    "02-practice.gif": "Practice mode in the coach UI",
    "03-feedback.gif": "Feedback after a spoken turn",
  },
};

export function captionFor(slug: string, file: string): string {
  return mediaCaptions[slug]?.[file] ?? file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}
