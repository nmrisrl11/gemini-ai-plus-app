/**
 * Pure Canvas2D renderers for the 4 calm, monochrome dark-mode UI cards along the 3D rail,
 * plus reusable radial depth-glow and dotted-rail sprite generators.
 */

const FONT_SANS = '"Geist Variable", Geist, -apple-system, BlinkMacSystemFont, sans-serif';
const FONT_MONO = '"Geist Mono Variable", "Geist Mono", ui-monospace, monospace';

const COLORS = {
	cardBg: "#0e1117",
	surface: "#131720",
	subBg: "#0a0d13",
	border: "#222938",
	borderActive: "#323d52",
	divider: "#1b202b",
	ink: "#f1f5f9",
	muted: "#94a3b8",
	dim: "#64748b",
	cobalt: "#2563eb",
	accent: "#38bdf8",
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

function drawCardHeader(ctx: CanvasRenderingContext2D, leftLabel: string, rightLabel: string) {
	drawText(ctx, leftLabel, 22, 32, `500 10.5px ${FONT_MONO}`, COLORS.muted);
	drawText(ctx, rightLabel, 298, 32, `500 10.5px ${FONT_MONO}`, COLORS.dim, "right");
	ctx.fillStyle = COLORS.divider;
	ctx.fillRect(22, 44, 276, 1);
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
	gradient.addColorStop(0, "rgba(37, 99, 235, 0.16)");
	gradient.addColorStop(0.55, "rgba(56, 189, 248, 0.04)");
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
	drawRoundedRect(ctx, 4, 4, 312, 216, 12);
	ctx.fillStyle = COLORS.cardBg;
	ctx.fill();
	ctx.lineWidth = 1.25;
	ctx.strokeStyle = COLORS.border;
	ctx.stroke();

	ctx.save();
	drawRoundedRect(ctx, 4, 4, 312, 216, 12);
	ctx.clip();

	// Subtle top specular hairline
	ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
	ctx.fillRect(4, 4, 312, 1);

	const kind = stepIndex % 4;

	if (kind === 0) {
		// 01 · Setup
		drawCardHeader(ctx, "01 · Setup", "Local only");

		drawText(ctx, "Sample email", 22, 68, `500 11px ${FONT_SANS}`, COLORS.muted);
		drawRoundedRect(ctx, 22, 76, 276, 32, 6);
		ctx.fillStyle = COLORS.subBg;
		ctx.fill();
		ctx.strokeStyle = COLORS.divider;
		ctx.lineWidth = 1;
		ctx.stroke();
		drawText(ctx, "ananya.demo@example.com", 32, 96, `500 11.5px ${FONT_MONO}`, COLORS.ink);

		drawRoundedRect(ctx, 22, 118, 276, 46, 6);
		ctx.fillStyle = COLORS.surface;
		ctx.fill();
		ctx.strokeStyle = COLORS.divider;
		ctx.stroke();
		drawText(ctx, "Profile details", 32, 135, `500 10px ${FONT_SANS}`, COLORS.dim);
		drawText(ctx, "Ananya Sharma · +91 8444200182", 32, 153, `500 11.5px ${FONT_SANS}`, COLORS.ink);

		// Quiet secondary + single brand primary button
		drawRoundedRect(ctx, 22, 176, 92, 26, 6);
		ctx.fillStyle = COLORS.surface;
		ctx.fill();
		ctx.strokeStyle = COLORS.border;
		ctx.stroke();
		drawText(ctx, "Shuffle", 68, 193, `500 11px ${FONT_SANS}`, COLORS.muted, "center");

		drawRoundedRect(ctx, 204, 176, 94, 26, 6);
		ctx.fillStyle = COLORS.cobalt;
		ctx.fill();
		drawText(ctx, "Start", 251, 193, `600 11px ${FONT_SANS}`, "#ffffff", "center");
	} else if (kind === 1) {
		// 02 · Browser
		drawCardHeader(ctx, "02 · Browser", "Auto-detected");

		drawText(ctx, "Uses your browser", 22, 70, `600 13.5px ${FONT_SANS}`, COLORS.ink);
		drawText(ctx, "No extra browser download needed", 22, 87, `500 11px ${FONT_SANS}`, COLORS.dim);

		const browsers = [
			{ name: "Google Chrome", active: false },
			{ name: "Microsoft Edge", active: true },
			{ name: "Brave", active: false },
		];

		browsers.forEach((b, i) => {
			const y = 102 + i * 35;
			drawRoundedRect(ctx, 22, y, 276, 28, 6);
			ctx.fillStyle = b.active ? COLORS.surface : COLORS.subBg;
			ctx.fill();
			ctx.strokeStyle = b.active ? COLORS.borderActive : COLORS.divider;
			ctx.lineWidth = 1;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(36, y + 14, 3, 0, Math.PI * 2);
			ctx.fillStyle = b.active ? COLORS.accent : COLORS.dim;
			ctx.fill();

			drawText(
				ctx,
				b.name,
				48,
				y + 18,
				`500 11.5px ${FONT_SANS}`,
				b.active ? COLORS.ink : COLORS.muted,
			);
			if (b.active) {
				drawText(ctx, "Selected", 286, y + 18, `500 10.5px ${FONT_MONO}`, COLORS.ink, "right");
			}
		});
	} else if (kind === 2) {
		// 03 · Confirm
		drawCardHeader(ctx, "03 · Confirm", "Waiting on you");

		drawText(ctx, "Complete the email check", 22, 70, `600 13.5px ${FONT_SANS}`, COLORS.ink);
		drawText(
			ctx,
			"Finish the confirmation step in your browser",
			22,
			87,
			`500 11px ${FONT_SANS}`,
			COLORS.dim,
		);

		// 6 monochrome sample code cells (single focal border on active cell)
		const digits = ["4", "8", "2", "9", "1", "0"];
		digits.forEach((d, i) => {
			const x = 22 + i * 47;
			drawRoundedRect(ctx, x, 104, 40, 44, 6);
			ctx.fillStyle = i === 3 ? COLORS.surface : COLORS.subBg;
			ctx.fill();
			ctx.strokeStyle = i === 3 ? COLORS.accent : COLORS.divider;
			ctx.lineWidth = 1;
			ctx.stroke();
			drawText(ctx, d, x + 20, 132, `600 16px ${FONT_MONO}`, COLORS.ink, "center");
		});

		drawRoundedRect(ctx, 22, 164, 276, 36, 6);
		ctx.fillStyle = COLORS.subBg;
		ctx.fill();
		ctx.strokeStyle = COLORS.divider;
		ctx.lineWidth = 1;
		ctx.stroke();
		drawText(
			ctx,
			"Pauses automatically for security checks",
			34,
			186,
			`500 11px ${FONT_SANS}`,
			COLORS.muted,
		);
	} else {
		// 04 · Ready
		drawCardHeader(ctx, "04 · Ready", "$0.00 today");

		drawText(ctx, "Your offer link is ready", 22, 70, `600 13.5px ${FONT_SANS}`, COLORS.ink);
		drawText(
			ctx,
			"Open directly in Google One anytime",
			22,
			87,
			`500 11px ${FONT_SANS}`,
			COLORS.dim,
		);

		drawRoundedRect(ctx, 22, 104, 276, 38, 6);
		ctx.fillStyle = COLORS.surface;
		ctx.fill();
		ctx.strokeStyle = COLORS.borderActive;
		ctx.lineWidth = 1;
		ctx.stroke();
		drawText(
			ctx,
			"example.com/offer/sample-preview",
			34,
			127,
			`500 11.5px ${FONT_MONO}`,
			COLORS.ink,
		);

		drawRoundedRect(ctx, 22, 154, 276, 46, 6);
		ctx.fillStyle = COLORS.subBg;
		ctx.fill();
		ctx.strokeStyle = COLORS.divider;
		ctx.stroke();
		drawText(ctx, "Backup saved", 34, 173, `500 10.5px ${FONT_SANS}`, COLORS.dim);
		drawText(ctx, "results/session_2026.txt", 34, 190, `500 11px ${FONT_MONO}`, COLORS.muted);
	}

	ctx.restore();
}
