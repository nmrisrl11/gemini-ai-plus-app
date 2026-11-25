import { APP_INFO } from "@/constants/app-info";

export interface NavItem {
	id: string;
	label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
	{ id: "preview", label: "Preview" },
	{ id: "how-it-works", label: "How it works" },
	{ id: "features", label: "Features" },
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

export interface HowItWorksStep {
	id: string;
	step: string;
	kicker: string;
	title: string;
	description: string;
}

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
	{
		id: "profile",
		step: "01",
		kicker: "01 · Setup",
		title: "Fill in your details once.",
		description: "Generate ready-to-use profile details in one click, or type your own.",
	},
	{
		id: "browser",
		step: "02",
		kicker: "02 · Browser",
		title: "Uses your own browser.",
		description: "Opens directly in Chrome, Edge, or Brave—nothing extra to download.",
	},
	{
		id: "confirm",
		step: "03",
		kicker: "03 · Verify",
		title: "Pauses when you're needed.",
		description: "Enter your inbox code or finish a security check before it continues.",
	},
	{
		id: "redeem",
		step: "04",
		kicker: "04 · Ready",
		title: "Your link, saved for you.",
		description: "Captures your official Google One offer link and keeps a local copy.",
	},
] as const;

export type FeatureSpotlightId = "browser" | "privacy" | "portable" | "recovery";

export interface FeatureSpotlight {
	id: FeatureSpotlightId;
	title: string;
	description: string;
}

export const FEATURE_SPOTLIGHTS: readonly FeatureSpotlight[] = [
	{
		id: "browser",
		title: "Works with your browser",
		description:
			"Uses Chrome, Edge, or Brave already on your PC, so you skip giant extra downloads.",
	},
	{
		id: "privacy",
		title: "Private by default",
		description:
			"Everything stays on your computer—no sign-ups, no tracking, and nothing sent to any server.",
	},
	{
		id: "portable",
		title: "Just download and open",
		description:
			"One lightweight Windows app you can double-click right away, publicly verified and open source.",
	},
	{
		id: "recovery",
		title: "Pauses safely when needed",
		description:
			"If a security check pops up, it waits for you and lets you pick up right where you left off.",
	},
] as const;

export const SUPPORTED_BROWSERS = ["Chrome", "Edge", "Brave", "Opera", "Vivaldi"] as const;

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
