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
		<div
			role="tablist"
			aria-label="Pipeline steps"
			className="inline-flex items-center gap-1 rounded-[10px] border border-white/10 bg-[#0e1117] p-1"
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
							"tactile-press cursor-pointer rounded-[7px] px-3 py-1.5 font-mono text-xs font-medium",
							isActive
								? "bg-white/12 text-foreground"
								: "text-muted-foreground hover:bg-white/6 hover:text-foreground",
						)}
					>
						{step.step}
					</button>
				);
			})}
		</div>
	);
});
