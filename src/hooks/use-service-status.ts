import {
	fetchServiceStatus,
	type ServiceStatusKind,
	type ServiceStatusPayload,
} from "@/lib/service-status";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Delay before surfacing the floating status bar so visitors experience the
 * Hero & WebGL2 intro cleanly without visual clutter or immediate pop-in.
 */
const STATUS_REVEAL_DELAY_MS = 1800;

export interface ServiceStatusState {
	payload: ServiceStatusPayload | null;
	effectiveStatus: ServiceStatusKind;
	isPaused: boolean;
	isRevealed: boolean;
	isRefreshing: boolean;
	refreshStatus: () => Promise<void>;
}

export function useServiceStatus(): ServiceStatusState {
	const [payload, setPayload] = useState<ServiceStatusPayload | null>(null);
	const [isRevealed, setIsRevealed] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const refreshAbortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		void fetchServiceStatus({ signal: controller.signal }).then((result) => {
			if (!controller.signal.aborted) {
				setPayload(result);
			}
		});

		const revealTimer = globalThis.setTimeout(() => {
			setIsRevealed(true);
		}, STATUS_REVEAL_DELAY_MS);

		return () => {
			controller.abort();
			globalThis.clearTimeout(revealTimer);
			refreshAbortRef.current?.abort();
		};
	}, []);

	const refreshStatus = useCallback(async () => {
		refreshAbortRef.current?.abort();
		const controller = new AbortController();
		refreshAbortRef.current = controller;

		setIsRefreshing(true);
		try {
			const next = await fetchServiceStatus({ signal: controller.signal });
			if (!controller.signal.aborted) {
				setPayload(next);
			}
		} finally {
			if (!controller.signal.aborted) {
				setIsRefreshing(false);
			}
		}
	}, []);

	const isPaused = payload !== null && (payload.status === "paused" || payload.disable_actions);
	const effectiveStatus: ServiceStatusKind = isPaused
		? "paused"
		: payload?.status === "notice"
			? "notice"
			: "active";

	return {
		payload,
		effectiveStatus,
		isPaused,
		isRevealed,
		isRefreshing,
		refreshStatus,
	};
}
