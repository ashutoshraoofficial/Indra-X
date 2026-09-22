import { M as hasRootVersionAlias } from "./logger-BCzP_yik.js";
import { i as visibleWidth } from "./ansi-B_0KjIJj.js";
import { n as isRich, r as theme } from "./theme-D-TumEpz.js";
import { l as createConfigIO } from "./auth-profiles-B5ypC5S-.js";
import { n as resolveCommitHash } from "./git-commit-CmJHtSyl.js";
//#region src/cli/banner-config-lite.ts
function parseTaglineMode$1(value) {
	if (value === "random" || value === "default" || value === "off") return value;
}
function readCliBannerTaglineMode(env = process.env) {
	try {
		return parseTaglineMode$1(createConfigIO({ env }).loadConfig().cli?.banner?.taglineMode);
	} catch {
		return;
	}
}
//#endregion
//#region src/cli/tagline.ts
const DEFAULT_TAGLINE = "Sovereign Industrial Multi-Agent Intelligence.";
const HOLIDAY_TAGLINES = {
	newYear: "New Year's Day: New year, new config—same old EADDRINUSE, but this time we resolve it like grown-ups.",
	lunarNewYear: "Lunar New Year: May your builds be lucky, your branches prosperous, and your merge conflicts chased away with fireworks.",
	christmas: "Christmas: Ho ho ho—Santa's little claw-sistant is here to ship joy, roll back chaos, and stash the keys safely.",
	eid: "Eid al-Fitr: Celebration mode: queues cleared, tasks completed, and good vibes committed to main with clean history.",
	diwali: "Diwali: Let the logs sparkle and the bugs flee—today we light up the terminal and ship with pride.",
	easter: "Easter: I found your missing environment variable—consider it a tiny CLI egg hunt with fewer jellybeans.",
	hanukkah: "Hanukkah: Eight nights, eight retries, zero shame—may your gateway stay lit and your deployments stay peaceful.",
	halloween: "Halloween: Spooky season: beware haunted dependencies, cursed caches, and the ghost of node_modules past.",
	thanksgiving: "Thanksgiving: Grateful for stable ports, working DNS, and a bot that reads the logs so nobody has to.",
	valentines: "Valentine's Day: Roses are typed, violets are piped—I'll automate the chores so you can spend time with humans."
};
const TAGLINES = [
	"100% Air-Gapped Multi-Agent Intelligence for Sovereign Operations.",
	"Autonomous SCADA, P&ID, and Telemetry Orchestration at Enterprise Scale.",
	"Zero cloud leaks, zero telemetry—sovereignty engineered from silicon to shell.",
	"Grounded in physical assets, verified by industrial safety protocols.",
	"Automating shift handovers, PTW permits, and process telemetry with zero latency.",
	"High-throughput on-premise inference with local open-weight foundation models.",
	"Air-tight security boundary: all prompts, weights, and data stay on-premise.",
	"Unifying Operations, Maintenance, and HSE into a single conversational interface.",
	"Predictive maintenance and Root Cause Analysis at the speed of thought.",
	"Bridging the IT/OT gap with state-of-the-art multimodal reasoning.",
	"Solving the $50B downtime problem through intelligent orchestration.",
	"Empowering the industrial workforce with augmented decision making."
];
const DAY_MS = 1440 * 60 * 1e3;
function utcParts(date) {
	return {
		year: date.getUTCFullYear(),
		month: date.getUTCMonth(),
		day: date.getUTCDate()
	};
}
const onMonthDay = (month, day) => (date) => {
	const parts = utcParts(date);
	return parts.month === month && parts.day === day;
};
const onSpecificDates = (dates, durationDays = 1) => (date) => {
	const parts = utcParts(date);
	return dates.some(([year, month, day]) => {
		if (parts.year !== year) return false;
		const start = Date.UTC(year, month, day);
		const current = Date.UTC(parts.year, parts.month, parts.day);
		return current >= start && current < start + durationDays * DAY_MS;
	});
};
const inYearWindow = (windows) => (date) => {
	const parts = utcParts(date);
	const window = windows.find((entry) => entry.year === parts.year);
	if (!window) return false;
	const start = Date.UTC(window.year, window.month, window.day);
	const current = Date.UTC(parts.year, parts.month, parts.day);
	return current >= start && current < start + window.duration * DAY_MS;
};
const isFourthThursdayOfNovember = (date) => {
	const parts = utcParts(date);
	if (parts.month !== 10) return false;
	const fourthThursday = 1 + (4 - new Date(Date.UTC(parts.year, 10, 1)).getUTCDay() + 7) % 7 + 21;
	return parts.day === fourthThursday;
};
const HOLIDAY_RULES = new Map([
	[HOLIDAY_TAGLINES.newYear, onMonthDay(0, 1)],
	[HOLIDAY_TAGLINES.lunarNewYear, onSpecificDates([
		[
			2025,
			0,
			29
		],
		[
			2026,
			1,
			17
		],
		[
			2027,
			1,
			6
		]
	], 1)],
	[HOLIDAY_TAGLINES.eid, onSpecificDates([
		[
			2025,
			2,
			30
		],
		[
			2025,
			2,
			31
		],
		[
			2026,
			2,
			20
		],
		[
			2027,
			2,
			10
		]
	], 1)],
	[HOLIDAY_TAGLINES.diwali, onSpecificDates([
		[
			2025,
			9,
			20
		],
		[
			2026,
			10,
			8
		],
		[
			2027,
			9,
			28
		]
	], 1)],
	[HOLIDAY_TAGLINES.easter, onSpecificDates([
		[
			2025,
			3,
			20
		],
		[
			2026,
			3,
			5
		],
		[
			2027,
			2,
			28
		]
	], 1)],
	[HOLIDAY_TAGLINES.hanukkah, inYearWindow([
		{
			year: 2025,
			month: 11,
			day: 15,
			duration: 8
		},
		{
			year: 2026,
			month: 11,
			day: 5,
			duration: 8
		},
		{
			year: 2027,
			month: 11,
			day: 25,
			duration: 8
		}
	])],
	[HOLIDAY_TAGLINES.halloween, onMonthDay(9, 31)],
	[HOLIDAY_TAGLINES.thanksgiving, isFourthThursdayOfNovember],
	[HOLIDAY_TAGLINES.valentines, onMonthDay(1, 14)],
	[HOLIDAY_TAGLINES.christmas, onMonthDay(11, 25)]
]);
function isTaglineActive(tagline, date) {
	const rule = HOLIDAY_RULES.get(tagline);
	if (!rule) return true;
	return rule(date);
}
function activeTaglines(options = {}) {
	if (TAGLINES.length === 0) return [DEFAULT_TAGLINE];
	const today = options.now ? options.now() : /* @__PURE__ */ new Date();
	const filtered = TAGLINES.filter((tagline) => isTaglineActive(tagline, today));
	return filtered.length > 0 ? filtered : TAGLINES;
}
function pickTagline(options = {}) {
	if (options.mode === "off") return "";
	if (options.mode === "default") return DEFAULT_TAGLINE;
	const override = (options.env ?? process.env)?.OPENCLAW_TAGLINE_INDEX;
	if (override !== void 0) {
		const parsed = Number.parseInt(override, 10);
		if (!Number.isNaN(parsed) && parsed >= 0) {
			const pool = TAGLINES.length > 0 ? TAGLINES : [DEFAULT_TAGLINE];
			return pool[parsed % pool.length];
		}
	}
	const pool = activeTaglines(options);
	const rand = options.random ?? Math.random;
	return pool[Math.floor(rand() * pool.length) % pool.length];
}
//#endregion
//#region src/cli/banner.ts
let bannerEmitted = false;
const graphemeSegmenter = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null;
function splitGraphemes(value) {
	if (!graphemeSegmenter) return Array.from(value);
	try {
		return Array.from(graphemeSegmenter.segment(value), (seg) => seg.segment);
	} catch {
		return Array.from(value);
	}
}
const hasJsonFlag = (argv) => argv.some((arg) => arg === "--json" || arg.startsWith("--json="));
const hasVersionFlag = (argv) => argv.some((arg) => arg === "--version" || arg === "-V") || hasRootVersionAlias(argv);
function parseTaglineMode(value) {
	if (value === "random" || value === "default" || value === "off") return value;
}
function resolveTaglineMode(options) {
	const explicit = parseTaglineMode(options.mode);
	if (explicit) return explicit;
	return readCliBannerTaglineMode(options.env);
}
function formatCliBannerLine(version, options = {}) {
	const commitLabel = options.commit ?? resolveCommitHash({
		env: options.env,
		moduleUrl: import.meta.url
	}) ?? "unknown";
	const tagline = pickTagline({
		...options,
		mode: resolveTaglineMode(options)
	});
	const rich = options.richTty ?? isRich();
	const title = "⚡ Indra AI";
	const columns = options.columns ?? process.stdout.columns ?? 120;
	const plainBaseLine = `${title} ${version} (${commitLabel})`;
	const plainFullLine = tagline ? `${plainBaseLine} — ${tagline}` : plainBaseLine;
	const fitsOnOneLine = visibleWidth(plainFullLine) <= columns;
	if (rich) {
		if (fitsOnOneLine) {
			if (!tagline) return `${theme.heading(title)} ${theme.info(version)} ${theme.muted(`(${commitLabel})`)}`;
			return `${theme.heading(title)} ${theme.info(version)} ${theme.muted(`(${commitLabel})`)} ${theme.muted("—")} ${theme.accentDim(tagline)}`;
		}
		const line1 = `${theme.heading(title)} ${theme.info(version)} ${theme.muted(`(${commitLabel})`)}`;
		if (!tagline) return line1;
		return `${line1}\n${`${" ".repeat(3)}${theme.accentDim(tagline)}`}`;
	}
	if (fitsOnOneLine) return plainFullLine;
	const line1 = plainBaseLine;
	if (!tagline) return line1;
	return `${line1}\n${`${" ".repeat(3)}${tagline}`}`;
}
const INDRA_ASCII = [
	"                         ▄▄████▄▄",
	"                     ▄▄████████████▄▄",
	"                  ▄███████▀    ▀███████▄",
	"                ▄██████▀   ▄██▄   ▀██████▄",
	"               ██████▀   ▄██████▄   ▀██████",
	"             ▄██████     ▀██████▀     ██████▄",
	"            ███████▄       ▀██▀       ▄███████",
	"             ▀██████▄    ▄██████▄    ▄██████▀",
	"               ██████▄   ▀██████▀   ▄██████",
	"                ▀██████▄   ▀██▀   ▄██████▀",
	"                  ▀███████▄    ▄███████▀",
	"                     ▀▀████████████▀▀",
	"                         ▀▀████▀▀",
	"",
	"  ██╗███╗   ██╗██████╗ ██████╗  █████╗        █████╗ ██╗",
	"  ██║████╗  ██║██╔══██╗██╔══██╗██╔══██╗      ██╔══██╗██║",
	"  ██║██╔██╗ ██║██║  ██║██████╔╝███████║      ███████║██║",
	"  ██║██║╚██╗██║██║  ██║██╔══██╗██╔══██║      ██╔══██║██║",
	"  ██║██║ ╚████║██████╔╝██║  ██║██║  ██║      ██║  ██║██║",
	"  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝",
	"      ⚡ SOVEREIGN INDUSTRIAL MULTI-AGENT WORKBENCH ⚡     "
];
function formatCliBannerArt(options = {}) {
	if (!(options.richTty ?? isRich())) return INDRA_ASCII.join("\n");
	const colorChar = (ch) => {
		if (ch === "█") return theme.accentBright(ch);
		if (ch === "▄" || ch === "▀") return theme.accent(ch);
		if ("╔╗╚╝║═".includes(ch)) return theme.accentBright(ch);
		if (ch === "⚡") return theme.info(ch);
		return theme.accent(ch);
	};
	return INDRA_ASCII.map((line) => {
		if (line.includes("SOVEREIGN INDUSTRIAL")) {
			return "      " + theme.info("⚡") + " " + theme.heading("SOVEREIGN INDUSTRIAL MULTI-AGENT WORKBENCH") + " " + theme.info("⚡");
		}
		return splitGraphemes(line).map(colorChar).join("");
	}).join("\n");
}
function emitCliBanner(version, options = {}) {
	if (bannerEmitted) return;
	const argv = options.argv ?? process.argv;
	if (!process.stdout.isTTY) return;
	if (hasJsonFlag(argv)) return;
	if (hasVersionFlag(argv)) return;
	const art = formatCliBannerArt(options);
	const line = formatCliBannerLine(version, options);
	process.stdout.write(`\n${art}\n\n${line}\n\n`);
	bannerEmitted = true;
}
function hasEmittedCliBanner() {
	return bannerEmitted;
}
//#endregion
export { hasEmittedCliBanner as i, formatCliBannerArt as n, formatCliBannerLine as r, emitCliBanner as t };
