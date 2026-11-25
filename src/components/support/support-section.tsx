import { APP_INFO } from "@/constants/app-info";
import { SUPPORT_CHANNELS } from "@/constants/landing-data";
import { ArrowUpRight, Heart } from "lucide-react";

export function SupportSection() {
	return (
		<section
			id="support"
			aria-labelledby="support-heading"
			className="relative scroll-mt-4 px-4 pt-20 pb-24 sm:scroll-mt-6 sm:px-6 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto max-w-6xl">
				<div className="surface-card mx-auto max-w-2xl rounded-3xl border border-white/10 bg-card/75 p-6 backdrop-blur-sm sm:p-10">
					<div className="mx-auto max-w-lg text-center">
						<div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
							<Heart className="size-3.5 fill-primary/20" aria-hidden="true" />
							<span>Support development</span>
						</div>

						<h2
							id="support-heading"
							className="mt-3.5 text-2xl font-extrabold tracking-[-0.03em] text-foreground sm:text-3xl"
						>
							Keep independent tooling free.
						</h2>

						<p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
							Gemini AI Plus Portal is free, open-source, and runs 100% locally. Contributions help
							fund ongoing gateway updates and releases.
						</p>
					</div>

					<div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
						{SUPPORT_CHANNELS.map((channel) => (
							<div
								key={channel.id}
								className="flex flex-col items-center justify-between rounded-2xl border border-border/80 bg-background/60 p-5 text-center transition-colors duration-150 hover:border-white/18"
							>
								<div className="flex w-full flex-col items-center">
									<h3 className="text-sm font-bold text-foreground">{channel.title}</h3>
									<span className="mt-0.5 font-mono text-[11px] text-muted-foreground">
										{channel.methods}
									</span>

									<div className="mt-4 flex size-40 items-center justify-center rounded-xl border border-border/60 bg-white p-2.5 shadow-md">
										<img
											src={channel.qrImage}
											alt={channel.qrAlt}
											width={160}
											height={160}
											loading="lazy"
											decoding="async"
											className="size-full object-contain"
										/>
									</div>

									<span className="mt-3 font-mono text-[11px] text-muted-foreground">
										{channel.instruction}
									</span>
								</div>

								{channel.actionUrl ? (
									<div className="mt-4 w-full border-t border-border/60 pt-3">
										<a
											href={channel.actionUrl}
											target="_blank"
											rel="noreferrer noopener"
											className="tactile-press inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:border-primary/45 hover:bg-primary/18"
										>
											<span>{channel.actionLabel}</span>
											<ArrowUpRight className="size-3.5" aria-hidden="true" />
										</a>
									</div>
								) : null}
							</div>
						))}
					</div>

					<div className="mt-8 flex flex-col items-center justify-between gap-2 pt-2 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
						<div>
							<span>Built by </span>
							<a
								href={APP_INFO.devGithub}
								target="_blank"
								rel="noreferrer noopener"
								className="font-medium text-primary hover:underline"
							>
								@nmrisrl11
							</a>
							<span className="mx-1.5 text-muted-foreground/50">·</span>
							<a
								href={APP_INFO.devUrl}
								target="_blank"
								rel="noreferrer noopener"
								className="text-foreground/80 transition-colors duration-150 hover:text-foreground"
							>
								nmrisrl.dev
							</a>
						</div>
						<span className="font-mono text-[11px] text-muted-foreground/75">
							MIT License · Free Community Tool
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
