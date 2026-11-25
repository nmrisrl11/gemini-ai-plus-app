import GradientASCII from "@/components/ui/gradient-ascii";
import { APP_INFO, GRADIENT_ASCII_COLORS } from "@/constants/app-info";

export function DownloadSection() {
	return (
		<section
			id="download"
			aria-labelledby="download-heading"
			className="relative -mb-px flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-24 sm:px-6 sm:py-32"
		>
			{/* Rising GradientASCII WebGL2 Backdrop — mirrors the hero to close the page loop */}
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				<GradientASCII
					colors={GRADIENT_ASCII_COLORS}
					shape="rise"
					characters=" .·•●"
					mouseInteraction={false}
					clickEffect="none"
					fontFamily='"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
					intro={false}
					lightMode={false}
				/>
			</div>

			{/* Subtle center readability veil + seamless top & bottom blends */}
			<div
				className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_48%,rgba(9,12,18,0.6)_0%,rgba(9,12,18,0.22)_58%,transparent_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 -top-1 z-0 h-40 bg-linear-to-b from-background to-transparent sm:h-48"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 -bottom-1 z-0 h-40 bg-linear-to-t from-background to-transparent sm:h-48"
				aria-hidden="true"
			/>

			<div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
				<div className="size-28 select-none sm:size-34">
					<img
						src="/icons/512.webp"
						alt="Google AI Plus Portal app icon"
						title="Google AI Plus Portal"
						draggable={false}
						width={136}
						height={136}
						loading="lazy"
						className="size-full -rotate-8 object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.6)] select-none"
					/>
				</div>

				<h2
					id="download-heading"
					className="mt-7 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl sm:whitespace-nowrap md:text-6xl md:leading-[1.08]"
				>
					Ready when you are.
				</h2>

				<p className="mt-4 max-w-lg text-base leading-relaxed text-balance text-white/82 sm:text-lg">
					Open source and runs locally on Windows. Download the desktop app to set up your 12-month
					Google AI Plus promotional offer.
				</p>

				<div className="mt-9">
					<a
						href={APP_INFO.latestReleaseUrl}
						target="_blank"
						rel="noreferrer noopener"
						title="Download Google AI Plus Portal for Windows"
						className="tactile-pill inline-flex cursor-pointer items-center justify-center rounded-full border border-white/60 bg-linear-to-b from-white via-[#fafafa] to-[#e8e8e8] px-10 py-4 text-[16px] font-semibold text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:from-white hover:to-[#f2f2f2] sm:px-11 sm:py-4.5 sm:text-[17px]"
					>
						Download for Windows
					</a>
				</div>
			</div>
		</section>
	);
}
