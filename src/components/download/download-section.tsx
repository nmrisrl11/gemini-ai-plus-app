import { WindowsIcon } from "@/components/icons";
import { Grainient } from "@/components/ui/grainient";
import { APP_INFO, SAPPHIRE_GRAINIENT_COLORS } from "@/constants/app-info";
import { ArrowRight } from "lucide-react";

export function DownloadSection() {
	return (
		<section
			id="download"
			aria-labelledby="download-heading"
			className="relative -mb-px flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 pt-28 pb-36 sm:px-6 sm:pt-36 sm:pb-44"
		>
			{/* Atmospheric Sapphire Grainient */}
			<div className="pointer-events-auto absolute inset-0 z-0">
				<Grainient
					colors={SAPPHIRE_GRAINIENT_COLORS}
					angle={192}
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
					intro={false}
				/>
			</div>

			{/* Top & bottom blends into the obsidian background */}
			<div
				className="pointer-events-none absolute inset-x-0 -top-1 z-0 h-40 bg-linear-to-b from-background to-transparent sm:h-48"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 -bottom-1 z-0 h-48 bg-linear-to-t from-background to-transparent sm:h-60"
				aria-hidden="true"
			/>

			<div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
				<div className="size-22 select-none sm:size-26">
					<img
						src="/images/app_icon.png"
						alt=""
						aria-hidden="true"
						draggable={false}
						width={104}
						height={104}
						loading="lazy"
						className="size-full -rotate-7 object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.6)] select-none"
					/>
				</div>

				<h2
					id="download-heading"
					className="mt-7 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl md:leading-[1.12]"
				>
					Ready in under a minute.
				</h2>

				<p className="mt-4 max-w-lg text-sm leading-relaxed text-white/82 sm:text-base">
					Free, MIT open-source, and 100% local on Windows. Download the portable executable or
					build directly from source.
				</p>

				<div className="mt-8 flex flex-col items-center gap-4">
					<a
						href={APP_INFO.latestReleaseUrl}
						target="_blank"
						rel="noreferrer noopener"
						className="tactile-pill inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/65 bg-linear-to-b from-white via-[#f8fafc] to-[#e2e8f0] px-9 py-3.5 text-[15px] font-semibold text-slate-950 shadow-[0_14px_34px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_18px_42px_rgba(0,0,0,0.55)] sm:px-10 sm:py-4 sm:text-[16px]"
					>
						<WindowsIcon className="size-4 text-slate-900" />
						<span>Download for Windows</span>
					</a>

					<a
						href={APP_INFO.githubUrl}
						target="_blank"
						rel="noreferrer noopener"
						className="hover-arrow-shift inline-flex items-center gap-1.5 text-xs font-medium text-white/65 transition-colors duration-150 hover:text-white sm:text-[13px]"
					>
						<span>Inspect source on GitHub</span>
						<ArrowRight
							data-arrow
							className="size-3.5 transition-transform duration-180 ease-out"
							aria-hidden="true"
						/>
					</a>
				</div>
			</div>
		</section>
	);
}
