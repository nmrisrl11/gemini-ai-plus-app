import { PlanBenefitsRail } from "@/components/preview/plan-benefits-rail";
import { PreviewBanners } from "@/components/preview/preview-banners";
import { PreviewConsole } from "@/components/preview/preview-console";
import { PreviewProfileCard } from "@/components/preview/preview-profile-card";
import { PreviewStepper } from "@/components/preview/preview-stepper";
import { usePreviewSimulation } from "@/components/preview/use-preview-simulation";
import { APP_INFO } from "@/constants/app-info";

export function PreviewSection() {
	const sim = usePreviewSimulation();

	return (
		<section
			id="preview"
			aria-labelledby="preview-heading"
			className="section-scroll-fade relative flex min-h-dvh scroll-mt-4 flex-col justify-center px-4 pt-20 pb-24 sm:scroll-mt-6 sm:px-6 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto flex w-full max-w-5xl flex-col items-center">
				{/* Section Header */}
				<div className="mx-auto max-w-xl text-center">
					<h2
						id="preview-heading"
						className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
					>
						See how it runs.
					</h2>
					<p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
						Explore an interactive preview of the Windows desktop app using sample data—nothing is
						entered or sent here.
					</p>
				</div>

				{/* Desktop Window Frame — concentric radius scale (12px outer -> 8px card -> 6px controls) */}
				<div className="surface-chassis mt-10 w-full overflow-hidden rounded-[12px] border border-white/10 bg-[#0b0d11] sm:mt-12">
					{/* App Topbar */}
					<div className="flex items-center justify-between border-b border-[#1e2430] bg-[#0e1117] px-4 py-2.5">
						<div className="flex items-center gap-2">
							<img
								src="/icons/512.webp"
								alt="Google AI Plus Portal icon"
								title="Google AI Plus Portal"
								width={18}
								height={18}
								className="size-4.5 shrink-0 object-contain"
							/>
							<span className="text-xs font-semibold tracking-tight text-foreground sm:text-[13px]">
								{APP_INFO.name}
							</span>
						</div>

						<div className="flex items-center gap-3.5 text-xs font-medium text-muted-foreground">
							<span className="hidden rounded-[5px] border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] text-primary md:inline-flex">
								Interactive UI Preview
							</span>
							<a
								href={APP_INFO.githubUrl}
								target="_blank"
								rel="noreferrer noopener"
								title="About Google AI Plus Portal on GitHub"
								className="transition-colors duration-150 hover:text-foreground"
							>
								About
							</a>
						</div>
					</div>

					{/* Desktop Window Body */}
					<div className="flex flex-col gap-3 p-3.5 sm:p-4">
						<PreviewProfileCard
							profile={sim.activeProfile}
							fullName={sim.fullName}
							isShuffling={sim.isShuffling}
							showCustomize={sim.showCustomize}
							browser={sim.browser}
							stage={sim.stage}
							isBusy={sim.isBusy}
							onBrowserChange={sim.setBrowser}
							onRandomize={sim.handleRandomize}
							onToggleCustomize={sim.handleToggleCustomize}
							onReset={sim.handleReset}
							onStartSimulation={sim.handleStartSimulation}
						/>

						<PreviewStepper currentStep={sim.currentStep} stage={sim.stage} />

						<PreviewBanners
							stage={sim.stage}
							copiedLink={sim.copiedLink}
							onConfirmStep={sim.handleConfirmStep}
							onCopyLink={sim.handleCopyLink}
						/>

						<PreviewConsole
							logs={sim.logs}
							copiedLog={sim.copiedLog}
							statusLabel={sim.statusLabel}
							statusDotColor={sim.statusDotColor}
							onCopyLog={sim.handleCopyLog}
						/>
					</div>

					{/* Desktop Window Bottom Status Bar */}
					<div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1e2430] bg-[#0e1117] px-4 py-2 text-[11px] text-muted-foreground/75">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
							<span>Developed by @nmrisrl11</span>
							<span aria-hidden="true">·</span>
							<a
								href={APP_INFO.githubUrl}
								target="_blank"
								rel="noreferrer noopener"
								title="About Google AI Plus Portal on GitHub"
								className="transition-colors duration-150 hover:text-foreground"
							>
								GitHub
							</a>
							<span aria-hidden="true">·</span>
							<a
								href={APP_INFO.bmcUrl}
								target="_blank"
								rel="noreferrer noopener"
								title="Support development on Buy Me a Coffee"
								className="transition-colors duration-150 hover:text-foreground"
							>
								Buy Me a Coffee
							</a>
						</div>

						<div className="flex items-center gap-2 font-mono text-[10px]">
							<span>F1 About</span>
							<span aria-hidden="true">·</span>
							<button
								type="button"
								onClick={sim.handleRunDiagnostics}
								className="cursor-pointer text-muted-foreground/80 transition-colors duration-150 hover:text-primary"
							>
								F12 Diagnostics
							</button>
						</div>
					</div>
				</div>

				{/* Redesigned Google AI Plus Plan Benefits Spec Rail */}
				<PlanBenefitsRail />
			</div>
		</section>
	);
}
