/**
 * Pure Canvas2D renderers for the 4 dark-mode desktop UI cards along the 3D rail,
 * plus reusable radial glow and dotted-rail sprite generators.
 */

const FONT_SANS = '"Geist Variable", Geist, -apple-system, BlinkMacSystemFont, sans-serif';
const FONT_MONO = '"Geist Mono Variable", "Geist Mono", ui-monospace, monospace';

const COLORS = {
	cardBg: "#131720",
	subBg: "#0c0f15",
	border: "#252f42",
	divider: "#1e2430",
	ink: "#f1f5f9",
	muted: "#94a3b8",
	dim: "#64748b",
	cobalt: "#2563eb",
	sky: "#38bdf8",
	skySoft: "rgba(56, 189, 248, 0.14)",
	emerald: "#34d399",
	emeraldSoft: "rgba(16, 185, 129, 0.16)",
	amber: "#fbbf24",
	amberSoft: "rgba(245, 158, 11, 0.16)",
} as const;

function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number,
) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}

function drawText(
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	font: string,
	color: string,
	align: CanvasTextAlign = "left",
) {
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.textAlign = align;
	ctx.textBaseline = "alphabetic";
	ctx.fillText(text, x, y);
}

function drawPill(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	bg: string,
	label: string,
	color: string,
) {
	drawRoundedRect(ctx, x, y, w, h, 6);
	ctx.fillStyle = bg;
	ctx.fill();
	drawText(ctx, label, x + w / 2, y + h * 0.67, `600 11px ${FONT_MONO}`, color, "center");
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

export function createRadialGlowCanvas(): HTMLCanvasElement {
	const canvas = createCanvas(128, 128);
	const ctx = canvas.getContext("2d");
	if (!ctx) return canvas;
	const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
	gradient.addColorStop(0, "rgba(37, 99, 235, 0.34)");
	gradient.addColorStop(0.55, "rgba(56, 189, 248, 0.08)");
	gradient.addColorStop(1, "rgba(9, 12, 18, 0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 128, 128);
	return canvas;
}

export function createDotSpriteCanvas(): HTMLCanvasElement {
	const canvas = createCanvas(64, 64);
	const ctx = canvas.getContext("2d");
	if (!ctx) return canvas;
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.arc(32, 32, 26, 0, Math.PI * 2);
	ctx.fill();
	return canvas;
}

export function drawStepCard(
	ctx: CanvasRenderingContext2D,
	stepIndex: number,
	width: number,
	height: number,
) {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, width, height);
	ctx.scale(width / 320, height / 224);

	// Outer card shell (concentric 12px radius matching desktop UI)
	drawRoundedRect(ctx, 4, 4, 312, 216, 14);
	ctx.fillStyle = COLORS.cardBg;
	ctx.fill();
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = COLORS.border;
	ctx.stroke();

	ctx.save();
	drawRoundedRect(ctx, 4, 4, 312, 216, 14);
	ctx.clip();

	// Subtle top specular hairline
	ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
	ctx.fillRect(4, 4, 312, 1.5);

	const kind = stepIndex % 4;

	if (kind === 0) {
		// 01 / Profile Setup
		drawPill(ctx, 20, 20, 88, 22, COLORS.skySoft, "01 · PROFILE", COLORS.sky);
		drawPill(ctx, 224, 20, 76, 22, COLORS.subBg, "100% Local", COLORS.muted);

		drawText(ctx, "Sample Target Email", 20, 68, `600 12px ${FONT_SANS}`, COLORS.ink);
		drawRoundedRect(ctx, 20, 78, 280, 32, 6);
		ctx.fillStyle = COLORS.subBg;
		ctx.fill();
		ctx.strokeStyle = COLORS.border;
		ctx.lineWidth = 1;
		ctx.stroke();
		drawText(ctx, "ananya.demo@example.com", 32, 98, `500 12px ${FONT_MONO}`, COLORS.ink);

		drawRoundedRect(ctx, 20, 122, 280, 50, 6);
		ctx.fillStyle = "#0f131b";
		ctx.fill();
		ctx.strokeStyle = COLORS.divider;
		ctx.stroke();
		drawText(ctx, "GENERATED PROFILE", 32, 140, `600 9.5px ${FONT_MONO}`, COLORS.dim);
		drawText(ctx, "Ananya Sharma · +91 8444200182", 32, 159, `500 12px ${FONT_SANS}`, COLORS.ink);

		drawPill(ctx, 20, 184, 98, 24, "#1a202d", "Randomize", COLORS.ink);
		drawPill(ctx, 184, 184, 116, 24, COLORS.cobalt, "Ready to Run", "#ffffff");
	} else if (kind === 1) {
		// 02 / Local Browser Cascade
		drawPill(ctx, 20, 20, 92, 22, COLORS.skySoft, "02 · ENGINE", COLORS.sky);
		drawPill(ctx, 212, 20, 88, 22, COLORS.emeraldSoft, "0 MB Bloat", COLORS.emerald);

		drawText(ctx, "Chromium Discovery Cascade", 20, 68, `600 14px ${FONT_SANS}`, COLORS.ink);
		drawText(
			ctx,
			"Attaches directly to your installed browser",
			20,
			86,
			`500 11px ${FONT_SANS}`,
			COLORS.muted,
		);

		const browsers = [
			{ name: "Google Chrome", channel: "chrome", active: false },
			{ name: "Microsoft Edge", channel: "msedge", active: true },
			{ name: "Brave Browser", channel: "Brave.exe", active: false },
		];

		browsers.forEach((b, i) => {
			const y = 102 + i * 36;
			drawRoundedRect(ctx, 20, y, 280, 28, 6);
			ctx.fillStyle = b.active ? "rgba(37, 99, 235, 0.18)" : COLORS.subBg;
			ctx.fill();
			ctx.strokeStyle = b.active ? COLORS.sky : COLORS.divider;
			ctx.lineWidth = 1;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(34, y + 14, 3.5, 0, Math.PI * 2);
			ctx.fillStyle = b.active ? COLORS.emerald : COLORS.dim;
			ctx.fill();

			drawText(ctx, b.name, 46, y + 18, `600 12px ${FONT_SANS}`, COLORS.ink);
			drawText(
				ctx,
				b.active ? "Attached" : b.channel,
				288,
				y + 18,
				`500 10.5px ${FONT_MONO}`,
				b.active ? COLORS.sky : COLORS.dim,
				"right",
			);
		});
	} else if (kind === 2) {
		// 03 / Human-in-the-loop Confirmation & Safety Guard
		drawPill(ctx, 20, 20, 108, 22, COLORS.amberSoft, "03 · SAFE PAUSE", COLORS.amber);
		drawPill(ctx, 180, 20, 120, 22, COLORS.subBg, "Turnstile Safe", COLORS.muted);

		drawText(ctx, "Human-in-the-Loop Check", 20, 68, `600 14px ${FONT_SANS}`, COLORS.ink);
		drawText(
			ctx,
			"Pauses cleanly for your inbox confirmation",
			20,
			86,
			`500 11px ${FONT_SANS}`,
			COLORS.muted,
		);

		// 6-digit sample confirmation cells
		const digits = ["4", "8", "2", "9", "1", "0"];
		digits.forEach((d, i) => {
			const x = 20 + i * 48;
			drawRoundedRect(ctx, x, 104, 40, 44, 7);
			ctx.fillStyle = COLORS.subBg;
			ctx.fill();
			ctx.strokeStyle = i < 4 ? COLORS.sky : COLORS.border;
			ctx.lineWidth = 1.25;
			ctx.stroke();
			drawText(ctx, d, x + 20, 132, `600 18px ${FONT_MONO}`, COLORS.ink, "center");
		});

		drawRoundedRect(ctx, 20, 164, 280, 40, 6);
		ctx.fillStyle = "#1b160d";
		ctx.fill();
		ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
		ctx.lineWidth = 1;
		ctx.stroke();
		drawText(
			ctx,
			"Challenge & CAPTCHA protection active",
			32,
			188,
			`500 11.5px ${FONT_SANS}`,
			COLORS.amber,
		);
	} else {
		// 04 / Canonical Offer Link & Local Archive
		drawPill(ctx, 20, 20, 104, 22, COLORS.emeraldSoft, "04 · EXTRACTED", COLORS.emerald);
		drawPill(ctx, 212, 20, 88, 22, COLORS.skySoft, "$0.00 Today", COLORS.sky);

		drawText(ctx, "Canonical Offer Link Ready", 20, 68, `600 14px ${FONT_SANS}`, COLORS.ink);
		drawText(
			ctx,
			"Redirects resolved and backed up locally",
			20,
			86,
			`500 11px ${FONT_SANS}`,
			COLORS.muted,
		);

		drawRoundedRect(ctx, 20, 102, 280, 38, 6);
		ctx.fillStyle = "#091711";
		ctx.fill();
		ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
		ctx.lineWidth = 1;
		ctx.stroke();
		drawText(ctx, "one.google.com/offer/AIPLUS-12M", 32, 125, `500 11.5px ${FONT_MONO}`, "#a7f3d0");

		drawRoundedRect(ctx, 20, 152, 280, 52, 6);
		ctx.fillStyle = COLORS.subBg;
		ctx.fill();
		ctx.strokeStyle = COLORS.divider;
		ctx.stroke();
		drawText(ctx, "LOCAL ARCHIVE", 32, 170, `600 9.5px ${FONT_MONO}`, COLORS.dim);
		drawText(
			ctx,
			"results/session_2026.txt · Saved",
			32,
			190,
			`500 11.5px ${FONT_MONO}`,
			COLORS.emerald,
		);
	}

	ctx.restore();
}
