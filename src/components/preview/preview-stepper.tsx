import type { SimStage } from "@/components/preview/use-preview-simulation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPPER_ITEMS = [
	{ step: 1, label: "Profile Setup" },
	{ step: 2, label: "Step Confirmation" },
	{ step: 3, label: "Access Link Ready" },
] as const;

interface PreviewStepperProps {
	currentStep: number;
	stage: SimStage;
}

export function PreviewStepper({ currentStep, stage }: PreviewStepperProps) {
	return (
		<div className="flex flex-col gap-2.5 rounded-[8px] border border-[#1e2430] bg-[#131720] px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
			{STEPPER_ITEMS.map((item, idx) => {
				const isCompleted = currentStep > item.step || stage === "done";
				const isActive = currentStep === item.step && stage !== "done";
				return (
					<div
						key={item.step}
						className={cn(
							"flex items-center gap-2.5",
							idx < STEPPER_ITEMS.length - 1 && "sm:flex-1",
						)}
					>
						<span
							className={cn(
								"flex size-5.5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors duration-200",
								isCompleted
									? "bg-emerald-500/20 text-emerald-400"
									: isActive
										? "bg-[#2563eb] text-white"
										: "bg-[#1a202d] text-muted-foreground",
							)}
						>
							{isCompleted ? <Check className="size-3" aria-hidden="true" /> : item.step}
						</span>
						<span
							className={cn(
								"text-xs font-medium whitespace-nowrap transition-colors duration-200",
								isCompleted || isActive ? "text-foreground" : "text-muted-foreground",
							)}
						>
							{item.label}
						</span>
						{idx < STEPPER_ITEMS.length - 1 ? (
							<span aria-hidden="true" className="ml-2 hidden h-px flex-1 bg-[#1e2430] sm:block" />
						) : null}
					</div>
				);
			})}
		</div>
	);
}
