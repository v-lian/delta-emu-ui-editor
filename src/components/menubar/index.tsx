"use client";
import styles from "./index.module.css";
import icons from "@/utils/icons.module.css";
import MenuCategory from "./menucategory";
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import MenuButton from "./menubutton";
import { Asset, InfoFile, ScaleData, ShowPopupFunc } from "@/data/types";
import AboutInfo from "../commonPopups/aboutinfo";
import ControlsInfo from "../commonPopups/controlsinfo";
import MenuToggle from "./menutoggle";
import SponsorInfo from "../commonPopups/sponsorinfo";
import requestFiles from "@/utils/requestFiles";
import * as CONSTANT from "@/data/constants";

export default function MenuBar(args: {
	canRedo: boolean;
	canUndo: boolean;
	clearUI: () => void;
	getReferencedAssets: (infoFile: InfoFile) => Record<string, Asset>;
	loadDeltaskin: (file: File) => void;
	loadManicskin: (file: File) => void;
	parseJSON: (json: Record<string, unknown>) => void;
	redo: () => void;
	saveDeltaskin: () => void;
	saveManicskin: () => void;
	saveJSON: () => { infoFile: InfoFile; json: string };
	setAssets: Dispatch<SetStateAction<Record<string, Asset> | null>>;
	setScale: Dispatch<SetStateAction<ScaleData>>;
	setSidebarVisibility: Dispatch<
		SetStateAction<{ left: boolean; right: boolean }>
	>;
	showPopup: ShowPopupFunc;
	showPreferences: () => void;
	undo: () => void;
}) {
	const [isActive, setIsActive] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);
	const navbuttons = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
				setIsActive(false);
			}
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (ref.current?.contains(document.activeElement)) {
				const elem = document.activeElement;
				if (elem) {
					switch (e.key) {
						case "ArrowDown":
							if (
								elem.getAttribute("data-type") ===
								"menu-category"
							) {
								setIsActive(true);
								(
									elem.nextElementSibling
										?.children[0] as HTMLElement
								).focus();
							} else {
								(
									elem?.nextElementSibling as HTMLElement
								)?.focus();
							}
							break;
						case "ArrowLeft":
							if (
								elem.getAttribute("data-type") ===
								"menu-category"
							) {
								if (
									elem.parentElement
										?.previousElementSibling &&
									elem.parentElement?.previousElementSibling
										?.children?.length > 0
								)
									(
										elem.parentElement
											.previousElementSibling
											.children[0] as HTMLElement
									).focus();
							} else {
								if (
									elem.parentElement?.parentElement
										?.previousElementSibling &&
									elem.parentElement.parentElement
										.previousElementSibling.children
										.length > 0
								)
									(
										elem.parentElement.parentElement
											.previousElementSibling
											.children[0] as HTMLElement
									).focus();
							}
							break;
						case "ArrowRight":
							if (
								elem.getAttribute("data-type") ===
								"menu-category"
							) {
								if (
									elem.parentElement?.nextElementSibling &&
									elem.parentElement?.nextElementSibling
										?.children?.length > 0
								)
									(
										elem.parentElement.nextElementSibling
											.children[0] as HTMLElement
									).focus();
							} else {
								if (
									elem.parentElement?.parentElement
										?.nextElementSibling &&
									elem.parentElement.parentElement
										.nextElementSibling.children.length > 0
								)
									(
										elem.parentElement?.parentElement
											?.nextElementSibling
											?.children[0] as HTMLElement
									).focus();
							}
							break;
						case "ArrowUp":
							if (elem.previousElementSibling) {
								(
									elem.previousElementSibling as HTMLElement
								)?.focus();
							} else if (
								elem.parentElement?.previousElementSibling?.getAttribute(
									"data-type",
								) === "menu-category"
							) {
								(
									elem.parentElement
										.previousElementSibling as HTMLElement
								).focus();
								setIsActive(false);
							} else if (
								elem.getAttribute("data-type") ===
								"menu-category"
							) {
								setIsActive(false);
							}
							break;
					}
				}
			}
		};
		const onKeyAlt = (e: KeyboardEvent) => {
			if (!ref.current?.contains(document.activeElement)) {
				if (
					e.key === "Alt" &&
					navbuttons.current &&
					navbuttons.current.children.length > 0 &&
					navbuttons.current.children[0].children.length > 0
				) {
					e.preventDefault();
					e.stopImmediatePropagation();
					(
						navbuttons.current.children[0]
							.children[0] as HTMLElement
					).focus();
				}
			}
		};
		document.addEventListener("click", onClick);
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyAlt, { capture: true });

		return () => {
			document.removeEventListener("click", onClick);
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyAlt, { capture: true });
		};
	}, []);
	return (
		<div
			className={`${styles.menubar}${
				isActive ? " " + styles.active : ""
			}`}
			ref={ref}
		>
			<div
				style={{
					flexGrow: 1,
					flexShrink: 1,
				}}
			>
				<MenuToggle
					className={`${styles.narrowScreenOnly} ${styles.menuToggle}`}
					label={
						<div
							className={`${icons.icon} ${icons.menuExpand}`}
							style={{
								height: "var(--icon-size)",
								width: "var(--icon-size)",
							}}
						/>
					}
					onClick={() => {
						args.setSidebarVisibility((val) => {
							return {
								left: !val.left,
								right: true,
							};
						});
					}}
				/>
				<div className={styles.navButtons} ref={navbuttons}>
					<MenuCategory
						isActive={isActive}
						label="文件"
						setIsActive={setIsActive}
					>
						<MenuButton
							key="newskin"
							label="新建皮肤"
							onClick={() => {
								args.showPopup(
									true,
									"警告",
									<p>
										当前皮肤将会丢失！确定要继续吗？
									</p>,
									() => {},
									() => {
										args.clearUI();
									},
								);
							}}
						/>
						<MenuButton
							key="loadskin"
							label="加载 Skin"
							onClick={() => {
								setIsActive(false);
								requestFiles(".deltaskin,.manicskin", false, (files) => {
									const fileName = files[0].name.toLowerCase();
									if (fileName.endsWith('.manicskin')) {
										args.loadManicskin(files[0]);
									} else {
										args.loadDeltaskin(files[0]);
									}
								});
							}}
						/>
						<MenuButton
							key="saveskin"
							label="保存 Skin"
							onClick={() => {
								setIsActive(false);
								
								// 使用标记防止重复执行
								let isExecuted = false;
								
								const handleSave = (saveFunc: () => void) => {
									console.log('handleSave 被调用');
									if (isExecuted) {
										console.log('已执行过，跳过');
										return;
									}
									isExecuted = true;
									console.log('开始保存流程');
									
									// 查找并关闭弹窗
									const dialog = document.querySelector('[role="alertdialog"]');
									console.log('找到弹窗:', dialog);
									const closeBtn = dialog?.querySelector('button') as HTMLButtonElement;
									console.log('找到关闭按钮:', closeBtn);
									if (closeBtn) {
										closeBtn.click();
										console.log('点击了关闭按钮');
									}
									
									// 执行保存
									console.log('调用保存函数');
									saveFunc();
									console.log('保存函数调用完成');
								};
								
								args.showPopup(
									true,
									"选择保存格式",
									<div style={{ 
										display: 'flex', 
										flexDirection: 'column', 
										gap: '20px',
										alignItems: 'center',
										padding: '10px 0'
									}}>
										<p style={{ margin: 0, fontSize: '16px' }}>
											请选择要保存的皮肤格式：
										</p>
										<div style={{ display: 'flex', gap: '15px', width: '100%', justifyContent: 'center' }}>
											<button
												onClick={(e) => {
													console.log('=== .deltaskin 按钮被点击 ===');
													e.preventDefault();
													e.stopPropagation();
													console.log('开始调用 handleSave');
													handleSave(args.saveDeltaskin);
												}}
												style={{
													padding: '12px 24px',
													fontSize: '15px',
													cursor: 'pointer',
													borderRadius: 'var(--border-radius)',
													border: '2px solid var(--theme-primary)',
													background: 'var(--theme-primary)',
													color: '#fff',
													fontWeight: 'bold',
													transition: 'all 0.2s ease',
													minWidth: '140px',
												}}
											>
												.deltaskin
											</button>
											<button
												onClick={(e) => {
													console.log('=== .manicskin 按钮被点击 ===');
													e.preventDefault();
													e.stopPropagation();
													console.log('开始调用 handleSave');
													handleSave(args.saveManicskin);
												}}
												style={{
													padding: '12px 24px',
													fontSize: '15px',
													cursor: 'pointer',
													borderRadius: 'var(--border-radius)',
													border: '2px solid var(--confirm-button)',
													background: 'var(--confirm-button)',
													color: '#fff',
													fontWeight: 'bold',
													transition: 'all 0.2s ease',
													minWidth: '140px',
												}}
											>
												.manicskin
											</button>
										</div>
									</div>,
									() => {}, // onClose callback
								);
							}}
						/>
						<MenuButton
							key="savejson"
							label="保存 info.json"
							onClick={() => {
								setIsActive(false);
								const exportObj = args.saveJSON();
								const elem = document.createElement("a");
								const file = new Blob([exportObj.json], {
									type: "application/json",
								});
								elem.href = URL.createObjectURL(file);
								elem.download = "info.json";
								document.body.appendChild(elem);
								elem.click();
								document.body.removeChild(elem);
							}}
						/>
						<MenuButton
							key="loadjson"
							label="加载 info.json"
							onClick={() => {
								setIsActive(false);
								requestFiles(
									"application/json",
									false,
									(files) => {
										files[0].text().then((val: string) => {
											try {
												const readJson =
													JSON.parse(val);
												args.parseJSON(readJson);
											} catch (e) {
												console.error(
													"Error parsing imported JSON!",
													e,
												);
												args.showPopup(
													true,
													"错误",
													<p>
														无法解析 JSON 文件！
													</p>,
													() => {},
												);
											}
										});
									},
								);
							}}
						/>
						<MenuButton
							key="preferences"
							label="偏好设置"
							onClick={args.showPreferences}
						/>
					</MenuCategory>

					{/* <MenuCategory
						isActive={isActive}
						label="编辑"
						setIsActive={setIsActive}
					>
						<MenuButton
							disabled={!args.canUndo}
							key="undo"
							label="撤销"
							onClick={() => {
								args.undo();
							}}
						/>
						<MenuButton
							disabled={!args.canRedo}
							key="redo"
							label="重做"
							onClick={() => {
								args.redo();
							}}
						/>
					</MenuCategory>

					<MenuCategory
						isActive={isActive}
						label="画布"
						setIsActive={setIsActive}
					>
						<MenuButton
							key="returncenter"
							label="回到中心"
							onClick={() => {
								args.setScale((oldScale) => {
									return {
										scale: oldScale.scale,
										xOffset: 0,
										yOffset: 0,
									};
								});
							}}
						/>
						<MenuButton
							key="resetzoom"
							label="重置缩放"
							onClick={() => {
								args.setScale((oldScale) => {
									return {
										scale: 1,
										xOffset: oldScale.xOffset,
										yOffset: oldScale.yOffset,
									};
								});
							}}
						/>
					</MenuCategory>

					<MenuCategory
						isActive={isActive}
						label="帮助"
						setIsActive={setIsActive}
					>
						<MenuButton
							key="controls"
							label="控制说明"
							onClick={() => {
								args.showPopup(
									false,
									"控制说明",
									<ControlsInfo />,
									() => {},
								);
							}}
						/>
						<MenuButton
							key="donate"
							label="赞助"
							onClick={() => {
								args.showPopup(
									false,
									`赞助 ${CONSTANT.NAME}`,
									<SponsorInfo />,
									() => {},
								);
							}}
						/>
						<MenuButton
							key="about"
							label="关于"
							onClick={() => {
								args.showPopup(
									false,
									`关于 ${CONSTANT.NAME}`,
									<AboutInfo />,
									() => {},
								);
							}}
						/>
					</MenuCategory> */}
				</div>
			</div>
			<div
				style={{
					flexGrow: 1,
					flexShrink: 0,
					justifyContent: "flex-end",
				}}
			>
				<MenuToggle
					className={`${styles.narrowScreenOnly} ${styles.menuToggle}`}
					label={
						<div
							className={`${icons.icon} ${icons.menuCollapse}`}
							style={{
								height: "var(--icon-size)",
								width: "var(--icon-size)",
							}}
						/>
					}
					onClick={() => {
						args.setSidebarVisibility((val) => {
							return {
								left: true,
								right: !val.right,
							};
						});
					}}
				/>
			</div>
		</div>
	);
}
