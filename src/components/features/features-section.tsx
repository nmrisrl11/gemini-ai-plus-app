import { CASCADE_TIERS } from "@/constants/landing-data";
import { Cpu, Globe, ShieldCheck, Terminal } from "lucide-react";

export function FeaturesSection() {
	return (
		<section
			id="features"
			aria-labelledby="features-heading"
			className="relative scroll-mt-4 px-4 pt-20 pb-24 sm:scroll-mt-6 sm:px-6 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto max-w-2xl text-center">
					<h2
						id="features-heading"
						className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
					>
						Engineered to stay light.
					</h2>
					<p className="mx-auto mt-3.5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
						Zero bundled browser bloat, native C compilation, and full transparency on every
						release.
					</p>
				</div>

				{/* Asymmetric 2+1 / 1+2 Bento Architecture Grid */}
				<div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
					{/* Card 1 (2 cols): 5-Tier Chromium Cascade */}
					<article className="surface-card hover-lift flex flex-col justify-between rounded-2xl border border-white/10 bg-card/85 p-6 lg:col-span-2">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Globe className="size-3.5 text-primary" aria-hidden="true" />
							<span>Browser discovery cascade</span>
						</div>

						<div className="my-7 flex flex-col gap-2.5">
							<div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
								<span>Automatic fallback order</span>
								<span className="text-primary">0 MB browser download</span>
							</div>
							<div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
								{CASCADE_TIERS.map((item, idx) => (
									<div
										key={item.tier}
										className={
											idx === 0
												? "flex flex-col gap-1 rounded-xl border border-primary/35 bg-primary/10 px-3 py-2.5"
												: "flex flex-col gap-1 rounded-xl border border-border/60 bg-background/70 px-3 py-2.5"
										}
									>
										<span className="font-mono text-[10px] text-muted-foreground">{item.tier}</span>
										<span className="text-xs font-semibold text-foreground">{item.name}</span>
										<span className="font-mono text-[10px] text-muted-foreground/80">
											{item.channel}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-base font-bold tracking-tight text-foreground">
								Uses the Chromium browser you already have
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">
								Discovers Chrome, pre-installed Windows Edge, Brave, Opera, or Vivaldi
								automatically—or lets you pick a browser from the dropdown.
							</p>
						</div>
					</article>

					{/* Card 2 (1 col): Native Nuitka Binary */}
					<article className="surface-card hover-lift flex flex-col justify-between rounded-2xl border border-white/10 bg-card/85 p-6">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Cpu className="size-3.5 text-primary" aria-hidden="true" />
							<span>Native Windows build</span>
						</div>

						<div className="my-7 flex flex-col gap-2 rounded-xl border border-border/60 bg-background/70 p-3.5 font-mono text-xs">
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Compiler</span>
								<span className="text-foreground">Nuitka + GCC</span>
							</div>
							<div className="h-px bg-border/50" />
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Payload</span>
								<span className="text-primary">~43 MB (Zstd)</span>
							</div>
							<div className="h-px bg-border/50" />
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Verification</span>
								<span className="text-emerald-400">SHA-256 + VT</span>
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-base font-bold tracking-tight text-foreground">
								Single-file native executable
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">
								Compiled via GitHub Actions with SHA-256 checksums and automated VirusTotal scan
								reports on every release.
							</p>
						</div>
					</article>

					{/* Card 3 (1 col): Diagnostics & CDP Recovery */}
					<article className="surface-card hover-lift flex flex-col justify-between rounded-2xl border border-white/10 bg-card/85 p-6">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Terminal className="size-3.5 text-primary" aria-hidden="true" />
							<span>Developer tooling</span>
						</div>

						<div className="my-7 flex flex-col gap-2.5">
							<div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3.5 py-2.5 font-mono text-xs">
								<span className="text-muted-foreground">Diagnostics suite</span>
								<kbd className="rounded-md border border-white/15 bg-card px-2 py-0.5 text-[11px] font-semibold text-foreground">
									F12
								</kbd>
							</div>
							<div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-3.5 py-2.5 font-mono text-xs">
								<span className="text-muted-foreground">CDP recovery port</span>
								<span className="text-primary">localhost:9222</span>
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-base font-bold tracking-tight text-foreground">
								Built-in test suite &amp; session resume
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">
								Simulate edge cases with F12 without burning Gmail accounts, or attach to an
								interrupted browser session via CDP.
							</p>
						</div>
					</article>

					{/* Card 4 (2 cols): 100% Local & Private */}
					<article className="surface-card hover-lift flex flex-col justify-between rounded-2xl border border-white/10 bg-card/85 p-6 lg:col-span-2">
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<ShieldCheck className="size-3.5 text-emerald-400" aria-hidden="true" />
							<span>Privacy guarantee</span>
						</div>

						<div className="my-7 flex flex-col gap-2.5">
							<div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
								<span>Execution boundary</span>
								<span className="font-semibold text-emerald-400">100% Local PC</span>
							</div>
							<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/70 px-4 py-3 font-mono text-xs">
								<div className="flex items-center gap-2 text-foreground">
									<span className="size-2 rounded-full bg-emerald-400" />
									<span>No cloud relays</span>
								</div>
								<span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
								<span className="text-muted-foreground">No analytics</span>
								<span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
								<span className="text-muted-foreground">Saved in results/</span>
								<span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
								<span className="text-muted-foreground">MIT auditable</span>
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-base font-bold tracking-tight text-foreground">
								Your credentials never leave your machine
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">
								All form steps run strictly in your local browser. Extracted offer links and session
								records stay in your local results/ folder with zero remote backend.
							</p>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}
