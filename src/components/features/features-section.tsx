import { FeatureStage } from "@/components/features/feature-stage";
import { FEATURE_SPOTLIGHTS, type FeatureSpotlightId } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { useState, type KeyboardEvent } from "react";

export function FeaturesSection() {
	const [activeId, setActiveId] = useState<FeatureSpotlightId>("browser");

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const idx = FEATURE_SPOTLIGHTS.findIndex((item) => item.id === activeId);
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const next = FEATURE_SPOTLIGHTS[(idx + 1) % FEATURE_SPOTLIGHTS.length];
			setActiveId(next.id);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			const prev =
				FEATURE_SPOTLIGHTS[(idx - 1 + FEATURE_SPOTLIGHTS.length) % FEATURE_SPOTLIGHTS.length];
			setActiveId(prev.id);
		}
	};

	return (
		<section
			id="features"
			aria-labelledby="features-heading"
			className="section-scroll-fade relative flex min-h-dvh scroll-mt-4 flex-col justify-center px-4 pt-20 pb-24 sm:scroll-mt-6 sm:px-6 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto w-full max-w-5xl">
				{/* Section Header — crisp one-line display title */}
				<div className="mx-auto max-w-3xl text-center">
					<h2
						id="features-heading"
						className="text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl"
					>
						Simple by design.
					</h2>
					<p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
						Fast, private, and ready to open on Windows—no extra installs, sign-ups, or complicated
						setup.
					</p>
				</div>

				{/* Interactive Split Spotlight */}
				<div className="mt-12 grid items-center gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-12">
					{/* Left: 4 Quiet Hairline Rows */}
					<div
						role="tablist"
						aria-label="Key features"
						aria-orientation="vertical"
						onKeyDown={handleKeyDown}
						className="flex flex-col divide-y divide-border/50 border-y border-border/50 lg:col-span-5"
					>
						{FEATURE_SPOTLIGHTS.map((item) => {
							const isActive = item.id === activeId;
							return (
								<button
									key={item.id}
									role="tab"
									type="button"
									aria-selected={isActive}
									aria-controls="feature-stage-panel"
									onClick={() => setActiveId(item.id)}
									className={cn(
										"tactile-press group relative flex w-full cursor-pointer flex-col gap-1.5 py-5 pl-4 text-left",
										isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
									)}
								>
									<span
										aria-hidden="true"
										className={cn(
											"absolute inset-y-4 left-0 w-0.5 rounded-full transition-[transform,opacity,background-color] duration-200 ease-out",
											isActive
												? "scale-y-100 bg-primary opacity-100"
												: "scale-y-50 bg-white/15 opacity-0 group-hover:opacity-60",
										)}
									/>
									<span className="text-base font-semibold tracking-tight">{item.title}</span>
									<span className="text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
										{item.description}
									</span>
								</button>
							);
						})}
					</div>

					{/* Right: Single Calm Monochrome Stage */}
					<div className="lg:col-span-7">
						<FeatureStage activeId={activeId} />
					</div>
				</div>
			</div>
		</section>
	);
}
