"use client";

import ValueInput from "../inputs/valueinput";
import CheckboxInput from "../inputs/checkbox";
import { InfoFile, ShowContextMenuFunc, ShowPopupFunc } from "@/data/types";
import * as Tree from "../objectTree";
import InputGrid from "../inputGrid";

export default function RepresentationTreeWindow(args: {
	applyRepresentation: (key: string) => void;
	createNode: (key: string, isLayout: boolean) => void;
	currentRepresentation: string;
	deleteNode: (key: string) => void;
	infoFile: InfoFile;
	showContextMenu: ShowContextMenuFunc;
	showPopup: ShowPopupFunc;
}) {
	const getChildren: (
		e: Record<string, unknown>,
		keyStr: string,
		depth: number,
	) => React.JSX.Element[] = (e, keyStr, depth) => {
		if (e && !("elements" in e) && !("layout" in e)) {
			return Object.keys(e)
				.sort()
				.map((key: string, i: number) => (
					<Tree.Item
						data={e[key] as Record<string, unknown>}
						depth={depth + 1}
						getChildren={getChildren}
						key={i}
						keyStr={`${keyStr}.${key}`}
						label={key}
						onClick={() => {
							args.applyRepresentation(
								`${keyStr}.${key}`.slice(1),
							);
						}}
						onContextMenu={(event) => {
							event.preventDefault();
							const menuElements = [];
							const isContainer = !(
								"elements" in
								(e[key] as Record<string, unknown>)
							) &&
							!(
								"layout" in
								(e[key] as Record<string, unknown>)
							);
							
							// 如果是容器节点（非布局节点），根据层级显示不同选项
							// 注意：depth 是父层级，当前节点的实际深度是 depth + 1
							if (isContainer) {
								let quickOptions: Array<{ name: string; label: string; isLayout: boolean }> = [];
								const currentDepth = depth + 1;
								
								if (currentDepth === 1) {
									// 第一层：设备节点（iphone/ipad），根据设备类型显示不同的布局选项
									const nodeName = key.toLowerCase();
									if (nodeName === "iphone") {
										quickOptions = [
											{ name: "edgeToEdge", label: "全面屏", isLayout: false },
											{ name: "standard", label: "标准", isLayout: false },
										];
									} else if (nodeName === "ipad") {
										quickOptions = [
											{ name: "splitView", label: "分屏", isLayout: false },
											{ name: "standard", label: "标准", isLayout: false },
										];
									}
								} else if (currentDepth === 2) {
									// 第二层：布局类型节点（edgeToEdge/standard/splitView），显示方向选项（自动设置为 Layout Node）
									quickOptions = [
										{ name: "landscape", label: "横屏", isLayout: true },
										{ name: "portrait", label: "竖屏", isLayout: true },
									];
								}
								
								// 添加快捷选项到菜单
								quickOptions.forEach((option) => {
									menuElements.push({
										label: option.label,
										onClick: () => {
											args.createNode(
												`${keyStr}.${key}.${option.name}`.slice(1),
												option.isLayout,
											);
										},
									});
								});
							}
							
							// 添加 Delete 选项
							menuElements.push({
								label: "删除",
								onClick: () => {
									args.showPopup(
										true,
										"警告",
										<p>
											确认删除 &quot;
											{`${keyStr}.${key}`.slice(1)}
											&quot; 吗？
										</p>,
										() => {},
										() => {
											args.deleteNode(
												`${keyStr}.${key}`.slice(1),
											);
										},
									);
								},
							});
							
							args.showContextMenu(
								menuElements,
								event.pageX,
								event.pageY,
							);
						}}
						showActive={
							`${keyStr}.${key}`.slice(1) ===
							args.currentRepresentation
						}
					/>
				));
		} else {
			return [];
		}
	};
	return (
		<Tree.Wrapper
			ariaLabel={"Representation tree"}
			style={{ padding: "3px 5px" }}
		>
			<Tree.Item
				data={args.infoFile.representations}
				depth={0}
				getChildren={getChildren}
				keyStr=""
				label="representations"
				onContextMenu={(event) => {
					event.preventDefault();
					
					// 第一层：直接在 representations 下，显示设备类型选项
					const deviceOptions = [
						{ name: "iphone", label: "iPhone", isLayout: false },
						{ name: "ipad", label: "iPad", isLayout: false },
					];
					
					const menuItems = deviceOptions.map((device) => ({
						label: device.label,
						onClick: () => {
							args.createNode(device.name, device.isLayout);
						},
					}));
					
					args.showContextMenu(
						menuItems,
						event.pageX,
						event.pageY,
					);
				}}
			/>
		</Tree.Wrapper>
	);
}
