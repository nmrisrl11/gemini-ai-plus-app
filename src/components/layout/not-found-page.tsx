import GradientASCII from "@/components/ui/gradient-ascii";
import { APP_INFO, GRADIENT_ASCII_COLORS } from "@/constants/app-info";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface NotFoundPageProps {
	onNavigateHome: () => void;
}

export function NotFoundPage({ onNavigateHome }: NotFoundPageProps) {
	useEffect(() => {
		const prevTitle = document.title;
		document.title = `404 — ${APP_INFO.name}`;
		return () => {
			document.title = prevTitle;
		};
	}, []);

	return (
		<section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6">
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				<GradientASCII
					colors={GRADIENT_ASCII_COLORS}
					shape="rise"
					characters=" .·•●"
					mouseInteraction={false}
					clickEffect="none"
					fontFamily='"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
					intro={true}
					lightMode={false}
				/>
			</div>

			<div
				className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_48%,rgba(9,12,18,0.6)_0%,rgba(9,12,18,0.22)_58%,transparent_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-36 bg-linear-to-t from-background to-transparent"
				aria-hidden="true"
			/>

			<div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
				<h1 className="text-7xl font-extrabold tracking-[-0.04em] text-white sm:text-8xl md:text-9xl">
					404
				</h1>
				<p className="mt-4 max-w-md text-base leading-relaxed text-white/82 sm:text-lg">
					The page you are looking for does not exist or has been moved.
				</p>

				<div className="mt-9 flex flex-col items-center gap-4">
					<button
						type="button"
						onClick={onNavigateHome}
						className="tactile-pill cursor-pointer rounded-full border border-white/60 bg-linear-to-b from-white via-[#fafafa] to-[#e8e8e8] px-10 py-4 text-[16px] font-semibold text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:from-white hover:to-[#f2f2f2] sm:px-11 sm:py-4.5 sm:text-[17px]"
					>
						Return to Homepage
					</button>

					<a
						href={APP_INFO.githubUrl}
						target="_blank"
						rel="noreferrer noopener"
						className="hover-arrow-shift inline-flex items-center gap-1.5 text-xs font-medium text-white/65 transition-colors duration-150 hover:text-white sm:text-[13px]"
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
		</section>
	);
}
