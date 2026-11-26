import type { ServiceStatusKind, ServiceStatusPayload } from "@/lib/service-status";
import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw, ShieldAlert, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Duration to display the expanded banner before auto-collapsing into a quiet
 * bottom pill to reduce visual noise while remaining one click away.
 */
const AUTO_COLLAPSE_DELAY_MS = 8000;

interface ServiceStatusBannerProps {
	payload: ServiceStatusPayload | null;
	effectiveStatus: ServiceStatusKind;
	isRevealed: boolean;
	isRefreshing: boolean;
	onRefresh: () => Promise<void>;
}

export function ServiceStatusBanner({
	payload,
	effectiveStatus,
	isRevealed,
	isRefreshing,
	onRefresh,
}: ServiceStatusBannerProps) {
	const [isMinimized, setIsMinimized] = useState(false);
	const [isInteracting, setIsInteracting] = useState(false);
	const [isDocumentHidden, setIsDocumentHidden] = useState(false);
	const hasAutoCollapsedRef = useRef(false);
	const remainingMsRef = useRef(AUTO_COLLAPSE_DELAY_MS);
	const timerStartedAtRef = useRef<number | null>(null);

	const isVisible = isRevealed && payload !== null && effectiveStatus !== "active";

	// Pause auto-collapse timer when the browser tab is hidden (Sonner principle)
	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsDocumentHidden(document.visibilityState === "hidden");
		};
		handleVisibilityChange();
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
	}, []);

	// Auto-collapse once after initial reveal; pause while hovered, focused, refreshing, or tab hidden
	useEffect(() => {
		if (
			!isVisible ||
			isMinimized ||
			hasAutoCollapsedRef.current ||
			isInteracting ||
			isRefreshing ||
			isDocumentHidden
		) {
			return undefined;
		}

		const remaining = remainingMsRef.current;
		if (remaining <= 0) {
			hasAutoCollapsedRef.current = true;
			setIsMinimized(true);
			return undefined;
		}

		timerStartedAtRef.current = Date.now();
		const timer = globalThis.setTimeout(() => {
			remainingMsRef.current = 0;
			hasAutoCollapsedRef.current = true;
			setIsMinimized(true);
		}, remaining);

		return () => {
			globalThis.clearTimeout(timer);
			if (timerStartedAtRef.current !== null) {
				const elapsed = Date.now() - timerStartedAtRef.current;
				remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
				timerStartedAtRef.current = null;
			}
		};
	}, [isVisible, isMinimized, isInteracting, isRefreshing, isDocumentHidden]);

	if (!isVisible) {
		return null;
	}

	const isPaused = effectiveStatus === "paused";
	const heading = payload.title || (isPaused ? "Promotion Temporarily Paused" : "Service Notice");
	const description = payload.message;

	const handleManualExpand = () => {
		hasAutoCollapsedRef.current = true;
		setIsMinimized(false);
	};

	const handleManualMinimize = () => {
		hasAutoCollapsedRef.current = true;
		setIsInteracting(false);
		setIsMinimized(true);
	};

	return (
		<div
			role="region"
			aria-label="Service status notice"
			className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-5 sm:px-4"
		>
			{isMinimized ? (
				<button
					type="button"
					onClick={handleManualExpand}
					aria-expanded={false}
					className={cn(
						"status-banner-enter status-press pointer-events-auto inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-[0_10px_28px_-8px_rgba(0,0,0,0.65)] backdrop-blur-2xl",
						isPaused
							? "border-rose-500/35 bg-[#190f13]/92 text-rose-100 hover:border-rose-400/50"
							: "border-amber-500/35 bg-[#18130a]/92 text-amber-100 hover:border-amber-400/50",
					)}
				>
					<span
						className={cn(
							"size-2 shrink-0 rounded-full",
							isPaused ? "bg-rose-400" : "bg-amber-400",
						)}
						aria-hidden="true"
					/>
					<span className="truncate">{heading}</span>
					<span className="text-[11px] opacity-70">Details</span>
				</button>
			) : (
				<div
					role="status"
					aria-live="polite"
					onPointerEnter={() => setIsInteracting(true)}
					onPointerLeave={() => setIsInteracting(false)}
					onFocusCapture={() => setIsInteracting(true)}
					onBlurCapture={(event) => {
						if (!event.currentTarget.contains(event.relatedTarget)) {
							setIsInteracting(false);
						}
					}}
					className={cn(
						"status-banner-enter pointer-events-auto w-full max-w-2xl rounded-2xl border px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.72)] backdrop-blur-2xl sm:px-4 sm:py-3",
						isPaused
							? "border-rose-500/30 bg-[#170f13]/92 text-rose-50"
							: "border-amber-500/30 bg-[#18130a]/92 text-amber-50",
					)}
				>
					<div className="flex items-start gap-3">
						<div
							className={cn(
								"mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border",
								isPaused
									? "border-rose-500/30 bg-rose-500/12 text-rose-300"
									: "border-amber-500/30 bg-amber-500/12 text-amber-300",
							)}
							aria-hidden="true"
						>
							{isPaused ? (
								<ShieldAlert className="size-3.5" />
							) : (
								<AlertTriangle className="size-3.5" />
							)}
						</div>

						<div className="min-w-0 flex-1">
							<div className="flex items-center justify-between gap-2">
								<p
									className={cn(
										"text-xs font-semibold tracking-tight sm:text-[13px]",
										isPaused ? "text-rose-200" : "text-amber-200",
									)}
								>
									{heading}
								</p>

								<div className="flex shrink-0 items-center gap-1">
									{isPaused ? (
										<button
											type="button"
											onClick={() => void onRefresh()}
											disabled={isRefreshing}
											aria-label={
												isRefreshing ? "Checking service status" : "Refresh service status"
											}
											title={isRefreshing ? "Checking status..." : "Refresh status"}
											className="status-press flex size-7 cursor-pointer items-center justify-center rounded-full border border-rose-400/25 bg-rose-500/10 text-rose-200/85 hover:border-rose-400/45 hover:bg-rose-500/20 hover:text-rose-100 disabled:cursor-wait disabled:opacity-65"
										>
											<RefreshCw
												className={cn("size-3.5 shrink-0", isRefreshing ? "animate-spin" : "")}
												aria-hidden="true"
											/>
										</button>
									) : null}

									<button
										type="button"
										onClick={handleManualMinimize}
										aria-label="Minimize status banner"
										title="Minimize banner"
										className={cn(
											"status-press flex size-7 cursor-pointer items-center justify-center rounded-full border border-transparent text-white/60 hover:text-white",
											isPaused ? "hover:bg-rose-500/15" : "hover:bg-amber-500/15",
										)}
									>
										<X className="size-3.5" aria-hidden="true" />
									</button>
								</div>
							</div>

							{description ? (
								<p
									className={cn(
										"mt-1 text-xs leading-relaxed",
										isPaused ? "text-rose-100/78" : "text-amber-100/78",
									)}
								>
									{description}
								</p>
							) : null}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
