import type { LogEntry } from "@/components/preview/use-preview-simulation";
import { cn } from "@/lib/utils";

interface PreviewConsoleProps {
	logs: readonly LogEntry[];
	copiedLog: boolean;
	statusLabel: string;
	statusDotColor: string;
	onCopyLog: () => void;
}

const LOG_TAG_COLORS: Record<NonNullable<LogEntry["tag"]>, string> = {
	OK: "text-emerald-400",
	WAIT: "text-amber-400",
	DIAG: "text-sky-300",
	INFO: "text-primary",
};

export function PreviewConsole({
	logs,
	copiedLog,
	statusLabel,
	statusDotColor,
	onCopyLog,
}: PreviewConsoleProps) {
	return (
		<div className="flex flex-col gap-2.5 rounded-[8px] border border-[#1e2430] bg-[#131720] p-3.5 sm:p-4">
			<div className="flex items-center justify-between gap-2">
				<span className="text-xs font-semibold text-foreground">Live Activity Feed</span>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={onCopyLog}
						className="tactile-press inline-flex h-6.5 w-20 cursor-pointer items-center justify-center rounded-[5px] border border-[#2a3345] bg-[#1a202d] px-2.5 text-[11px] font-medium text-muted-foreground hover:text-foreground"
					>
						{copiedLog ? "Copied" : "Copy Log"}
					</button>
					<span className="inline-flex h-6.5 min-w-32 items-center justify-center gap-1.5 rounded-[5px] border border-[#1e2430] bg-[#0f131b] px-2.5 font-mono text-[11px] font-medium text-emerald-400">
						<span className={cn("size-1.5 shrink-0 rounded-full", statusDotColor)} />
						<span className="text-foreground/90">{statusLabel}</span>
					</span>
				</div>
			</div>

			<div
				aria-live="polite"
				className="flex min-h-42 flex-col gap-1.5 rounded-[6px] border border-[#19202c] bg-[#090b10] p-3.5 font-mono text-xs leading-relaxed"
			>
				{logs.map((entry) => (
					<div key={entry.id} className="flex items-start gap-2.5">
						{entry.time && entry.tag ? (
							<>
								<span className="shrink-0 text-slate-600">{entry.time}</span>
								<span className={cn("shrink-0 font-semibold", LOG_TAG_COLORS[entry.tag])}>
									[{entry.tag}]
								</span>
								<span className="text-slate-300">{entry.text}</span>
							</>
						) : (
							<span className="whitespace-pre-wrap text-slate-300">{entry.text || "\u00A0"}</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
