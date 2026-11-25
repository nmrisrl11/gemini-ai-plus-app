import { SAMPLE_OUTPUT_URL, type SimStage } from "@/components/preview/use-preview-simulation";
import { APP_INFO } from "@/constants/app-info";
import { Check, Copy, ExternalLink } from "lucide-react";

interface PreviewBannersProps {
	stage: SimStage;
	copiedLink: boolean;
	onConfirmStep: () => void;
	onCopyLink: () => void;
}

export function PreviewBanners({
	stage,
	copiedLink,
	onConfirmStep,
	onCopyLink,
}: PreviewBannersProps) {
	if (stage === "confirm") {
		return (
			<div
				role="region"
				aria-label="Simulated confirmation step"
				className="mobile-nav-popover flex flex-col justify-between gap-3 rounded-[8px] border border-amber-500/35 bg-[#1b160d] px-4 py-3 sm:flex-row sm:items-center"
			>
				<div className="flex flex-col gap-0.5">
					<span className="text-xs font-semibold text-amber-300">
						Simulated human-in-the-loop pause
					</span>
					<p className="text-xs text-amber-100/75">
						In the desktop app, you complete the email confirmation step locally before automation
						resumes.
					</p>
				</div>

				<div className="flex shrink-0 items-center gap-2">
					<span
						aria-label="Sample confirmation code"
						className="rounded-[6px] border border-amber-500/30 bg-[#0c0f15] px-2.5 py-1.5 font-mono text-xs tracking-[0.2em] text-amber-200"
					>
						482910
					</span>
					<button
						type="button"
						onClick={onConfirmStep}
						className="tactile-press h-8 cursor-pointer rounded-[6px] bg-[#2563eb] px-3.5 text-xs font-semibold text-white hover:bg-[#1d4ed8]"
					>
						Continue Preview
					</button>
				</div>
			</div>
		);
	}

	if (stage === "done") {
		return (
			<div
				role="status"
				aria-live="polite"
				className="mobile-nav-popover flex flex-col justify-between gap-3 rounded-[8px] border border-emerald-500/35 bg-[#0d1f17] px-4 py-3 sm:flex-row sm:items-center"
			>
				<div className="flex min-w-0 flex-col gap-1">
					<span className="text-xs font-semibold text-emerald-300">
						Simulated canonical offer link ready
					</span>
					<code className="truncate rounded-[5px] border border-emerald-500/20 bg-[#091711] px-2.5 py-1 font-mono text-xs text-emerald-200">
						{SAMPLE_OUTPUT_URL}
					</code>
				</div>
				<div className="flex shrink-0 items-center gap-2">
					<button
						type="button"
						onClick={onCopyLink}
						className="tactile-press inline-flex h-8 min-w-28 cursor-pointer items-center justify-center gap-1.5 rounded-[6px] bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-500"
					>
						{copiedLink ? (
							<>
								<Check className="size-3.5" aria-hidden="true" />
								<span>Copied</span>
							</>
						) : (
							<>
								<Copy className="size-3.5" aria-hidden="true" />
								<span>Copy Sample</span>
							</>
						)}
					</button>
					<a
						href={APP_INFO.latestReleaseUrl}
						target="_blank"
						rel="noreferrer noopener"
						title="Download Google AI Plus Portal desktop app"
						className="tactile-press inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-emerald-500/30 bg-[#091711] px-3 text-xs font-medium text-emerald-200 hover:bg-emerald-500/15"
					>
						<span>Get Desktop App</span>
						<ExternalLink className="size-3" aria-hidden="true" />
					</a>
				</div>
			</div>
		);
	}

	return null;
}
