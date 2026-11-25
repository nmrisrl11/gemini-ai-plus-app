import { DEMO_PROFILES, type BrowserOption } from "@/constants/landing-data";
import { useEffect, useRef, useState } from "react";

export type SimStage = "idle" | "running" | "confirm" | "extracting" | "done";

export interface LogEntry {
	id: number;
	time?: string;
	tag?: "INFO" | "WAIT" | "OK" | "DIAG";
	text: string;
}

export const SAMPLE_OUTPUT_URL = "https://one.google.com/offer/SAMPLE-PREVIEW-LINK";

const READY_LINES: readonly LogEntry[] = [
	{ id: 1, text: "Ready to preview the Gemini AI Plus Portal desktop workflow." },
	{ id: 2, text: "" },
	{ id: 3, text: '  1. Review the sample profile or click "Randomize" above.' },
	{ id: 4, text: '  2. (Optional) Click "Customize" to inspect generated sample fields.' },
	{ id: 5, text: '  3. Click "Get 1-Year Access Link" to run the local UI simulation.' },
	{ id: 6, text: "  4. Confirm the simulated step to preview canonical link output." },
];

export function usePreviewSimulation() {
	const [profileIdx, setProfileIdx] = useState(0);
	const [isShuffling, setIsShuffling] = useState(false);
	const [showCustomize, setShowCustomize] = useState(false);
	const [browser, setBrowser] = useState<BrowserOption>("Auto-Detect");
	const [stage, setStage] = useState<SimStage>("idle");
	const [logs, setLogs] = useState<readonly LogEntry[]>(READY_LINES);
	const [copiedLink, setCopiedLink] = useState(false);
	const [copiedLog, setCopiedLog] = useState(false);

	const timersRef = useRef<number[]>([]);
	const nextLogId = useRef(20);

	const clearTimers = () => {
		for (const t of timersRef.current) window.clearTimeout(t);
		timersRef.current = [];
	};

	useEffect(() => clearTimers, []);

	const appendLog = (tag: NonNullable<LogEntry["tag"]>, text: string, time: string) => {
		nextLogId.current += 1;
		setLogs((prev) => [...prev, { id: nextLogId.current, time, tag, text }]);
	};

	const activeProfile = DEMO_PROFILES[profileIdx];
	const fullName = `${activeProfile.firstName} ${activeProfile.lastName}`;
	const isBusy = stage === "running" || stage === "extracting";

	const handleRandomize = () => {
		if (isBusy) return;
		setIsShuffling(true);
		const timer = window.setTimeout(() => {
			setProfileIdx((prev) => (prev + 1) % DEMO_PROFILES.length);
			setIsShuffling(false);
		}, 120);
		timersRef.current.push(timer);
	};

	const handleToggleCustomize = () => {
		setShowCustomize((prev) => !prev);
	};

	const handleReset = () => {
		clearTimers();
		setStage("idle");
		setShowCustomize(false);
		setCopiedLink(false);
		setLogs(READY_LINES);
	};

	const handleStartSimulation = () => {
		if (stage !== "idle" && stage !== "done") return;
		clearTimers();
		setCopiedLink(false);
		setStage("running");

		const resolvedEngine = browser === "Auto-Detect" ? "Microsoft Edge (msedge)" : browser;

		setLogs([
			{
				id: ++nextLogId.current,
				time: "00:01",
				tag: "INFO",
				text: `[Demo] Attaching Playwright to ${resolvedEngine} (background headless)...`,
			},
		]);

		timersRef.current.push(
			window.setTimeout(() => {
				appendLog(
					"INFO",
					`[Demo] Formatting sample profile (${fullName}) for ${activeProfile.sampleEmail}`,
					"00:04",
				);
			}, 450),
			window.setTimeout(() => {
				appendLog(
					"WAIT",
					"[Demo] Paused at human-in-the-loop confirmation step. Click Continue Preview below.",
					"00:07",
				);
				setStage("confirm");
			}, 1050),
		);
	};

	const handleConfirmStep = () => {
		if (stage !== "confirm") return;
		setStage("extracting");
		appendLog("INFO", "[Demo] Confirmation received. Navigating to promotional grant...", "00:12");

		timersRef.current.push(
			window.setTimeout(() => {
				appendLog("INFO", "[Demo] Resolving redirects to canonical offer URL...", "00:15");
			}, 450),
			window.setTimeout(() => {
				appendLog(
					"OK",
					`[Demo] Sample output archived locally to results/${activeProfile.firstName.toLowerCase()}_session.txt`,
					"00:18",
				);
				setStage("done");
			}, 1050),
		);
	};

	const handleRunDiagnostics = () => {
		if (isBusy) return;
		clearTimers();
		setStage("idle");
		setLogs([
			{
				id: ++nextLogId.current,
				time: "00:00",
				tag: "DIAG",
				text: "Built-in F12 Diagnostics Suite (simulated preview)",
			},
			{
				id: ++nextLogId.current,
				time: "00:01",
				tag: "OK",
				text: "Chromium cascade probe: Edge, Chrome, Brave paths reachable.",
			},
			{
				id: ++nextLogId.current,
				time: "00:01",
				tag: "OK",
				text: "Gateway guard & local results/ write check passed.",
			},
		]);
	};

	const handleCopyLink = () => {
		navigator.clipboard?.writeText(SAMPLE_OUTPUT_URL).catch(() => {});
		setCopiedLink(true);
		const timer = window.setTimeout(() => setCopiedLink(false), 1800);
		timersRef.current.push(timer);
	};

	const handleCopyLog = () => {
		const formatted = logs
			.map((l) => (l.time && l.tag ? `[${l.time}] [${l.tag}] ${l.text}` : l.text))
			.join("\n");
		navigator.clipboard?.writeText(formatted).catch(() => {});
		setCopiedLog(true);
		const timer = window.setTimeout(() => setCopiedLog(false), 1800);
		timersRef.current.push(timer);
	};

	const currentStep =
		stage === "idle" || stage === "running"
			? 1
			: stage === "confirm" || stage === "extracting"
				? 2
				: 3;

	const statusLabel =
		stage === "idle"
			? "System Ready"
			: stage === "running"
				? "Simulating..."
				: stage === "confirm"
					? "Awaiting Step"
					: stage === "extracting"
						? "Resolving Link"
						: "Preview Ready";

	const statusDotColor =
		stage === "confirm"
			? "bg-amber-400"
			: stage === "running" || stage === "extracting"
				? "bg-primary"
				: "bg-emerald-400";

	return {
		activeProfile,
		fullName,
		isShuffling,
		showCustomize,
		browser,
		setBrowser,
		stage,
		isBusy,
		logs,
		copiedLink,
		copiedLog,
		currentStep,
		statusLabel,
		statusDotColor,
		handleRandomize,
		handleToggleCustomize,
		handleReset,
		handleStartSimulation,
		handleConfirmStep,
		handleRunDiagnostics,
		handleCopyLink,
		handleCopyLog,
	};
}
