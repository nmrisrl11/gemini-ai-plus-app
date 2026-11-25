import { WindowsIcon } from "@/components/icons";
import { APP_INFO } from "@/constants/app-info";
import { PORTABLE_STEPS, RELEASE_SPECS } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { Check, Copy, ExternalLink, Terminal } from "lucide-react";
import { useState } from "react";

type InstallMode = "portable" | "source" | "cli";

const INSTALL_TABS: readonly { id: InstallMode; label: string }[] = [
	{ id: "portable", label: "Portable .exe" },
	{ id: "source", label: "From Source" },
	{ id: "cli", label: "Headless CLI" },
] as const;

const SOURCE_SNIPPET = `git clone ${APP_INFO.githubUrl}.git
cd gemini-ai-plus-portal
run.bat`;

const CLI_SNIPPET = `python main.py --cli ^
  --email "youraccount@gmail.com" ^
  --password "YourPassword123!" ^
  --browser auto --headless`;

export function InstallSection() {
	const [mode, setMode] = useState<InstallMode>("portable");
	const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

	const copyText = (key: string, text: string) => {
		navigator.clipboard?.writeText(text).catch(() => {});
		setCopiedBlock(key);
		window.setTimeout(() => {
			setCopiedBlock((prev) => (prev === key ? null : prev));
		}, 1800);
	};

	return (
		<section
			id="install"
			aria-labelledby="install-heading"
			className="relative px-4 py-24 sm:px-6 sm:py-32"
		>
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto max-w-2xl text-center">
					<h2
						id="install-heading"
						className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
					>
						Download and run.
					</h2>
					<p className="mx-auto mt-3.5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
						Run the standalone Windows executable directly, or inspect and launch from open source.
					</p>
				</div>

				{/* Split Command Deck */}
				<div className="mt-14 grid items-stretch gap-6 lg:grid-cols-12">
					{/* Left: Release Card */}
					<div className="surface-card flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-card/90 p-6 sm:p-8 lg:col-span-5">
						<div>
							<div className="flex items-center justify-between gap-3">
								<span className="text-xs font-semibold text-primary">Windows Release</span>
								<span className="rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 font-mono text-xs font-medium text-muted-foreground">
									{APP_INFO.versionTag} · Win64
								</span>
							</div>

							<h3 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
								{APP_INFO.name}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								Double-click to launch. Includes all bundled Python dependencies and attaches
								directly to your existing browser.
							</p>

							<div className="mt-6 flex flex-col gap-2.5">
								<a
									href={APP_INFO.latestReleaseUrl}
									target="_blank"
									rel="noreferrer noopener"
									className="tactile-pill flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/65 bg-linear-to-b from-white via-[#f8fafc] to-[#e2e8f0] px-6 text-sm font-semibold text-slate-950 shadow-[0_6px_18px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,1)] hover:opacity-95"
								>
									<WindowsIcon className="size-4 text-slate-900" />
									<span>Download Portable (.exe)</span>
								</a>

								<a
									href={APP_INFO.githubReleasesUrl}
									target="_blank"
									rel="noreferrer noopener"
									className="tactile-press flex h-9.5 items-center justify-center gap-2 rounded-full border border-border/80 bg-muted/35 px-5 text-xs font-medium text-muted-foreground hover:border-white/20 hover:bg-muted/70 hover:text-foreground"
								>
									<span>Releases, SHA-256 &amp; VirusTotal</span>
									<ExternalLink className="size-3" aria-hidden="true" />
								</a>
							</div>

							<div className="my-6 divide-y divide-border/50 border-y border-border/50 text-xs">
								{RELEASE_SPECS.map((spec) => (
									<div key={spec.label} className="flex items-center justify-between gap-4 py-2.5">
										<span className="text-muted-foreground">{spec.label}</span>
										<span
											className={cn(
												"text-right font-mono font-medium",
												spec.isAccent ? "text-primary" : "text-foreground",
											)}
										>
											{spec.value}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
							<span className="font-semibold text-foreground">Account requirement:</span> Use a
							standard personal <code className="font-mono text-foreground">@gmail.com</code>{" "}
							account without an active paid Google One plan.
						</div>
					</div>

					{/* Right: Tabbed Quick Start Card */}
					<div className="surface-card flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-card/90 p-6 sm:p-8 lg:col-span-7">
						<div>
							<div className="flex flex-col justify-between gap-4 border-b border-border/50 pb-5 sm:flex-row sm:items-center">
								<div>
									<h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
										Quick start
									</h3>
									<p className="mt-1 text-xs text-muted-foreground sm:text-sm">
										Choose portable mode, source launcher, or headless CLI.
									</p>
								</div>

								<div
									role="tablist"
									aria-label="Installation modes"
									className="inline-flex rounded-xl border border-border/70 bg-background/75 p-1"
								>
									{INSTALL_TABS.map((tab) => {
										const active = mode === tab.id;
										return (
											<button
												key={tab.id}
												role="tab"
												type="button"
												aria-selected={active}
												onClick={() => setMode(tab.id)}
												className={cn(
													"tactile-press cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium",
													active
														? "bg-card text-foreground shadow-xs"
														: "text-muted-foreground hover:text-foreground",
												)}
											>
												{tab.label}
											</button>
										);
									})}
								</div>
							</div>

							{/* Tab Panel Content */}
							<div className="mt-7">
								{mode === "portable" ? (
									<div className="relative flex flex-col gap-7 pl-9 before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-px before:bg-border/60 sm:pl-10">
										{PORTABLE_STEPS.map((step) => (
											<div key={step.num} className="relative">
												<span className="absolute -left-9 flex size-7 items-center justify-center rounded-full border border-border/80 bg-background font-mono text-xs font-bold text-primary sm:-left-10">
													{step.num}
												</span>
												<h4 className="text-base font-bold text-foreground">{step.title}</h4>
												<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
													{step.instruction}
												</p>
											</div>
										))}
									</div>
								) : null}

								{mode === "source" ? (
									<div className="flex flex-col gap-4">
										<p className="text-sm leading-relaxed text-muted-foreground">
											Clone the MIT repository and run the 1-click launcher.{" "}
											<code className="font-mono text-foreground">run.bat</code> creates{" "}
											<code className="font-mono text-foreground">.venv</code>, installs Python
											3.10–3.12 dependencies, and opens the GUI with visual browser mode enabled.
										</p>
										<div className="overflow-hidden rounded-2xl border border-border/70 bg-[#090b10]">
											<div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5 text-xs text-muted-foreground">
												<span className="inline-flex items-center gap-2 font-mono">
													<Terminal className="size-3.5 text-primary" aria-hidden="true" />
													PowerShell / Command Prompt
												</span>
												<button
													type="button"
													onClick={() => copyText("source", SOURCE_SNIPPET)}
													className="tactile-press inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
												>
													{copiedBlock === "source" ? (
														<>
															<Check className="size-3 text-emerald-400" aria-hidden="true" />
															<span>Copied</span>
														</>
													) : (
														<>
															<Copy className="size-3" aria-hidden="true" />
															<span>Copy</span>
														</>
													)}
												</button>
											</div>
											<pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
												<code>{SOURCE_SNIPPET}</code>
											</pre>
										</div>
									</div>
								) : null}

								{mode === "cli" ? (
									<div className="flex flex-col gap-4">
										<p className="text-sm leading-relaxed text-muted-foreground">
											Run directly from the terminal without opening the desktop window. Supports{" "}
											<code className="font-mono text-foreground">
												--browser &#123;auto,chrome,edge,brave&#125;
											</code>{" "}
											and custom profile flags.
										</p>
										<div className="overflow-hidden rounded-2xl border border-border/70 bg-[#090b10]">
											<div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5 text-xs text-muted-foreground">
												<span className="inline-flex items-center gap-2 font-mono">
													<Terminal className="size-3.5 text-primary" aria-hidden="true" />
													Headless CLI Mode
												</span>
												<button
													type="button"
													onClick={() => copyText("cli", CLI_SNIPPET)}
													className="tactile-press inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
												>
													{copiedBlock === "cli" ? (
														<>
															<Check className="size-3 text-emerald-400" aria-hidden="true" />
															<span>Copied</span>
														</>
													) : (
														<>
															<Copy className="size-3" aria-hidden="true" />
															<span>Copy</span>
														</>
													)}
												</button>
											</div>
											<pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
												<code>{CLI_SNIPPET}</code>
											</pre>
										</div>
									</div>
								) : null}
							</div>
						</div>

						<div className="mt-8 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
							<span className="font-semibold text-foreground">Interrupted session?</span> Run{" "}
							<code className="font-mono text-foreground">
								tools\account_recovery\run_account_recovery.bat
							</code>{" "}
							to attach over Chrome DevTools Protocol and finish link extraction without restarting.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
