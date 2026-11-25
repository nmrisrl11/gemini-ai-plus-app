import { PLAN_BENEFITS, type PlanBenefitIcon } from "@/constants/landing-data";
import { Clapperboard, HardDrive, Mail, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

const BENEFIT_ICONS: Record<PlanBenefitIcon, ComponentType<{ className?: string }>> = {
	sparkles: Sparkles,
	storage: HardDrive,
	flow: Clapperboard,
	workspace: Mail,
};

export function PlanBenefitsRail() {
	return (
		<div className="surface-card mt-5 w-full overflow-hidden rounded-[12px] border border-white/10 bg-[#0e1117]/90">
			{/* Rail Header */}
			<div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1e2430] px-4 py-2.5">
				<span className="text-xs font-semibold tracking-tight text-foreground">
					Included with Google AI Plus
				</span>
				<span className="font-mono text-[11px] font-medium text-primary">
					12 months · $0.00 during promo
				</span>
			</div>

			{/* 4-Column Hairline Spec Grid */}
			<div className="grid grid-cols-1 divide-y divide-[#1e2430] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
				{PLAN_BENEFITS.map((benefit, idx) => {
					const Icon = BENEFIT_ICONS[benefit.icon];
					return (
						<div
							key={benefit.title}
							className={
								idx >= 2
									? "flex flex-col justify-between gap-3 p-4 transition-colors duration-150 hover:bg-[#131720]/70 sm:border-t sm:border-[#1e2430] lg:border-t-0"
									: "flex flex-col justify-between gap-3 p-4 transition-colors duration-150 hover:bg-[#131720]/70"
							}
						>
							<div className="flex items-center justify-between gap-2">
								<span className="flex size-7 items-center justify-center rounded-[6px] border border-[#1e2430] bg-[#131720] text-muted-foreground">
									<Icon className="size-3.5" aria-hidden="true" />
								</span>
								<span className="rounded-[5px] border border-[#1e2430] bg-[#0b0d11] px-2 py-0.5 font-mono text-[10px] font-medium text-foreground/85">
									{benefit.spec}
								</span>
							</div>

							<div className="flex flex-col gap-1">
								<h3 className="text-[13px] font-semibold tracking-tight text-foreground">
									{benefit.title}
								</h3>
								<p className="text-xs leading-relaxed text-muted-foreground">{benefit.detail}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
