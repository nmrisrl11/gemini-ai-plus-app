import { APP_INFO } from "@/constants/app-info";

export interface NavItem {
	id: string;
	label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
	{ id: "preview", label: "Preview" },
	{ id: "workflow", label: "Workflow" },
	{ id: "features", label: "Architecture" },
	{ id: "install", label: "Install" },
	{ id: "faq", label: "FAQ" },
] as const;

export type PlanBenefitIcon = "sparkles" | "storage" | "flow" | "workspace";

export interface PlanBenefit {
	title: string;
	detail: string;
	spec: string;
	icon: PlanBenefitIcon;
}

export const PLAN_BENEFITS: readonly PlanBenefit[] = [
	{
		title: "Gemini app",
		detail: "Double usage limits plus Hydrogen model access",
		spec: "2x limits",
		icon: "sparkles",
	},
	{
		title: "400 GB cloud storage",
		detail: "Shared across Google Photos, Drive, and Gmail",
		spec: "400 GB",
		icon: "storage",
	},
	{
		title: "Google Flow & Music",
		detail: "Expanded AI creative and music studio access",
		spec: "Flow + Music",
		icon: "flow",
	},
	{
		title: "Search, Gmail & Notebook",
		detail: "Nano Banana in Search, Gmail AI, and Audio Overviews",
		spec: "Workspace AI",
		icon: "workspace",
	},
] as const;

export interface DemoProfile {
	firstName: string;
	lastName: string;
	phone: string;
	sampleEmail: string;
	keyLength: number;
}

export const DEMO_PROFILES: readonly DemoProfile[] = [
	{
		firstName: "Ananya",
		lastName: "Sharma",
		phone: "+91 8444200182",
		sampleEmail: "ananya.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Rohan",
		lastName: "Deshmukh",
		phone: "+91 9821047391",
		sampleEmail: "rohan.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Priya",
		lastName: "Nair",
		phone: "+91 7982154036",
		sampleEmail: "priya.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Arjun",
		lastName: "Kulkarni",
		phone: "+91 9145823704",
		sampleEmail: "arjun.demo@example.com",
		keyLength: 12,
	},
	{
		firstName: "Meera",
		lastName: "Iyer",
		phone: "+91 8826401953",
		sampleEmail: "meera.demo@example.com",
		keyLength: 12,
	},
] as const;

export const BROWSER_OPTIONS = ["Auto-Detect", "Google Chrome", "Microsoft Edge", "Brave"] as const;

export type BrowserOption = (typeof BROWSER_OPTIONS)[number];

export interface WorkflowCardData {
	id: string;
	step: string;
	title: string;
	phase: string;
	description: string;
	meta: readonly {
		label: string;
		value: string;
		isAccent?: boolean;
	}[];
	actionLink?: {
		label: string;
		url: string;
	};
}

export const WORKFLOW_CARDS: readonly WorkflowCardData[] = [
	{
		id: "profile",
		step: "01",
		title: "Set your target Gmail",
		phase: "Profile setup",
		description:
			"Enter your personal @gmail.com address and click Randomize to format student demographic details automatically—or customize any field yourself.",
		meta: [
			{ label: "Target Account", value: "Personal @gmail.com" },
			{ label: "Profile Data", value: "1-click generator" },
			{ label: "Validation", value: "Pre-flight checked", isAccent: true },
			{ label: "Storage", value: "Local PC only" },
		],
	},
	{
		id: "engine",
		step: "02",
		title: "Run local browser automation",
		phase: "Playwright cascade",
		description:
			"Click Get 1-Year Access Link. The portal attaches to your installed Chrome, Edge, or Brave in the background and completes the partner onboarding flow.",
		meta: [
			{ label: "Browser Engine", value: "Chrome · Edge · Brave" },
			{ label: "Extra Downloads", value: "0 MB browser bloat", isAccent: true },
			{ label: "Portable Mode", value: "Silent headless run" },
			{ label: "Gateway Guard", value: "50s timeout + retry" },
		],
	},
	{
		id: "otp",
		step: "03",
		title: "Confirm your 6-digit code",
		phase: "Human-in-the-loop",
		description:
			"When the verification email reaches your inbox, enter the 6-digit code in the sanitized OTP prompt. If a Turnstile or CAPTCHA appears, the app pauses safely.",
		meta: [
			{ label: "OTP Prompt", value: "6-digit numeric filter" },
			{ label: "Paste Support", value: "Auto-sanitized" },
			{ label: "Challenge Guard", value: "Turnstile & CAPTCHA safe", isAccent: true },
			{ label: "Recovery", value: "CDP session resume" },
		],
	},
	{
		id: "redeem",
		step: "04",
		title: "Extract and activate on Google One",
		phase: "Canonical offer link",
		description:
			"The portal resolves redirect chains into a permanent one.google.com/offer link, saves a backup copy in results/, and lets you activate 12 months at $0.00 today.",
		meta: [
			{ label: "Output Format", value: "one.google.com/offer/..." },
			{ label: "Local Archive", value: "Saved in results/" },
			{ label: "Charged Today", value: "$0.00 (12 Months)", isAccent: true },
			{ label: "Auto-Renew", value: "Cancel anytime" },
		],
		actionLink: {
			label: "Manage Google One subscriptions",
			url: APP_INFO.googleSubsUrl,
		},
	},
] as const;

