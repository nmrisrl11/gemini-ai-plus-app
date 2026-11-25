import { HeroScrollCue } from "@/components/hero/hero-scroll-cue";
import GradientASCII from "@/components/ui/gradient-ascii";
import { APP_INFO, GRADIENT_ASCII_COLORS } from "@/constants/app-info";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex min-h-dvh w-full flex-col items-center justify-between overflow-hidden bg-background px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12"
		>
			{/* GradientASCII WebGL2 Backdrop */}
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
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
						src="/images/app_icon.png"
						alt="Gemini AI Plus Portal app icon"
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

				<p className="mt-5 max-w-lg text-base leading-relaxed text-white/84 sm:text-lg">
					An open-source Windows utility that automates 12-month Google AI Plus onboarding and
					extracts your official Google One offer link locally.
				</p>

				<div className="mt-9 flex flex-col items-center">
					<a
						href={APP_INFO.latestReleaseUrl}
						target="_blank"
						rel="noreferrer noopener"
						className="tactile-pill inline-flex cursor-pointer items-center justify-center rounded-full border border-white/60 bg-linear-to-b from-white via-[#fafafa] to-[#e8e8e8] px-10 py-4 text-[16px] font-semibold text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:from-white hover:to-[#f2f2f2] sm:px-11 sm:py-4.5 sm:text-[17px]"
					>
						Download for Windows
					</a>

					<a
						href={APP_INFO.githubUrl}
						target="_blank"
						rel="noreferrer noopener"
						className="hover-arrow-shift mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/55 transition-colors duration-150 hover:text-white/90 sm:text-[13px]"
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
