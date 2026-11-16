/** Human captions for repo media — never show raw filenames on-page. */
export const mediaCaptions: Record<string, Record<string, string>> = {
  paybench: {
    "architecture.svg": "PayBench architecture: agents, ledger, and graders",
    "compare_timeout.png": "PayBench playground: the ambiguous timeout",
    "playground.png": "PayBench interactive playground",
  },
  "zkp-kyc": {
    "architecture.svg": "Issuance → proof generation → verification → on-chain check",
    "01-issuance.png": "Issuance: attester commits credential hashes on-chain",
    "02-proof.png": "Proof generation: holder builds a Groth16 proof locally",
    "03-verify.png": "Verification: verifier checks the proof without seeing raw attributes",
    "04-onchain.png": "On-chain check against the attester commitment",
    "05-roles.png": "Role registry for issuer / holder / verifier actors",
    "06-failure.png": "Failure case: revoked or mismatched commitment rejected",
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
