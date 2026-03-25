import type { AIProvider } from "../interface";
import { StubProvider } from "./stub";

export type ProviderType = "claude" | "openai" | "stub";

export function createAIProvider(type?: ProviderType): AIProvider {
  const providerType = type || (process.env.AI_PROVIDER as ProviderType) || "stub";

  switch (providerType) {
    case "claude":
      // TODO: implement Claude provider
      throw new Error("Claude provider not yet implemented. Set AI_PROVIDER=stub for now.");
    case "openai":
      // TODO: implement OpenAI provider
      throw new Error("OpenAI provider not yet implemented. Set AI_PROVIDER=stub for now.");
    case "stub":
      return new StubProvider();
    default:
      return new StubProvider();
  }
}
