import { Grainient } from "@/components/ui/grainient";
import { APP_INFO, SAPPHIRE_GRAINIENT_COLORS } from "@/constants/app-info";
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
		<section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-20 sm:px-6">
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
						className="tactile-pill cursor-pointer rounded-full border border-white/65 bg-linear-to-b from-white via-[#f8fafc] to-[#e2e8f0] px-9 py-3.5 text-[15px] font-semibold text-slate-950 shadow-[0_14px_34px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,1)] sm:px-10 sm:py-4 sm:text-[16px]"
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
