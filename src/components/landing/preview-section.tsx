import {
	BROWSER_OPTIONS,
	DEMO_PROFILES,
	PLAN_BENEFITS,
	type BrowserOption,
} from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { Check, Copy, ExternalLink, RotateCcw, Shuffle, Sparkles } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type SimStage = "idle" | "running" | "otp" | "extracting" | "done";

interface LogEntry {
	id: number;
	time: string;
	tag: "INFO" | "WAIT" | "OK";
	text: string;
}

const DEMO_OFFER_URL = "https://one.google.com/offer/AIPLUS-12M-DEMO";
const INITIAL_LOGS: LogEntry[] = [
	{
		id: 1,
		time: "00:00",
		tag: "INFO",
		text: "Ready to provision a 1-Year Gemini AI Plus access link.",
	},
	{
		id: 2,
		time: "00:00",
		tag: "INFO",
		text: 'Enter a Gmail address or click "Get 1-Year Access Link" to test the workflow.',
	},
];

const STEPPER_ITEMS = [
	{ step: 1, label: "Profile Setup" },
	{ step: 2, label: "Email Verification" },
	{ step: 3, label: "Access Link Ready" },
] as const;

export function PreviewSection() {
	const emailId = useId();
	const browserId = useId();
	const otpId = useId();

	const [email, setEmail] = useState("student.demo@gmail.com");
	const [profileIdx, setProfileIdx] = useState(0);
	const [isShuffling, setIsShuffling] = useState(false);
	const [browser, setBrowser] = useState<BrowserOption>("Auto-Detect");
	const [stage, setStage] = useState<SimStage>("idle");
	const [otpValue, setOtpValue] = useState("");
	const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
	const [copiedLink, setCopiedLink] = useState(false);
	const [copiedLog, setCopiedLog] = useState(false);

	const timersRef = useRef<number[]>([]);
	const nextLogId = useRef(10);

	const clearTimers = () => {
		for (const t of timersRef.current) window.clearTimeout(t);
		timersRef.current = [];
	};

	useEffect(() => clearTimers, []);

	const appendLog = (tag: LogEntry["tag"], text: string, time: string) => {
		nextLogId.current += 1;
		setLogs((prev) => [...prev, { id: nextLogId.current, time, tag, text }]);
	};

	const activeProfile = DEMO_PROFILES[profileIdx];

	const handleRandomize = () => {
		if (stage === "running" || stage === "extracting") return;
		setIsShuffling(true);
		const timer = window.setTimeout(() => {
			setProfileIdx((prev) => (prev + 1) % DEMO_PROFILES.length);
			setIsShuffling(false);
		}, 120);
		timersRef.current.push(timer);
	};

	const handleReset = () => {
		clearTimers();
		setStage("idle");
		setOtpValue("");
		setCopiedLink(false);
		setLogs(INITIAL_LOGS);
	};

	const handleStartSimulation = () => {
		if (stage !== "idle" && stage !== "done") return;
		clearTimers();
		setOtpValue("");
		setCopiedLink(false);
		setStage("running");

		const targetEmail = email.trim() || "student.demo@gmail.com";
		const resolvedEngine = browser === "Auto-Detect" ? "Microsoft Edge (msedge)" : browser;

		setLogs([
			{
				id: ++nextLogId.current,
				time: "00:01",
				tag: "INFO",
				text: `Launching Playwright via ${resolvedEngine} (headless mode)...`,
			},
		]);

		timersRef.current.push(
			window.setTimeout(() => {
				appendLog(
					"INFO",
					`Submitting student profile (${activeProfile.name}) for ${targetEmail}`,
					"00:04",
				);
			}, 450),
			window.setTimeout(() => {
				appendLog("WAIT", "Gateway dispatched 6-digit verification code. Paused for OTP.", "00:07");
				setStage("otp");
			}, 1050),
		);
	};

	const handleVerifyOtp = (codeOverride?: string) => {
		const code = (codeOverride ?? otpValue).replace(/\D/g, "").slice(0, 6);
		if (code.length !== 6) return;
		setOtpValue(code);
		setStage("extracting");
		appendLog("INFO", `Verified code ${code}. Navigating to promotional grant...`, "00:12");

		timersRef.current.push(
			window.setTimeout(() => {
				appendLog("INFO", "Resolving partner redirects to canonical Google One URL...", "00:15");
			}, 450),
			window.setTimeout(() => {
				appendLog(
					"OK",
					`Extracted link & archived locally to results/${(email.trim() || "student.demo@gmail.com").split("@")[0]}_session.txt`,
					"00:18",
				);
				setStage("done");
			}, 1050),
		);
	};

	const handleCopyLink = () => {
		navigator.clipboard?.writeText(DEMO_OFFER_URL).catch(() => {});
		setCopiedLink(true);
		const timer = window.setTimeout(() => setCopiedLink(false), 1800);
		timersRef.current.push(timer);
	};

	const handleCopyLog = () => {
		const formatted = logs.map((l) => `[${l.time}] [${l.tag}] ${l.text}`).join("\n");
		navigator.clipboard?.writeText(formatted).catch(() => {});
		setCopiedLog(true);
		const timer = window.setTimeout(() => setCopiedLog(false), 1800);
		timersRef.current.push(timer);
	};

	const currentStep =
		stage === "idle" || stage === "running" ? 1 : stage === "otp" || stage === "extracting" ? 2 : 3;

	const statusLabel =
		stage === "idle"
			? "System Ready"
			: stage === "running"
				? "Automating..."
				: stage === "otp"
					? "Awaiting OTP"
					: stage === "extracting"
						? "Extracting Link"
						: "Link Ready";

	const statusDotColor =
		stage === "otp"
			? "bg-amber-400"
			: stage === "running" || stage === "extracting"
				? "bg-primary"
				: "bg-emerald-400";

	return (
		<section
			id="preview"
			aria-labelledby="preview-heading"
			className="relative px-4 py-24 sm:px-6 sm:py-32"
		>
			<div className="mx-auto flex w-full max-w-5xl flex-col items-center">
				{/* Section Header */}
				<div className="mx-auto max-w-2xl text-center">
					<h2
						id="preview-heading"
						className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
					>
						See how it runs.
					</h2>
					<p className="mx-auto mt-3.5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
						Test the desktop workflow right here—randomize a profile, run a simulated session, and
						walk through OTP verification.
					</p>
				</div>

				{/* Interactive Desktop Application Replica (CustomTkinter window from preview.PNG) */}
				<div className="surface-chassis mt-12 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d11]">
					{/* Native Win11-style App Chrome */}
					<div className="flex items-center justify-between border-b border-white/8 bg-[#0e1117] px-4 py-3">
						<div className="flex items-center gap-2.5">
							<img
								src="/images/app_icon.png"
								alt=""
								aria-hidden="true"
								width={20}
								height={20}
								className="size-5 shrink-0 object-contain"
							/>
							<span className="text-xs font-semibold tracking-tight text-foreground sm:text-sm">
								Gemini AI Plus Portal
							</span>
							<span className="rounded-md border border-white/8 bg-[#181e2b] px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
								v1.0.0
							</span>
						</div>

						<div className="flex items-center gap-2">
							<span className="hidden rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary sm:inline-flex">
								Interactive demo
							</span>
							<button
								type="button"
								onClick={handleReset}
								title="Reset simulation"
								className="tactile-press inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-[#181e2b] px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-white/20 hover:text-foreground"
							>
								<RotateCcw className="size-3" aria-hidden="true" />
								<span>Reset</span>
							</button>
						</div>
					</div>

					{/* Desktop Window Body */}
					<div className="flex flex-col gap-3.5 p-4 sm:p-5">
						{/* Card 1: Profile & Controls */}
						<div className="flex flex-col gap-3.5 rounded-xl border border-[#1e2430] bg-[#131720] p-4">
							{/* Gmail Row */}
							<div className="flex flex-col gap-1.5">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<label htmlFor={emailId} className="text-xs font-semibold text-foreground">
										Target Gmail Address
									</label>
									<span className="text-[11px] text-muted-foreground">
										6-digit verification code will be sent here
									</span>
								</div>
								<input
									id={emailId}
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={stage === "running" || stage === "extracting"}
									placeholder="name@gmail.com"
									className="h-9.5 w-full rounded-lg border border-[#273042] bg-[#0c0f15] px-3 text-sm text-foreground transition-colors duration-150 placeholder:text-muted-foreground/60 focus:border-[#3b82f6] disabled:opacity-60"
								/>
							</div>

							{/* Generated Profile Inset */}
							<div className="flex flex-col justify-between gap-3 rounded-lg border border-[#1e2430] bg-[#0f131b] px-3.5 py-3 sm:flex-row sm:items-center">
								<div className="flex flex-col gap-0.5">
									<span className="text-[11px] font-medium text-muted-foreground">
										Generated profile
									</span>
									<p
										data-transitioning={isShuffling}
										className="profile-crossfade font-mono text-xs text-foreground/95 sm:text-[13px]"
									>
										{activeProfile.name} <span className="text-muted-foreground/60">·</span>{" "}
										{activeProfile.phone} <span className="text-muted-foreground/60">·</span>{" "}
										Password ({activeProfile.passwordChars} chars)
									</p>
								</div>

								<button
									type="button"
									onClick={handleRandomize}
									disabled={stage === "running" || stage === "extracting"}
									className="tactile-press inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#2a3345] bg-[#1a202d] px-3 text-xs font-medium text-foreground hover:bg-[#232b3b] disabled:cursor-not-allowed disabled:opacity-50"
								>
									<Shuffle className="size-3.5 text-primary" aria-hidden="true" />
									<span>Randomize</span>
								</button>
							</div>

							{/* Browser Selector + Run CTA Row */}
							<div className="flex flex-col justify-between gap-3 pt-0.5 sm:flex-row sm:items-center">
								<div className="flex items-center gap-2.5">
									<label htmlFor={browserId} className="text-xs font-medium text-muted-foreground">
										Browser
									</label>
									<select
										id={browserId}
										value={browser}
										onChange={(e) => setBrowser(e.target.value as BrowserOption)}
										disabled={stage === "running" || stage === "extracting"}
										className="h-8.5 cursor-pointer rounded-lg border border-[#273042] bg-[#0c0f15] px-2.5 text-xs font-medium text-foreground transition-colors duration-150 hover:border-white/25 disabled:opacity-60"
									>
										{BROWSER_OPTIONS.map((opt) => (
											<option key={opt} value={opt} className="bg-[#0c0f15] text-foreground">
												{opt}
											</option>
										))}
									</select>
								</div>

								<button
									type="button"
									onClick={handleStartSimulation}
									disabled={stage === "running" || stage === "otp" || stage === "extracting"}
									className="tactile-press inline-flex h-9.5 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(37,99,235,0.32)] hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-55 sm:text-[13px]"
								>
									<Sparkles className="size-3.5" aria-hidden="true" />
									<span>
										{stage === "done" ? "Run Simulation Again" : "Get 1-Year Access Link"}
									</span>
								</button>
							</div>
						</div>

						{/* Card 2: 3-Step Horizontal Stepper */}
						<div className="grid grid-cols-1 gap-2 rounded-xl border border-[#1e2430] bg-[#131720] px-4 py-3 sm:grid-cols-3 sm:gap-4">
							{STEPPER_ITEMS.map((item) => {
								const isCompleted = currentStep > item.step || stage === "done";
								const isActive = currentStep === item.step && stage !== "done";
								return (
									<div key={item.step} className="flex items-center gap-2.5">
										<span
											className={cn(
												"flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors duration-200",
												isCompleted
													? "bg-emerald-500/20 text-emerald-400"
													: isActive
														? "bg-[#2563eb] text-white"
														: "bg-[#1a202d] text-muted-foreground",
											)}
										>
											{isCompleted ? <Check className="size-3.5" aria-hidden="true" /> : item.step}
										</span>
										<span
											className={cn(
												"text-xs font-medium transition-colors duration-200",
												isCompleted || isActive ? "text-foreground" : "text-muted-foreground",
											)}
										>
											{item.label}
										</span>
									</div>
								);
							})}
						</div>

						{/* Contextual OTP Interception Bar (appears during simulated step 2) */}
						{stage === "otp" ? (
							<div
								role="region"
								aria-label="Simulated OTP verification"
								className="mobile-nav-popover flex flex-col justify-between gap-3 rounded-xl border border-amber-500/35 bg-[#1b160d] p-4 sm:flex-row sm:items-center"
							>
								<div className="flex flex-col gap-0.5">
									<label htmlFor={otpId} className="text-xs font-semibold text-amber-300">
										Email verification code required
									</label>
									<p className="text-xs text-amber-100/75">
										Enter any 6 digits (or use the demo code) to resume automation.
									</p>
								</div>

								<div className="flex flex-wrap items-center gap-2">
									<input
										id={otpId}
										type="text"
										inputMode="numeric"
										maxLength={6}
										value={otpValue}
										onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
										onKeyDown={(e) => {
											if (e.key === "Enter") handleVerifyOtp();
										}}
										placeholder="482910"
										className="h-9 w-28 rounded-lg border border-amber-500/40 bg-[#0c0f15] px-3 text-center font-mono text-sm tracking-[0.22em] text-foreground"
									/>
									<button
										type="button"
										onClick={() => handleVerifyOtp("482910")}
										className="tactile-press h-9 cursor-pointer rounded-lg border border-amber-500/35 bg-amber-500/15 px-3 text-xs font-medium text-amber-200 hover:bg-amber-500/25"
									>
										Use 482910
									</button>
									<button
										type="button"
										onClick={() => handleVerifyOtp()}
										disabled={otpValue.length !== 6}
										className="tactile-press h-9 cursor-pointer rounded-lg bg-[#2563eb] px-3.5 text-xs font-semibold text-white hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-45"
									>
										Verify
									</button>
								</div>
							</div>
						) : null}

						{/* Result Banner (appears when simulation completes) */}
						{stage === "done" ? (
							<div
								role="status"
								aria-live="polite"
								className="mobile-nav-popover flex flex-col justify-between gap-3 rounded-xl border border-emerald-500/35 bg-[#0d1f17] p-4 sm:flex-row sm:items-center"
							>
								<div className="flex min-w-0 flex-col gap-1">
									<span className="text-xs font-semibold text-emerald-300">
										Canonical Google One offer link extracted
									</span>
									<code className="truncate rounded-md border border-emerald-500/20 bg-[#091711] px-2.5 py-1 font-mono text-xs text-emerald-200">
										{DEMO_OFFER_URL}
									</code>
								</div>
								<div className="flex shrink-0 items-center gap-2">
									<button
										type="button"
										onClick={handleCopyLink}
										className="tactile-press inline-flex h-8.5 cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-500"
									>
										{copiedLink ? (
											<>
												<Check className="size-3.5" aria-hidden="true" />
												<span>Copied</span>
											</>
										) : (
											<>
												<Copy className="size-3.5" aria-hidden="true" />
												<span>Copy Demo Link</span>
											</>
										)}
									</button>
									<a
										href="#install"
										className="tactile-press inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-[#091711] px-3 text-xs font-medium text-emerald-200 hover:bg-emerald-500/15"
									>
										<span>Get App</span>
										<ExternalLink className="size-3" aria-hidden="true" />
									</a>
								</div>
							</div>
						) : null}

						{/* Card 3: Live Activity Feed Console */}
						<div className="flex flex-col gap-2.5 rounded-xl border border-[#1e2430] bg-[#131720] p-4">
							<div className="flex items-center justify-between gap-2">
								<span className="text-xs font-semibold text-foreground">Live Activity Feed</span>
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={handleCopyLog}
										className="tactile-press inline-flex h-6.5 cursor-pointer items-center gap-1 rounded-md border border-[#2a3345] bg-[#1a202d] px-2 text-[11px] font-medium text-muted-foreground hover:text-foreground"
									>
										{copiedLog ? "Copied" : "Copy Log"}
									</button>
									<span className="inline-flex h-6.5 items-center gap-1.5 rounded-md border border-[#1e2430] bg-[#0f131b] px-2.5 font-mono text-[11px] font-medium text-foreground/90">
										<span className={cn("size-1.5 rounded-full", statusDotColor)} />
										<span>{statusLabel}</span>
									</span>
								</div>
							</div>

							<div
								aria-live="polite"
								className="flex min-h-34 flex-col gap-1.5 rounded-lg border border-[#19202c] bg-[#090b10] p-3.5 font-mono text-xs leading-relaxed"
							>
								{logs.map((entry) => (
									<div key={entry.id} className="flex items-start gap-2.5">
										<span className="shrink-0 text-slate-600">{entry.time}</span>
										<span
											className={cn(
												"shrink-0 font-semibold",
												entry.tag === "OK"
													? "text-emerald-400"
													: entry.tag === "WAIT"
														? "text-amber-400"
														: "text-primary",
											)}
										>
											[{entry.tag}]
										</span>
										<span className="text-slate-300">{entry.text}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Compact Google AI Plus Plan Benefits Strip (Zero card bloat) */}
				<div className="mt-10 grid w-full grid-cols-1 gap-4 border-t border-border/50 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
					{PLAN_BENEFITS.map((benefit) => (
						<div key={benefit.title} className="flex flex-col gap-1">
							<h3 className="text-sm font-semibold tracking-tight text-foreground">
								{benefit.title}
							</h3>
							<p className="text-xs leading-relaxed text-muted-foreground">{benefit.detail}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
