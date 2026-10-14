import * as Sentry from "@sentry/nextjs"

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const dns = await import("dns")
      const net = await import("net")
      dns.setDefaultResultOrder?.("ipv4first")
      net.setDefaultAutoSelectFamily?.(false)
    } catch {}

    await import("./sentry.server.config")
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config")
  }
}

// Automatically captures all unhandled server-side request errors
export const onRequestError = Sentry.captureRequestError
