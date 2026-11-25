import { SUPPORTED_BROWSERS, type FeatureSpotlightId } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { Check, FileDown, Globe, Lock, Shield } from "lucide-react";
import { memo, useState } from "react";

interface FeatureStageProps {
	activeId: FeatureSpotlightId;
}

export const FeatureStage = memo(function FeatureStage({ activeId }: FeatureStageProps) {
	const [selectedBrowser, setSelectedBrowser] =
		useState<(typeof SUPPORTED_BROWSERS)[number]>("Edge");

	return (
		<div
			role="tabpanel"
			aria-live="polite"
			className="surface-card flex min-h-84 w-full flex-col justify-between overflow-hidden rounded-[12px] border border-white/10 bg-[#0e1117] p-6 sm:min-h-92 sm:p-8"
		>
			{activeId === "browser" ? (
				<div
					key="browser"
					className="mobile-nav-popover flex h-full flex-col justify-between gap-8"
				>
					<div className="flex items-center justify-between gap-2">
						<span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Globe className="size-3.5 text-muted-foreground" aria-hidden="true" />
							<span>Download footprint</span>
						</span>
						<span className="font-mono text-xs text-muted-foreground">0 MB extra</span>
					</div>

					{/* Calm monochrome + single-accent comparison bars */}
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between text-xs">
								<span className="text-muted-foreground">Apps that bundle a second browser</span>
								<span className="font-mono text-muted-foreground">~420 MB</span>
							</div>
							<div className="h-1.5 w-full overflow-hidden rounded-full bg-white/6">
								<div className="h-full w-full rounded-full bg-white/16" />
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between text-xs">
								<span className="font-medium text-foreground">Gemini AI Plus Portal</span>
								<span className="font-mono font-medium text-foreground">Uses yours</span>
							</div>
							<div className="h-1.5 w-full overflow-hidden rounded-full bg-white/6">
								<div className="h-full w-[11%] rounded-full bg-primary" />
							</div>
						</div>
					</div>

					{/* Quiet interactive browser selector */}
					<div className="flex flex-col gap-3 border-t border-[#1e2430] pt-5">
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>Works automatically with</span>
							<span className="text-foreground/85">{selectedBrowser} supported</span>
						</div>
						<div className="flex flex-wrap gap-1.5">
							{SUPPORTED_BROWSERS.map((name) => {
								const isSelected = name === selectedBrowser;
								return (
									<button
										key={name}
										type="button"
										onClick={() => setSelectedBrowser(name)}
										className={cn(
											"tactile-press cursor-pointer rounded-[6px] border px-3 py-1.5 text-xs font-medium",
											isSelected
												? "border-white/25 bg-white/10 text-foreground"
												: "border-[#1e2430] bg-[#131720] text-muted-foreground hover:text-foreground",
										)}
									>
										{name}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			) : null}

			{activeId === "privacy" ? (
				<div
					key="privacy"
					className="mobile-nav-popover flex h-full flex-col justify-between gap-8"
				>
					<div className="flex items-center justify-between gap-2">
						<span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Lock className="size-3.5 text-muted-foreground" aria-hidden="true" />
							<span>Where your data lives</span>
						</span>
						<span className="font-mono text-xs text-muted-foreground">On your PC</span>
					</div>

					<div className="flex flex-col gap-2.5">
						<div className="flex items-center justify-between gap-4 rounded-[8px] border border-white/12 bg-[#131720] px-4 py-3.5">
							<div className="flex flex-col gap-0.5">
								<span className="text-sm font-semibold text-foreground">Your computer</span>
								<span className="text-xs text-muted-foreground">
									Your details and saved offer link never leave your device.
								</span>
							</div>
							<span className="shrink-0 font-mono text-xs text-foreground">100%</span>
						</div>

						<div className="flex items-center justify-between gap-4 rounded-[8px] border border-[#1e2430] bg-[#0b0d11] px-4 py-3.5">
							<div className="flex flex-col gap-0.5">
								<span className="text-sm font-medium text-muted-foreground">
									Third-party servers &amp; tracking
								</span>
								<span className="text-xs text-muted-foreground/75">
									No accounts, no analytics, and no data sent to us.
								</span>
							</div>
							<span className="shrink-0 font-mono text-xs text-muted-foreground">None</span>
						</div>
					</div>

					<div className="flex items-center justify-between border-t border-[#1e2430] pt-5 text-xs text-muted-foreground">
						<span>Fully transparent</span>
						<span className="text-foreground">Open source on GitHub</span>
					</div>
				</div>
			) : null}

			{activeId === "portable" ? (
				<div
					key="portable"
					className="mobile-nav-popover flex h-full flex-col justify-between gap-8"
				>
					<div className="flex items-center justify-between gap-2">
						<span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<FileDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
							<span>Ready to launch</span>
						</span>
						<span className="font-mono text-xs text-muted-foreground">~43 MB</span>
					</div>

					<div className="flex flex-col gap-2.5">
						<div className="rounded-[8px] border border-white/12 bg-[#131720] px-4 py-3.5">
							<div className="font-mono text-xs font-semibold text-foreground">
								Gemini AI Plus Portal (Windows 10/11)
							</div>
							<p className="mt-1 text-xs text-muted-foreground">
								No installer wizard—just double-click to open.
							</p>
						</div>

						<div className="flex flex-col divide-y divide-[#1e2430] rounded-[8px] border border-[#1e2430] bg-[#0b0d11] px-4 text-xs">
							{[
								"Everything needed is packed into one file",
								"Publicly built from the open-source repository",
								"Scanned with VirusTotal on every release",
							].map((line) => (
								<div key={line} className="flex items-center gap-2.5 py-2.5 text-muted-foreground">
									<Check className="size-3.5 shrink-0 text-foreground/70" aria-hidden="true" />
									<span>{line}</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center justify-between border-t border-[#1e2430] pt-5 text-xs text-muted-foreground">
						<span>Works on</span>
						<span className="text-foreground">Windows 10 &amp; Windows 11</span>
					</div>
				</div>
			) : null}

			{activeId === "recovery" ? (
				<div
					key="recovery"
					className="mobile-nav-popover flex h-full flex-col justify-between gap-8"
				>
					<div className="flex items-center justify-between gap-2">
						<span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Shield className="size-3.5 text-muted-foreground" aria-hidden="true" />
							<span>Built-in safeguards</span>
						</span>
						<span className="font-mono text-xs text-muted-foreground">Account safe</span>
					</div>

					<div className="flex flex-col gap-2.5">
						<div className="flex flex-col gap-0.5 rounded-[8px] border border-white/12 bg-[#131720] px-4 py-3.5">
							<span className="text-sm font-semibold text-foreground">
								Waits for security checks
							</span>
							<span className="text-xs leading-relaxed text-muted-foreground">
								If a human check appears, the app pauses right away so you can finish it safely.
							</span>
						</div>

						<div className="flex flex-col gap-0.5 rounded-[8px] border border-[#1e2430] bg-[#0b0d11] px-4 py-3.5">
							<span className="text-sm font-semibold text-foreground">
								Pick up where you left off
							</span>
							<span className="text-xs leading-relaxed text-muted-foreground">
								If a session gets interrupted, the built-in recovery tool grabs your link without
								restarting.
							</span>
						</div>
					</div>

					<div className="flex items-center justify-between border-t border-[#1e2430] pt-5 text-xs text-muted-foreground">
						<span>Safe practice mode</span>
						<span className="inline-flex items-center gap-1.5 text-foreground">
							Press{" "}
							<kbd className="rounded-[5px] border border-white/15 bg-[#131720] px-1.5 py-0.5 font-mono text-[11px]">
								F12
							</kbd>{" "}
							inside the app
						</span>
					</div>
				</div>
			) : null}
		</div>
	);
});
