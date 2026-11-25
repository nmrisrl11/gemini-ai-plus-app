import type { HowItWorksStep } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface StepProgressRailProps {
	steps: readonly HowItWorksStep[];
	activeIndex: number;
	onSelectStep: (index: number) => void;
}

export const StepProgressRail = memo(function StepProgressRail({
	steps,
	activeIndex,
	onSelectStep,
}: StepProgressRailProps) {
	return (
		<div className="pointer-events-none absolute inset-x-4 top-20 z-20 sm:inset-x-6 sm:top-24">
			<div className="mx-auto flex max-w-6xl justify-end">
				<div
					role="tablist"
					aria-label="Pipeline steps"
					className="pointer-events-auto flex items-center gap-1 rounded-[8px] border border-white/10 bg-[#090c12]/80 p-1 backdrop-blur-xl"
				>
					{steps.map((step, idx) => {
						const isActive = idx === activeIndex;
						return (
							<button
								key={step.id}
								role="tab"
								type="button"
								aria-selected={isActive}
								aria-label={`Jump to step ${step.step}: ${step.title}`}
								onClick={() => onSelectStep(idx)}
								className={cn(
									"tactile-press cursor-pointer rounded-[6px] px-2.5 py-1 font-mono text-[11px] font-semibold",
									isActive
										? "bg-primary/18 text-primary"
										: "text-muted-foreground hover:bg-white/6 hover:text-foreground",
								)}
							>
								{step.step}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
});