export const CASCADE_TIERS = [
	{ tier: "01", name: "Chrome", channel: "chrome" },
	{ tier: "02", name: "Edge", channel: "msedge" },
	{ tier: "03", name: "Brave", channel: "Brave.exe" },
	{ tier: "04", name: "Opera / Vivaldi", channel: "AppData" },
	{ tier: "05", name: "Playwright", channel: "Cache" },
] as const;

export interface ReleaseSpec {
	label: string;
	value: string;
	isAccent?: boolean;
}

export const RELEASE_SPECS: readonly ReleaseSpec[] = [
	{ label: "Platform", value: APP_INFO.platform },
	{ label: "Binary Size", value: `${APP_INFO.binarySize} (Nuitka + Zstd)` },
	{ label: "Telemetry", value: "Zero network relays", isAccent: true },
	{ label: "License", value: "MIT Open Source" },
] as const;

export interface InstallStep {
	num: string;
	title: string;
	instruction: string;
}

export const PORTABLE_STEPS: readonly InstallStep[] = [
	{
		num: "01",
		title: "Download the portable executable",
		instruction:
			"Grab Gemini AI Plus Portal v1.0.0.exe from the latest GitHub Release. No installer, Python runtime, or external browser download is needed.",
	},
	{
		num: "02",
		title: "Launch and enter your Gmail",
		instruction:
			"Double-click the executable, enter your personal @gmail.com address, and keep Auto-Detect enabled to attach to your installed Edge, Chrome, or Brave.",
	},
	{
		num: "03",
		title: "Verify OTP and open your offer link",
		instruction:
			"Enter the 6-digit code sent to your inbox when prompted. Copy the resolved Google One offer link or check the local results/ folder anytime.",
	},
] as const;

export interface FaqItem {
	q: string;
	a: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
	{
		q: "Does the portal send my email, password, or links to any server?",
		a: "Never. Everything runs 100% locally on your Windows PC with zero analytics, cloud relays, or telemetry. Generated details and extracted Google One links are written strictly to the local results/ folder next to the app.",
	},
	{
		q: "Do I need Python or Playwright browsers installed first?",
		a: "No. The portable .exe bundles all Python dependencies and connects directly to your existing Google Chrome, Microsoft Edge (pre-installed on Windows 10/11), Brave, Opera, or Vivaldi—avoiding a 400 MB browser download.",
	},
	{
		q: "What happens if Cloudflare Turnstile or a CAPTCHA appears?",
		a: "The automation engine monitors for Turnstile, reCAPTCHA, and gateway interstitials. If a challenge triggers, it pauses or switches to a visible window so you can solve it safely—preventing retries or account lockouts.",
	},
	{
		q: "Why does Google One ask for a payment method when activating?",
		a: "Google One requires a linked payment method (card or PayPal) on all promotional trials to verify identity. You are billed $0.00 today for the 12-month Google AI Plus period, and you can cancel auto-renewal immediately in Google One settings while keeping the full year.",
	},
	{
		q: "What if a session gets interrupted halfway through?",
		a: "You do not have to start over. The repository includes tools/account_recovery/run_account_recovery.bat, which attaches to your live browser session via Chrome DevTools Protocol (port 9222) and extracts the redemption link directly.",
	},
	{
		q: "How is the portable .exe compiled and verified?",
		a: "GitHub Actions builds every release cleanly from open-source code using Nuitka (Python-to-C native compilation) with Zstandard compression, publishes SHA256SUMS.txt, and attaches an automated VirusTotal API v3 scan report to each release.",
	},
] as const;

export interface SupportChannel {
	id: string;
	title: string;
	methods: string;
	qrImage: string;
	qrAlt: string;
	instruction: string;
	actionUrl?: string;
	actionLabel?: string;
}

export const SUPPORT_CHANNELS: readonly SupportChannel[] = [
	{
		id: "bmc",
		title: "Buy Me a Coffee",
		methods: "Cards · Apple Pay · Google Pay",
		qrImage: "/images/qrcode-bmc.png",
		qrAlt: "Buy Me a Coffee QR code",
		instruction: "Scan with camera or open link below",
		actionUrl: APP_INFO.bmcUrl,
		actionLabel: "Open buymeacoffee.com",
	},
	{
		id: "gcash",
		title: "GCash / QR Ph",
		methods: "GCash · Maya · InstaPay Banking",
		qrImage: "/images/qrcode-gcash.jpg",
		qrAlt: "GCash / QR Ph QR code",
		instruction: "Scan with any PH banking app",
	},
] as const;
