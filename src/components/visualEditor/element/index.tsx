"use client";
import {
	Asset,
	EmulatorElement,
	EmulatorElementType,
	ShowContextMenuFunc,
	ShowPopupFunc,
} from "@/data/types";
import styles from "./index.module.css";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as CONSTANT from "@/data/constants";
import { loadAssetHelper } from "@/utils/readImage";
import { Spec } from "immutability-helper";

export default function EmulatorElementComponent(args: {
	assets: Record<string, Asset> | null;
	defaultPadding: {
		bottom: number;
		left: number;
		right: number;
		top: number;
	};
	deleteThis: () => void;
	duplicateThis: () => void;
	elementData: EmulatorElement;
	isBackground: boolean;
	isEditing: boolean[];
	isHover: boolean;
	onClick: () => void;
	parentHeight: number;
	parentWidth: number;
	pressedKeys: string[];
	scale: number;
	setAssets: Dispatch<SetStateAction<Record<string, Asset> | null>>;
	setHoverIndex: Dispatch<SetStateAction<number>>;
	setIsEditing: (val: boolean) => void;
	showContextMenu: ShowContextMenuFunc;
	showPopup: ShowPopupFunc;
	updateElement: (data: Spec<EmulatorElement, never>) => void;
	zIndex: number | null;
}) {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const label = getElementLabel(args.elementData);
	
	// 获取背景图片资源（支持 Thumbstick、Default、Dpad 类型）
	let bgAsset: Asset | null = null;
	let bgAssetName = "";
	
	if (args.elementData.type === EmulatorElementType.Thumbstick && args.assets) {
		bgAssetName = args.elementData.data.thumbstick.name;
		if (bgAssetName in args.assets) {
			bgAsset = args.assets[bgAssetName];
		}
	} else if (
		(args.elementData.type === EmulatorElementType.Default ||
		args.elementData.type === EmulatorElementType.Dpad) &&
		args.assets &&
		args.elementData.data.asset?.normal
	) {
		bgAssetName = args.elementData.data.asset.normal;
		if (bgAssetName in args.assets) {
			bgAsset = args.assets[bgAssetName];
		}
	}
	
	if (bgAsset && bgAssetName) {
		loadAssetHelper(bgAssetName, args.assets, args.setAssets);
	}
	
	const bgUrl =
		bgAsset && bgAsset.url && bgAsset.url.length > 0 ? bgAsset.url : "";

	// 辅助函数：保留两位小数
	const roundTo2Decimals = (value: number): number => {
		return Math.round(value * 100) / 100;
	};

	const moveHelper = (e: React.PointerEvent) => {
		if (
			!args.isEditing[0] &&
			(e.pointerType !== "mouse" || e.button === 0)
		) {
		args.onClick();
		e.preventDefault();
		setIsActive(true);
		setIsDragging(true);
		const xStartMouse = e.clientX;
		const yStartMouse = e.clientY;
		const xStart = args.elementData.x;
		const yStart = args.elementData.y;
		const moveHandler = (e: PointerEvent) => {
			if (!args.isEditing[0]) {
				e.preventDefault();
					let newTop =
						yStart + (e.clientY - yStartMouse) / args.scale;
					newTop = Math.max(
						newTop,
						args.elementData.paddingTopGlobal
							? args.defaultPadding.top
							: args.elementData.paddingTop,
					);
					newTop = Math.min(
						newTop,
						args.parentHeight -
							(args.elementData.height +
								(args.elementData.paddingBottomGlobal
									? args.defaultPadding.bottom
									: args.elementData.paddingBottom)),
					);
					let newLeft =
						xStart + (e.clientX - xStartMouse) / args.scale;
					newLeft = Math.max(
						newLeft,
						args.elementData.paddingLeftGlobal
							? args.defaultPadding.left
							: args.elementData.paddingLeft,
					);
					newLeft = Math.min(
						newLeft,
						args.parentWidth -
							(args.elementData.width +
								(args.elementData.paddingRightGlobal
									? args.defaultPadding.right
									: args.elementData.paddingRight)),
					);
				args.updateElement({
					x: {
						$set: roundTo2Decimals(newLeft),
					},
					y: {
						$set: roundTo2Decimals(newTop),
					},
				});
			} else {
				document.removeEventListener("pointerup", stopHandler);
				document.removeEventListener("pointermove", moveHandler);
				setIsActive(false);
				setIsDragging(false);
			}
		};
		const stopHandler = () => {
			document.removeEventListener("pointerup", stopHandler);
			document.removeEventListener("pointermove", moveHandler);
			setIsActive(false);
			setIsDragging(false);
		};
			document.addEventListener("pointerup", stopHandler);
			document.addEventListener("pointermove", moveHandler);
		}
	};

	const resizeHelper = (
		e: React.PointerEvent,
		yScale: number,
		xScale: number,
		inner: boolean,
	) => {
		if (!args.isEditing[0] && (yScale != 0 || xScale != 0)) {
			if (e.pointerType !== "mouse" || e.button === 0) {
			let padding = !inner;
			if (e.shiftKey) padding = true;
			args.onClick();
			e.preventDefault();
			setIsActive(true);
			setIsDragging(true);
			const xStartMouse = e.clientX;
				const yStartMouse = e.clientY;
				let paddingTop = -1;
				let paddingBottom = -1;
				let paddingLeft = -1;
				let paddingRight = -1;
				let y = -1;
				let x = -1;
				let width = -1;
				let height = -1;
				const paddingTopStart =
					padding && inner ? 0 : args.elementData.paddingTop;
				const paddingBottomStart =
					padding && inner ? 0 : args.elementData.paddingBottom;
				const paddingLeftStart =
					padding && inner ? 0 : args.elementData.paddingLeft;
				const paddingRightStart =
					padding && inner ? 0 : args.elementData.paddingRight;
				const yStart = args.elementData.y;
				const xStart = args.elementData.x;
				const widthStart = args.elementData.width;
				const heightStart = args.elementData.height;
				const moveHandler = (e: PointerEvent) => {
					if (!args.isEditing[0]) {
						e.preventDefault();
						if (yScale != 0) {
							const diffY =
								((e.clientY - yStartMouse) / args.scale) *
								yScale;
							if (yScale < 0) {
								if (
									padding &&
									!args.elementData.paddingTopGlobal
								) {
									if (paddingTopStart + diffY < 0)
										paddingTop = 0;
									else if (paddingTopStart + diffY > yStart)
										paddingTop = yStart;
									else paddingTop = paddingTopStart + diffY;
								} else {
									if (
										yStart - diffY <=
										(args.elementData.paddingTopGlobal
											? args.defaultPadding.top
											: 0)
									) {
										y = args.elementData.paddingTopGlobal
											? args.defaultPadding.top
											: 0;
										height =
											heightStart +
											yStart -
											(args.elementData.paddingTopGlobal
												? args.defaultPadding.top
												: 0);
									} else if (heightStart + diffY <= 0) {
										y = yStart + heightStart;
										height = 0;
									} else {
										y = yStart - diffY;
										height = heightStart + diffY;
									}
									if (
										paddingTopStart > 0 &&
										!args.elementData.paddingTopGlobal
									) {
										paddingTop =
											paddingTopStart +
											(heightStart - height);
										if (paddingTop <= 0) {
											paddingTop = 0;
										}
									}
								}
							} else {
								if (
									padding &&
									!args.elementData.paddingBottomGlobal
								) {
									if (paddingBottomStart + diffY < 0)
										paddingBottom = 0;
									else if (
										paddingBottomStart + diffY >
										args.parentHeight - yStart - heightStart
									)
										paddingBottom =
											args.parentHeight -
											yStart -
											heightStart;
									else
										paddingBottom =
											paddingBottomStart + diffY;
								} else {
									if (heightStart + diffY < 0) height = 0;
									else if (
										heightStart + diffY + yStart >=
										args.parentHeight -
											(args.elementData
												.paddingBottomGlobal
												? args.defaultPadding.bottom
												: 0)
									) {
										height =
											args.parentHeight -
											yStart -
											(args.elementData
												.paddingBottomGlobal
												? args.defaultPadding.bottom
												: 0);
									} else {
										height = heightStart + diffY;
									}
									if (
										paddingBottomStart > 0 &&
										!args.elementData.paddingBottomGlobal
									) {
										paddingBottom =
											paddingBottomStart +
											(heightStart - height);
										if (paddingBottom <= 0) {
											paddingBottom = 0;
										}
									}
								}
							}
						}
						if (xScale != 0) {
							const diffX =
								((e.clientX - xStartMouse) / args.scale) *
								xScale;
							if (xScale < 0) {
								if (
									padding &&
									!args.elementData.paddingLeftGlobal
								) {
									if (paddingLeftStart + diffX < 0)
										paddingLeft = 0;
									else if (paddingLeftStart + diffX > xStart)
										paddingLeft = xStart;
									else paddingLeft = paddingLeftStart + diffX;
								} else {
									if (
										xStart - diffX <=
										(args.elementData.paddingLeftGlobal
											? args.defaultPadding.left
											: 0)
									) {
										x = args.elementData.paddingLeftGlobal
											? args.defaultPadding.left
											: 0;
										width =
											widthStart +
											xStart -
											(args.elementData.paddingLeftGlobal
												? args.defaultPadding.left
												: 0);
									} else if (widthStart + diffX <= 0) {
										x = xStart + widthStart;
										width = 0;
									} else {
										x = xStart - diffX;
										width = widthStart + diffX;
									}
									if (
										paddingLeftStart > 0 &&
										!args.elementData.paddingLeftGlobal
									) {
										paddingLeft =
											paddingLeftStart +
											(widthStart - width);
										if (paddingLeft <= 0) {
											paddingLeft = 0;
										}
									}
								}
							} else {
								if (
									padding &&
									!args.elementData.paddingRightGlobal
								) {
									if (paddingRightStart + diffX < 0)
										paddingRight = 0;
									else if (
										paddingRightStart + diffX >
										args.parentWidth - xStart - widthStart
									)
										paddingRight =
											args.parentWidth -
											xStart -
											widthStart;
									else
										paddingRight =
											paddingRightStart + diffX;
								} else {
									if (widthStart + diffX < 0) width = 0;
									else if (
										widthStart + diffX + xStart >=
										args.parentWidth -
											(args.elementData.paddingRightGlobal
												? args.defaultPadding.right
												: 0)
									) {
										width =
											args.parentWidth -
											xStart -
											(args.elementData.paddingRightGlobal
												? args.defaultPadding.right
												: 0);
									} else {
										width = widthStart + diffX;
									}
									if (
										paddingRightStart > 0 &&
										!args.elementData.paddingRightGlobal
									) {
										paddingRight =
											paddingRightStart +
											(widthStart - width);
										if (paddingRight <= 0) {
											paddingRight = 0;
										}
									}
								}
							}
						}
					args.updateElement({
						...(!args.elementData.paddingTopGlobal &&
							paddingTop >= 0 && {
								paddingTop: {
									$set: roundTo2Decimals(paddingTop),
								},
							}),
						...(!args.elementData.paddingBottomGlobal &&
							paddingBottom >= 0 && {
								paddingBottom: {
									$set: roundTo2Decimals(paddingBottom),
								},
							}),
						...(!args.elementData.paddingLeftGlobal &&
							paddingLeft >= 0 && {
								paddingLeft: {
									$set: roundTo2Decimals(paddingLeft),
								},
							}),
						...(!args.elementData.paddingRightGlobal &&
							paddingRight >= 0 && {
								paddingRight: {
									$set: roundTo2Decimals(paddingRight),
								},
							}),
						...(x >= 0 && {
							x: {
								$set: roundTo2Decimals(x),
							},
						}),
						...(y >= 0 && {
							y: {
								$set: roundTo2Decimals(y),
							},
						}),
						...(width >= 0 && {
							width: {
								$set: roundTo2Decimals(width),
							},
						}),
						...(height >= 0 && {
							height: {
								$set: roundTo2Decimals(height),
							},
						}),
					});
					} else {
						document.removeEventListener("pointerup", stopHandler);
					document.removeEventListener(
						"pointermove",
						moveHandler,
					);
					setIsActive(false);
					setIsDragging(false);
				}
			};
			const stopHandler = () => {
				document.removeEventListener("pointerup", stopHandler);
				document.removeEventListener("pointermove", moveHandler);
				setIsActive(false);
				setIsDragging(false);
			};
				document.addEventListener("pointerup", stopHandler);
				document.addEventListener("pointermove", moveHandler);
			}
		}
	};

	const paddingTop = args.elementData.paddingTopGlobal
		? args.defaultPadding.top
		: args.elementData.paddingTop;
	const paddingBottom = args.elementData.paddingBottomGlobal
		? args.defaultPadding.bottom
		: args.elementData.paddingBottom;
	const paddingLeft = args.elementData.paddingLeftGlobal
		? args.defaultPadding.left
		: args.elementData.paddingLeft;
	const paddingRight = args.elementData.paddingRightGlobal
		? args.defaultPadding.right
		: args.elementData.paddingRight;

	// 判断是否有图片：只有在有图片且拖动时才隐藏阴影
	const hasImage = bgUrl.length > 0;

	return (
		<div
			className={`${styles.element} 
			${isActive ? styles.active : ""} 
			${args.isHover || isActive ? styles.hover : ""} 
			${args.elementData.hidden ? styles.hidden : ""} 
			${args.elementData.paddingBottomGlobal ? styles.paddingBottomGlobal : ""} 
			${args.elementData.paddingLeftGlobal ? styles.paddingLeftGlobal : ""} 
			${args.elementData.paddingRightGlobal ? styles.paddingRightGlobal : ""} 
			${args.elementData.paddingTopGlobal ? styles.paddingTopGlobal : ""}
			${isDragging && hasImage ? styles.dragging : ""}`}
			onContextMenu={(e) => {
				e.preventDefault();
				args.showContextMenu(
					[
						{
							label: "Hide",
							onClick: () => {
								args.updateElement({
									hidden: {
										$set: true,
									},
								});
							},
						},
						{
							label: "Duplicate",
							onClick: () => {
								args.duplicateThis();
							},
						},
						{
							label: "Delete",
							onClick: () => {
								args.showPopup(
									true,
									"Warning",
									<p>
										Confirm deleting &quot;
										{label}
										&quot;
									</p>,
									() => {},
									() => {
										args.deleteThis();
									},
								);
							},
						},
					],
					e.pageX,
					e.pageY,
				);
			}}
			style={{
				height: Math.max(
					0,
					(args.elementData.height +
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingTop + paddingBottom)) *
						args.scale -
						2 * CONSTANT.ELEMENT_BORDER_WIDTH,
				),
				left:
					(args.elementData.x -
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingLeft)) *
						args.scale -
					CONSTANT.ELEMENT_BORDER_WIDTH,
				top:
					(args.elementData.y -
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingTop)) *
						args.scale -
					CONSTANT.ELEMENT_BORDER_WIDTH,
				width: Math.max(
					0,
					(args.elementData.width +
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingLeft + paddingRight)) *
						args.scale -
						2 * CONSTANT.ELEMENT_BORDER_WIDTH,
				),
				zIndex: args.zIndex !== null ? args.zIndex : "auto",
			}}
		>
			<div className={styles.paddingBackgrounds}>
				<div className={styles.paddingBottom} />
				<div className={styles.paddingLeft} />
				<div className={styles.paddingRight} />
				<div className={styles.paddingTop} />
			</div>
			<div className={styles.expandGrid}>
				<div
					onPointerDown={(e) => {
						resizeHelper(e, -1, -1, false);
					}}
					style={{ cursor: "nw-resize" }}
				></div>

				<div
					onPointerDown={(e) => {
						resizeHelper(e, -1, 0, false);
					}}
					style={{ cursor: "n-resize" }}
				></div>

				<div
					onPointerDown={(e) => {
						resizeHelper(e, -1, 1, false);
					}}
					style={{ cursor: "ne-resize" }}
				></div>

				<div
					onPointerDown={(e) => {
						resizeHelper(e, 0, -1, false);
					}}
					style={{ cursor: "w-resize" }}
				></div>

				<div
					onPointerDown={(e) => {
						moveHelper(e);
					}}
					style={{ cursor: "move" }}
				></div>

				<div
					onPointerDown={(e) => {
						resizeHelper(e, 0, 1, false);
					}}
					style={{ cursor: "e-resize" }}
				></div>

				<div
					onPointerDown={(e) => {
						resizeHelper(e, 1, -1, false);
					}}
					style={{ cursor: "sw-resize" }}
				></div>

				<div
					onPointerDown={(e) => {
						resizeHelper(e, 1, 0, false);
					}}
					style={{ cursor: "s-resize" }}
				></div>

				<div
					onPointerDown={(e) => {
						resizeHelper(e, 1, 1, false);
					}}
					style={{ cursor: "se-resize" }}
				></div>
			</div>

			<div
				className={styles.padding}
				style={{
					paddingBottom:
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingBottom) * args.scale,
					paddingLeft:
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingLeft) * args.scale,
					paddingRight:
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingRight) * args.scale,
					paddingTop:
						(args.elementData.type === EmulatorElementType.Screen
							? 0
							: paddingTop) * args.scale,
				}}
			>
				<div
					className={styles.inner}
					style={{
						display: "block",
						height: Math.max(
							0,
							args.elementData.height * args.scale -
								2 * CONSTANT.ELEMENT_BORDER_WIDTH,
						),
						left:
							(args.elementData.type ===
							EmulatorElementType.Screen
								? 0
								: paddingLeft) *
								args.scale -
							CONSTANT.ELEMENT_BORDER_WIDTH,
						position: "absolute",
						top:
							(args.elementData.type ===
							EmulatorElementType.Screen
								? 0
								: paddingTop) *
								args.scale -
							CONSTANT.ELEMENT_BORDER_WIDTH,
						width: Math.max(
							0,
							args.elementData.width * args.scale -
								2 * CONSTANT.ELEMENT_BORDER_WIDTH,
						),
					}}
				>
					{args.elementData.type === EmulatorElementType.Dpad ||
					args.elementData.type === EmulatorElementType.Thumbstick ? (
						<div className={styles.padStickOverlay}>
							<div></div>

							<div></div>

							<div></div>

							<div></div>

							<div></div>

							<div></div>

							<div></div>

							<div></div>

							<div></div>
						</div>
					) : (
						<></>
					)}

		{args.elementData.type ===
		EmulatorElementType.Thumbstick ? (
			<div
				className={`${styles.thumbstickImage}${
					bgUrl.length > 0
						? ""
						: " " + styles.thumbstickImageEmpty
				}${args.elementData.data.thumbstick.hidden ? " " + styles.hidden : ""}`}
			>
				<div
					style={{
						backgroundImage: `url(${bgUrl})`,
						backgroundPosition: "center",
						backgroundSize: "100% 100%",
						height:
							args.elementData.data.thumbstick &&
							args.elementData.data.thumbstick.height
								? `${args.elementData.data.thumbstick.height * args.scale}px`
								: "0",
						position: "absolute",
						width:
							args.elementData.data.thumbstick &&
							args.elementData.data.thumbstick.width
								? `${args.elementData.data.thumbstick.width * args.scale}px`
								: "0",
					}}
				></div>
			</div>
		) : (
			<></>
		)}

		{/* 显示 Default 和 Dpad 类型的按钮图片 */}
		{(args.elementData.type === EmulatorElementType.Default ||
		args.elementData.type === EmulatorElementType.Dpad) &&
		bgUrl.length > 0 ? (
			<div
				className={styles.buttonImage}
				style={{
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					pointerEvents: "none",
				}}
			></div>
		) : null}

					<div className={styles.expandGrid}>
						<div
							onPointerDown={(e) => {
								resizeHelper(e, -1, -1, true);
							}}
							style={{ cursor: "nw-resize" }}
						></div>

						<div
							onPointerDown={(e) => {
								resizeHelper(e, -1, 0, true);
							}}
							style={{ cursor: "n-resize" }}
						></div>

						<div
							onPointerDown={(e) => {
								resizeHelper(e, -1, 1, true);
							}}
							style={{ cursor: "ne-resize" }}
						></div>

						<div
							onPointerDown={(e) => {
								resizeHelper(e, 0, -1, true);
							}}
							style={{ cursor: "w-resize" }}
						></div>

						<div
							onPointerDown={(e) => {
								moveHelper(e);
							}}
							style={{ cursor: "move" }}
						></div>

						<div
							onPointerDown={(e) => {
								resizeHelper(e, 0, 1, true);
							}}
							style={{ cursor: "e-resize" }}
						></div>

						<div
							onPointerDown={(e) => {
								resizeHelper(e, 1, -1, true);
							}}
							style={{ cursor: "sw-resize" }}
						></div>

						<div
							onPointerDown={(e) => {
								resizeHelper(e, 1, 0, true);
							}}
							style={{ cursor: "s-resize" }}
						></div>

						<div
							onPointerDown={(e) => {
								resizeHelper(e, 1, 1, true);
							}}
							style={{ cursor: "se-resize" }}
						></div>
					</div>

					<div className={styles.labelDiv}>
						<div
							className={`${styles.inputsDescription}${
								!args.isBackground
									? " " + styles.emptyImage
									: ""
							}`}
						>
							{label}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getElementLabel = (
	e: EmulatorElement,
	showButtonDefault?: boolean,
) => {
	let label = "";
	switch (e.type) {
		case EmulatorElementType.Thumbstick:
			label = "Thumbstick";
			break;
		case EmulatorElementType.Dpad:
			label = "D-Pad";
			break;
		case EmulatorElementType.Touchscreen:
			label = "Touchscreen";
			break;
		case EmulatorElementType.Screen:
			label = "Screen";
			break;
		case EmulatorElementType.Default:
			if (e.data.inputs?.length > 0) {
				label = e.data.inputs.join(", ");
			}
			break;
	}
	if (
		showButtonDefault &&
		e.type === EmulatorElementType.Default &&
		label.trim().length === 0
	)
		label = "Not Bound";
	return label;
};
