import { WindowsIcon } from "@/components/icons";
import { Grainient } from "@/components/ui/grainient";
import { APP_INFO, SAPPHIRE_GRAINIENT_COLORS } from "@/constants/app-info";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-20 sm:px-6"
		>
			{/* Atmospheric Midnight-to-Sapphire WebGL Grainient */}
			<div className="pointer-events-auto absolute inset-0 z-0">
				<Grainient
					colors={SAPPHIRE_GRAINIENT_COLORS}
					angle={12}
					bands={1}
					speed={0.95}
					flow={0.82}
					scale={1}
					softness={1}
					silk={0.35}
					grainAmount={0.075}
					grainSize={1.2}
					grainAnimated={true}
					interactive={true}
					stir={0.95}
					clickSwirl={false}
					intro={true}
				/>
			</div>

			{/* Seamless atmospheric blend into the page canvas */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t from-background to-transparent"
				aria-hidden="true"
			/>

			{/* Centered Focal Stack: [Emblem] -> [Title] -> [Copy] -> [Primary CTA] */}
			<div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
				<div className="hover-icon-scale size-30 select-none sm:size-38">
					<img
						data-icon-scale
						src="/images/app_icon.png"
						alt="Gemini AI Plus Portal app icon"
						draggable={false}
						width={152}
						height={152}
						fetchPriority="high"
						className="size-full -rotate-7 object-contain drop-shadow-[0_22px_38px_rgba(0,0,0,0.62)] transition-transform duration-250 ease-out select-none"
					/>
				</div>

				<h1 className="mt-8 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-6xl md:text-7xl md:leading-[1.08]">
					{APP_INFO.name}
				</h1>

				<p className="mt-5 max-w-lg text-base leading-relaxed text-white/84 sm:text-lg">
					An open-source Windows utility that automates 12-month Google AI Plus onboarding and
					extracts your official Google One offer link locally.
				</p>

				<div className="mt-9 flex flex-col items-center gap-4">
					<a
						href={APP_INFO.latestReleaseUrl}
						target="_blank"
						rel="noreferrer noopener"
						className="tactile-pill inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/65 bg-linear-to-b from-white via-[#f8fafc] to-[#e2e8f0] px-9 py-3.5 text-[15px] font-semibold text-slate-950 shadow-[0_14px_34px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_18px_42px_rgba(0,0,0,0.55)] sm:px-10 sm:py-4 sm:text-[16px]"
					>
						<WindowsIcon className="size-4 text-slate-900" />
						<span>Download for Windows</span>
					</a>

					<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-white/60 sm:text-[13px]">
						<a
							href={APP_INFO.githubUrl}
							target="_blank"
							rel="noreferrer noopener"
							className="hover-arrow-shift inline-flex items-center gap-1.5 text-white/70 transition-colors duration-150 hover:text-white"
						>
							<span>Open source on GitHub</span>
							<ArrowRight
								data-arrow
								className="size-3.5 transition-transform duration-180 ease-out"
								aria-hidden="true"
							/>
						</a>
						<span aria-hidden="true" className="text-white/25">
							/
						</span>
						<span className="font-mono text-[11px] text-white/55 sm:text-xs">
							{APP_INFO.versionTag} · Portable .exe · 100% Local
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
