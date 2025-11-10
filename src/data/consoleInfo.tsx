"use client";

import { EmulatorElementType } from "@/data/types";

interface ConsoleInfo {
	buttons: {
		[key in EmulatorElementType]?: {
			values: string[] | Record<string, string[]>;
		};
	};
	inputScreen: {
		height: number;
		width: number;
	};
	name: string;
	screens: {
		height: number;
		width: number;
		x: number;
		y: number;
	}[];
}

const INPUT_PRESETS: Record<string, ConsoleInfo> = {
	"com.rileytestut.delta.game.ds": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Touchscreen]: {
				values: {
					x: ["touchScreenX"],
					y: ["touchScreenY"],
				},
			},
		},
		inputScreen: {
			height: 384,
			width: 256,
		},
		name: "Nintendo DS",
		screens: [
			{
				height: 192,
				width: 256,
				x: 0,
				y: 0,
			},
			{
				height: 192,
				width: 256,
				x: 0,
				y: 192,
			},
		],
	},
	"com.rileytestut.delta.game.gba": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 160,
			width: 240,
		},
		name: "GameBoy Advance",
		screens: [
			{
				height: 160,
				width: 240,
				x: 0,
				y: 0,
			},
		],
	},
	"com.rileytestut.delta.game.gbc": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 144,
			width: 160,
		},
		name: "GameBoy (Color)",
		screens: [
			{
				height: 144,
				width: 160,
				x: 0,
				y: 0,
			},
		],
	},
	"com.rileytestut.delta.game.genesis": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"c",
					"x",
					"y",
					"start",
					"mode",
					"z",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 320,
		},
		name: "Sega Genesis",
		screens: [
			{
				height: 224,
				width: 320,
				x: 0,
				y: 0,
			},
			{
				height: 224,
				width: 256,
				x: 0,
				y: 0,
			},
			{
				height: 240,
				width: 320,
				x: 0,
				y: 0,
			},
		],
	},
	"com.rileytestut.delta.game.n64": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"start",
					"cUp",
					"cDown",
					"cLeft",
					"cRight",
					"l",
					"r",
					"z",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["analogStickDown"],
					left: ["analogStickLeft"],
					right: ["analogStickRight"],
					up: ["analogStickUp"],
				},
			},
		},
		inputScreen: {
			height: 224,
			width: 256,
		},
		name: "Nintendo 64",
		screens: [
			{
				height: 224,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"com.rileytestut.delta.game.nes": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 256,
		},
		name: "Nintendo Entertainment System",
		screens: [
			{
				height: 240,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"com.rileytestut.delta.game.snes": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 224,
			width: 256,
		},
		name: "Super Nintendo Entertainment System",
		screens: [
			{
				height: 224,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.dc": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["analogStickDown"],
					left: ["analogStickLeft"],
					right: ["analogStickRight"],
					up: ["analogStickUp"],
				},
			},
		},
		inputScreen: {
			height: 480,
			width: 640,
		},
		name: "Sega Dreamcast",
		screens: [
			{
				height: 480,
				width: 640,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.ps1": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"select",
					"start",
					"l",
					"r",
					"l2",
					"r2",
					"l3",
					"r3",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["analogStickDown"],
					left: ["analogStickLeft"],
					right: ["analogStickRight"],
					up: ["analogStickUp"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 320,
		},
		name: "PlayStation 1",
		screens: [
			{
				height: 240,
				width: 320,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.pm": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 152,
			width: 160,
		},
		name: "Pokemon Mini",
		screens: [
			{
				height: 64,
				width: 96,
				x: 32,
				y: 44,
			},
		],
	},
	"public.aoshuang.game.vb": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 224,
			width: 384,
		},
		name: "Virtual Boy",
		screens: [
			{
				height: 224,
				width: 384,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.n64": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"start",
					"cUp",
					"cDown",
					"cLeft",
					"cRight",
					"l",
					"r",
					"z",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["analogStickDown"],
					left: ["analogStickLeft"],
					right: ["analogStickRight"],
					up: ["analogStickUp"],
				},
			},
		},
		inputScreen: {
			height: 224,
			width: 256,
		},
		name: "Nintendo 64",
		screens: [
			{
				height: 224,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.ss": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"c",
					"x",
					"y",
					"z",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["analogStickDown"],
					left: ["analogStickLeft"],
					right: ["analogStickRight"],
					up: ["analogStickUp"],
				},
			},
		},
		inputScreen: {
			height: 224,
			width: 320,
		},
		name: "Sega Saturn",
		screens: [
			{
				height: 224,
				width: 320,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.md": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"c",
					"x",
					"y",
					"start",
					"mode",
					"z",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 320,
		},
		name: "Sega Mega Drive",
		screens: [
			{
				height: 224,
				width: 320,
				x: 0,
				y: 0,
			},
			{
				height: 224,
				width: 256,
				x: 0,
				y: 0,
			},
			{
				height: 240,
				width: 320,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.mcd": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"c",
					"x",
					"y",
					"start",
					"mode",
					"z",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 320,
		},
		name: "Sega CD",
		screens: [
			{
				height: 224,
				width: 320,
				x: 0,
				y: 0,
			},
			{
				height: 224,
				width: 256,
				x: 0,
				y: 0,
			},
			{
				height: 240,
				width: 320,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.32x": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"c",
					"x",
					"y",
					"start",
					"mode",
					"z",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 320,
		},
		name: "Sega 32X",
		screens: [
			{
				height: 224,
				width: 320,
				x: 0,
				y: 0,
			},
			{
				height: 240,
				width: 320,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.ms": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 192,
			width: 256,
		},
		name: "Sega Master System",
		screens: [
			{
				height: 192,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.gg": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 144,
			width: 160,
		},
		name: "Sega Game Gear",
		screens: [
			{
				height: 144,
				width: 160,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.sg1000": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 192,
			width: 256,
		},
		name: "Sega SG-1000",
		screens: [
			{
				height: 192,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.psp": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["analogStickDown"],
					left: ["analogStickLeft"],
					right: ["analogStickRight"],
					up: ["analogStickUp"],
				},
			},
		},
		inputScreen: {
			height: 272,
			width: 480,
		},
		name: "PlayStation Portable",
		screens: [
			{
				height: 272,
				width: 480,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.3ds": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"select",
					"start",
					"l",
					"r",
					"zl",
					"zr",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["analogStickDown"],
					left: ["analogStickLeft"],
					right: ["analogStickRight"],
					up: ["analogStickUp"],
				},
			},
			[EmulatorElementType.Touchscreen]: {
				values: {
					x: ["touchScreenX"],
					y: ["touchScreenY"],
				},
			},
		},
		inputScreen: {
			height: 480,
			width: 400,
		},
		name: "Nintendo 3DS",
		screens: [
			{
				height: 240,
				width: 400,
				x: 0,
				y: 0,
			},
			{
				height: 240,
				width: 320,
				x: 40,
				y: 240,
			},
		],
	},
	"public.aoshuang.game.ds": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Touchscreen]: {
				values: {
					x: ["touchScreenX"],
					y: ["touchScreenY"],
				},
			},
		},
		inputScreen: {
			height: 384,
			width: 256,
		},
		name: "Nintendo DS",
		screens: [
			{
				height: 192,
				width: 256,
				x: 0,
				y: 0,
			},
			{
				height: 192,
				width: 256,
				x: 0,
				y: 192,
			},
		],
	},
	"public.aoshuang.game.gba": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 160,
			width: 240,
		},
		name: "GameBoy Advance",
		screens: [
			{
				height: 160,
				width: 240,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.gbc": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 144,
			width: 160,
		},
		name: "GameBoy Color",
		screens: [
			{
				height: 144,
				width: 160,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.gb": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 144,
			width: 160,
		},
		name: "GameBoy",
		screens: [
			{
				height: 144,
				width: 160,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.nes": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 256,
		},
		name: "Nintendo Entertainment System",
		screens: [
			{
				height: 240,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.fds": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"select",
					"start",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 240,
			width: 256,
		},
		name: "Famicom Disk System",
		screens: [
			{
				height: 240,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
	"public.aoshuang.game.snes": {
		buttons: {
			[EmulatorElementType.Default]: {
				values: [
					"a",
					"b",
					"x",
					"y",
					"select",
					"start",
					"l",
					"r",
					"menu",
					"volume",
					"quickSave",
					"quickLoad",
					"fastForward",
					"toggleFastForward",
				],
			},
			[EmulatorElementType.Dpad]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
			[EmulatorElementType.Thumbstick]: {
				values: {
					down: ["down"],
					left: ["left"],
					right: ["right"],
					up: ["up"],
				},
			},
		},
		inputScreen: {
			height: 224,
			width: 256,
		},
		name: "Super Nintendo Entertainment System",
		screens: [
			{
				height: 224,
				width: 256,
				x: 0,
				y: 0,
			},
		],
	},
};

export default INPUT_PRESETS;
