import { APP_INFO } from "@/constants/app-info";

export type ServiceStatusKind = "active" | "notice" | "paused";

export interface ServiceStatusPayload {
	status: ServiceStatusKind;
	title: string;
	message: string;
	disable_actions: boolean;
}

export interface LatestReleaseManifest {
	versionTag: string;
	binarySize: string;
	releasedAt: string | null;
}

interface FetchOptions {
	timeoutMs?: number;
	signal?: AbortSignal;
}

const DEFAULT_TIMEOUT_MS = 5000;
const VALID_STATUSES = new Set<ServiceStatusKind>(["active", "notice", "paused"]);

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function createCombinedSignal(timeoutMs: number, externalSignal?: AbortSignal) {
	const controller = new AbortController();
	const timer = globalThis.setTimeout(() => controller.abort(), timeoutMs);

	const onExternalAbort = () => controller.abort();
	if (externalSignal) {
		if (externalSignal.aborted) {
			controller.abort();
		} else {
			externalSignal.addEventListener("abort", onExternalAbort, { once: true });
		}
	}

	const cleanup = () => {
		globalThis.clearTimeout(timer);
		externalSignal?.removeEventListener("abort", onExternalAbort);
	};

	return { signal: controller.signal, cleanup };
}

/**
 * Fetches remote Cloudflare R2 service status.
 * Fails open (`null`) on network errors, timeouts, 404s, or unknown status values.
 */
export async function fetchServiceStatus(
	options: FetchOptions = {},
): Promise<ServiceStatusPayload | null> {
	const { timeoutMs = DEFAULT_TIMEOUT_MS, signal: externalSignal } = options;
	const { signal, cleanup } = createCombinedSignal(timeoutMs, externalSignal);

	try {
		const response = await fetch(APP_INFO.serviceStatusUrl, {
			cache: "no-store",
			signal,
		});

		if (!response.ok) return null;

		const raw: unknown = await response.json();
		if (!isRecord(raw)) return null;

		const status = raw.status;
		if (typeof status !== "string" || !VALID_STATUSES.has(status as ServiceStatusKind)) {
			return null;
		}

		const title = typeof raw.title === "string" ? raw.title.trim() : "";
		const message = typeof raw.message === "string" ? raw.message.trim() : "";
		const disableActions = raw.disable_actions === true;

		return {
			status: status as ServiceStatusKind,
			title,
			message,
			disable_actions: disableActions,
		};
	} catch {
		return null;
	} finally {
		cleanup();
	}
}

export function formatBinarySize(sizeBytes: number): string {
	if (!Number.isFinite(sizeBytes) || sizeBytes <= 0) {
		return APP_INFO.binarySize;
	}
	const megabytes = Math.round(sizeBytes / (1024 * 1024));
	return `~${megabytes} MB`;
}

/**
 * Fetches latest release metadata from Cloudflare R2 (`latest.json`).
 * Returns `null` on error or timeout so callers fall back to `APP_INFO` defaults.
 */
export async function fetchLatestManifest(
	options: FetchOptions = {},
): Promise<LatestReleaseManifest | null> {
	const { timeoutMs = DEFAULT_TIMEOUT_MS, signal: externalSignal } = options;
	const { signal, cleanup } = createCombinedSignal(timeoutMs, externalSignal);

	try {
		const response = await fetch(APP_INFO.latestManifestUrl, {
			cache: "no-store",
			signal,
		});

		if (!response.ok) return null;

		const raw: unknown = await response.json();
		if (!isRecord(raw)) return null;

		const rawVersion = typeof raw.version === "string" ? raw.version.trim() : "";
		if (!rawVersion) return null;

		const versionTag = rawVersion.startsWith("v") ? rawVersion : `v${rawVersion}`;
		const sizeBytes = typeof raw.size_bytes === "number" ? raw.size_bytes : 0;
		const releasedAt = typeof raw.released_at === "string" ? raw.released_at : null;

		return {
			versionTag,
			binarySize: sizeBytes > 0 ? formatBinarySize(sizeBytes) : APP_INFO.binarySize,
			releasedAt,
		};
	} catch {
		return null;
	} finally {
		cleanup();
	}
}
