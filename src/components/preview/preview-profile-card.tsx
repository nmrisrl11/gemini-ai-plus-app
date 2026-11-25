import type { SimStage } from "@/components/preview/use-preview-simulation";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BROWSER_OPTIONS, type BrowserOption, type DemoProfile } from "@/constants/landing-data";
import { cn } from "@/lib/utils";
import { Shuffle } from "lucide-react";
import { useId } from "react";

interface PreviewProfileCardProps {
	profile: DemoProfile;
	fullName: string;
	isShuffling: boolean;
	showCustomize: boolean;
	browser: BrowserOption;
	stage: SimStage;
	isBusy: boolean;
	onBrowserChange: (value: BrowserOption) => void;
	onRandomize: () => void;
	onToggleCustomize: () => void;
	onReset: () => void;
	onStartSimulation: () => void;
}

export function PreviewProfileCard({
	profile,
	fullName,
	isShuffling,
	showCustomize,
	browser,
	stage,
	isBusy,
	onBrowserChange,
	onRandomize,
	onToggleCustomize,
	onReset,
	onStartSimulation,
}: PreviewProfileCardProps) {
	const browserId = useId();

	const detailFields = [
		{ label: "First Name", value: profile.firstName },
		{ label: "Last Name", value: profile.lastName },
		{ label: "Regional Contact", value: profile.phone },
	] as const;

	return (
		<div className="flex flex-col gap-3 rounded-[8px] border border-[#1e2430] bg-[#131720] p-3.5 sm:p-4">
			{/* Read-only Sample Account Display */}
			<div className="flex flex-col gap-1.5">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<span className="text-xs font-semibold text-foreground">Sample Target Email</span>
					<span className="text-[11px] text-muted-foreground">
						Read-only sandbox preview · Runs locally in the desktop app
					</span>
				</div>
				<div
					aria-label="Sample preview email address"
					className="flex h-9 w-full items-center justify-between rounded-[6px] border border-[#273042] bg-[#0c0f15] px-3 text-foreground/90"
				>
					<span
						data-transitioning={isShuffling}
						className="profile-crossfade truncate font-mono text-xs sm:text-[13px]"
					>
						{profile.sampleEmail}
					</span>
					<span className="shrink-0 font-mono text-[10px] text-muted-foreground/75">
						sample data
					</span>
				</div>
			</div>

			{/* GENERATED PROFILE Inset Subcard */}
			<div className="flex flex-col gap-2.5 rounded-[6px] border border-[#1e2430] bg-[#0f131b] px-3.5 py-2.5">
				<div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
					<div className="flex flex-col gap-0.5">
						<span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
							Generated Profile
						</span>
						<p
							data-transitioning={isShuffling}
							className="profile-crossfade text-xs text-foreground/90 sm:text-[13px]"
						>
							<span>{fullName}</span>
							<span className="mx-1.5 text-muted-foreground/60">·</span>
							<span className="font-mono">{profile.phone}</span>
							<span className="mx-1.5 text-muted-foreground/60">·</span>
							<span className="text-muted-foreground">
								Generated key ({profile.keyLength} chars)
							</span>
						</p>
					</div>

					<div className="flex shrink-0 items-center gap-2">
						<button
							type="button"
							onClick={onRandomize}
							disabled={isBusy}
							className="tactile-press inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[6px] border border-[#2a3345] bg-[#1a202d] px-3 text-xs font-medium text-foreground hover:bg-[#232b3b] disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Shuffle className="size-3.5 text-muted-foreground" aria-hidden="true" />
							<span>Randomize</span>
						</button>
						<button
							type="button"
							onClick={onToggleCustomize}
							aria-expanded={showCustomize}
							className={cn(
								"tactile-press inline-flex h-8 cursor-pointer items-center rounded-[6px] border px-3 text-xs font-medium",
								showCustomize
									? "border-primary/40 bg-primary/14 text-primary"
									: "border-[#2a3345] bg-[#1a202d] text-foreground hover:bg-[#232b3b]",
							)}
						>
							Customize
						</button>
					</div>
				</div>

				{showCustomize ? (
					<div className="mobile-nav-popover grid grid-cols-1 gap-2 border-t border-[#1e2430] pt-2.5 sm:grid-cols-3">
						{detailFields.map((field) => (
							<div
								key={field.label}
								className="flex flex-col gap-0.5 rounded-[5px] border border-[#1e2430] bg-[#0c0f15] px-2.5 py-2"
							>
								<span className="text-[10px] text-muted-foreground">{field.label}</span>
								<span className="font-mono text-xs text-foreground">{field.value}</span>
							</div>
						))}
					</div>
				) : null}
			</div>

			{/* Controls Row */}
			<div className="flex flex-col justify-between gap-3 pt-0.5 sm:flex-row sm:items-center">
				<div className="flex items-center gap-2.5">
					<label htmlFor={browserId} className="text-xs font-medium text-muted-foreground">
						Browser
					</label>
					<Select
						value={browser}
						onValueChange={(value) => onBrowserChange(value as BrowserOption)}
						disabled={isBusy}
					>
						<SelectTrigger
							id={browserId}
							aria-label="Browser engine"
							className="h-8.5 w-44 cursor-pointer rounded-[6px] border-[#273042] bg-[#0c0f15] text-xs font-medium text-foreground hover:border-white/25 dark:bg-[#0c0f15] dark:hover:bg-[#101520]"
						>
							<SelectValue />
						</SelectTrigger>
						<SelectContent
							position="popper"
							align="start"
							className="rounded-[8px] border border-[#273042] bg-[#131720] text-foreground shadow-xl"
						>
							<SelectGroup>
								{BROWSER_OPTIONS.map((opt) => (
									<SelectItem
										key={opt}
										value={opt}
										className="cursor-pointer rounded-[5px] text-xs focus:bg-[#1e2638] focus:text-foreground"
									>
										{opt}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onClick={onReset}
						className="tactile-press inline-flex h-8.5 cursor-pointer items-center justify-center rounded-[6px] border border-[#2a3345] bg-[#1a202d] px-3.5 text-xs font-medium text-foreground hover:bg-[#232b3b]"
					>
						Reset Fields
					</button>
					<button
						type="button"
						onClick={onStartSimulation}
						disabled={isBusy || stage === "confirm"}
						className="tactile-press inline-flex h-8.5 min-w-44 cursor-pointer items-center justify-center rounded-[6px] bg-[#2563eb] px-4.5 text-xs font-semibold text-white hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-55 sm:text-[13px]"
					>
						{stage === "done" ? "Replay Preview" : "Get 1-Year Access Link"}
					</button>
				</div>
			</div>
		</div>
	);
}
