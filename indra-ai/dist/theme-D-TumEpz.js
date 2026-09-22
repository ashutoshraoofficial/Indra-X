import chalk, { Chalk } from "chalk";
//#region src/terminal/palette.ts
const LOBSTER_PALETTE = {
	accent: "#2563EB",
	accentBright: "#38BDF8",
	accentDim: "#1D4ED8",
	info: "#00D2FF",
	success: "#10B981",
	warn: "#F59E0B",
	error: "#EF4444",
	muted: "#64748B"
};
//#endregion
//#region src/terminal/theme.ts
const hasForceColor = typeof process.env.FORCE_COLOR === "string" && process.env.FORCE_COLOR.trim().length > 0 && process.env.FORCE_COLOR.trim() !== "0";
const baseChalk = process.env.NO_COLOR && !hasForceColor ? new Chalk({ level: 0 }) : chalk;
const hex = (value) => baseChalk.hex(value);
const theme = {
	accent: hex(LOBSTER_PALETTE.accent),
	accentBright: hex(LOBSTER_PALETTE.accentBright),
	accentDim: hex(LOBSTER_PALETTE.accentDim),
	info: hex(LOBSTER_PALETTE.info),
	success: hex(LOBSTER_PALETTE.success),
	warn: hex(LOBSTER_PALETTE.warn),
	error: hex(LOBSTER_PALETTE.error),
	muted: hex(LOBSTER_PALETTE.muted),
	heading: baseChalk.bold.hex("#38BDF8"),
	command: hex("#60A5FA"),
	option: hex("#93C5FD")
};
const isRich = () => Boolean(baseChalk.level > 0);
const colorize = (rich, color, value) => rich ? color(value) : value;
//#endregion
export { isRich as n, theme as r, colorize as t };
