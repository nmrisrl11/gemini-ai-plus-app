import { HeroScrollCue } from "@/components/hero/hero-scroll-cue";
import GradientASCII from "@/components/ui/gradient-ascii";
import { APP_INFO, GRADIENT_ASCII_COLORS } from "@/constants/app-info";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
	isPaused?: boolean;
	isRevealed?: boolean;
}

export function HeroSection({ isPaused = false, isRevealed = false }: HeroSectionProps) {
	const [shouldMountBg, setShouldMountBg] = useState(false);
	const showPausedState = isPaused && isRevealed;

	// Defer WebGL2 shader compilation until after initial paint to minimize Total Blocking Time
	useEffect(() => {
		if (typeof window === "undefined") return undefined;
		if ("requestIdleCallback" in window) {
			const id = window.requestIdleCallback(() => setShouldMountBg(true), { timeout: 250 });
			return () => window.cancelIdleCallback(id);
		}
		const timer = globalThis.setTimeout(() => setShouldMountBg(true), 120);
		return () => globalThis.clearTimeout(timer);
	}, []);

	return (
		<section
			id="hero"
			className="hero-scroll-fade relative flex min-h-dvh w-full flex-col items-center justify-between overflow-hidden bg-background px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12"
		>
			{/* GradientASCII WebGL2 Backdrop */}
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				{shouldMountBg ? (
					<GradientASCII
						colors={GRADIENT_ASCII_COLORS}
						shape="horizon"
						characters=" .·•●"
						mouseInteraction={false}
						clickEffect="none"
						fontFamily='"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
						intro={true}
						lightMode={false}
					/>
				) : null}
			</div>

			{/* Subtle center readability veil + seamless bottom blend */}
			<div
				className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_46%,rgba(9,12,18,0.58)_0%,rgba(9,12,18,0.22)_58%,transparent_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-36 bg-linear-to-t from-background to-transparent"
				aria-hidden="true"
			/>

			{/* Centered Focal Stack */}
			<div className="relative z-10 my-auto flex w-full max-w-4xl flex-col items-center text-center">
				<div className="size-32 select-none sm:size-40">
					<img
						src="/icons/320.webp"
						srcSet="/icons/160.webp 1x, /icons/320.webp 2x"
						alt={`${APP_INFO.name} app icon`}
						title={APP_INFO.name}
						draggable={false}
						width={160}
						height={160}
						fetchPriority="high"
						className="size-full -rotate-8 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] select-none"
					/>
				</div>

				<h1 className="mt-8 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.08] lg:whitespace-nowrap">
					{APP_INFO.name}
				</h1>

				<p className="mt-5 max-w-lg text-base leading-relaxed text-white/86 sm:text-lg">
					An open-source Windows utility that automates 12-month Google AI Plus onboarding and
					extracts your direct Google One offer link locally.
				</p>

				<div className="mt-9 flex flex-col items-center">
					<a
						href={APP_INFO.latestReleaseUrl}
						target="_blank"
						rel="noreferrer noopener"
						title={
							showPausedState
								? "Provisioning is temporarily paused to protect your Gmail account — download Google AI Plus Portal for Windows"
								: "Download Google AI Plus Portal for Windows"
						}
						className={cn(
							"tactile-pill inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-10 py-4 text-[16px] font-semibold text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] sm:px-11 sm:py-4.5 sm:text-[17px]",
							showPausedState
								? "border-rose-200/50 bg-linear-to-b from-[#fffaf8] via-[#f5efec] to-[#e6dcd8] hover:from-[#fffaf8] hover:to-[#eee5e1]"
								: "border-white/60 bg-linear-to-b from-white via-[#fafafa] to-[#e8e8e8] hover:from-white hover:to-[#f2f2f2]",
						)}
					>
						{showPausedState ? (
							<span className="size-2 rounded-full bg-rose-500" aria-hidden="true" />
						) : null}
						<span>Download for Windows</span>
					</a>

					<a
						href={APP_INFO.githubUrl}
						target="_blank"
						rel="noreferrer noopener"
						title="View Google AI Plus Portal source code on GitHub"
						className="hover-arrow-shift mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/78 transition-colors duration-150 hover:text-white sm:text-[13px]"
					>
						<span>Open source on GitHub</span>
						<ArrowRight
							data-arrow
							className="size-3.5 transition-transform duration-180 ease-out"
							aria-hidden="true"
						/>
					</a>
				</div>
			</div>

			{/* Bottom scroll cue with scroll-driven fade out/in */}
			<HeroScrollCue />
		</section>
	);
}
