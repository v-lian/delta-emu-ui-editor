"use client";
import inputStyles from "../input.module.css";
import styles from "./index.module.css";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

export default function DropdownInput(args: {
	label: string;
	onChange: (val: string) => void;
	style?: CSSProperties;
	value: string;
	values: Record<string, string>;
}) {
	const innerRef = useRef<HTMLSelectElement>(null);
	const elem = useRef<HTMLDivElement>(null);
	const elemDropdown = useRef<HTMLDivElement>(null);
	const id = useMemo(() => (Math.random() + 1).toString(36).substring(2), []);
	const [state, setState] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [dropdownPos, setDropdownPos] = useState<{
		heightLeft: number;
		left: number;
		top: number;
		width: number;
	}>({ heightLeft: 0, left: 0, top: 0, width: 0 });
	const onChange = (val: string) => {
		setIsOpen(false);
		setState(val);
		args.onChange(val);
	};
	useEffect(() => {
		if (state != args.value) {
			setState(args.value);
		}
	}, [args.value]);
	useEffect(() => {
		const onClick = (e: PointerEvent) => {
			if (
				elem.current &&
				!elem.current.contains(e.target as HTMLElement) &&
				elemDropdown.current &&
				!elemDropdown.current.contains(e.target as HTMLElement)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("pointerdown", onClick);
		return () => {
			document.removeEventListener("pointerdown", onClick);
		};
	}, []);
	const updateDropdownPosition = () => {
		if (elem.current) {
			const rect = elem.current.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			
			setDropdownPos({
				heightLeft: viewportHeight - rect.bottom,
				left: rect.left,
				top: rect.bottom,
				width: rect.width,
			});
		}
	};
	
	useEffect(() => {
		updateDropdownPosition();
	}, [elem]);
	
	useEffect(() => {
		if (isOpen) {
			updateDropdownPosition();
		}
	}, [isOpen]);
	
	useEffect(() => {
		const onResize = () => {
			if (isOpen) {
				updateDropdownPosition();
			}
		};
		const onScroll = () => {
			if (isOpen) {
				updateDropdownPosition();
			}
		};
		window.addEventListener("resize", onResize);
		document.addEventListener("scroll", onScroll, true);
		return () => {
			window.removeEventListener("resize", onResize);
			document.removeEventListener("scroll", onScroll, true);
		};
	}, [isOpen]);
	return (
		<form
			className={styles.input}
			style={{
				...args.style,
				display: "grid",
				gridTemplateColumns: "subgrid",
			}}
		>
			<span
				style={{
					height: 0,
					margin: -1,
					overflow: "hidden",
					padding: 0,
					position: "fixed",
					width: 0,
				}}
			>
				<select
					id={id}
					onBlur={(e) => {
						setIsFocus(false);
						if (e.relatedTarget) setIsOpen(false);
					}}
					onChange={(e) => {
						onChange(e.target.value);
					}}
					onFocus={() => {
						setIsFocus(true);
					}}
					ref={innerRef}
					value={state}
				>
					{...Object.keys(args.values).map((key) => (
						<option key={key} value={key}>
							{args.values[key]}
						</option>
					))}
				</select>
			</span>
			<div
				className={inputStyles.input}
				style={{ gridColumn: "start / end" }}
			>
				<label
					className={inputStyles.label}
					htmlFor={id}
					onClick={() => {
						setIsOpen(true);
						if (innerRef.current) innerRef.current.focus();
					}}
					onPointerOut={() => {
						setIsHover(false);
					}}
					onPointerOver={() => {
						setIsHover(true);
					}}
					style={{ alignSelf: "center", gridColumn: "start / label" }}
				>
					{args.label}
				</label>

				<div
					className={`${inputStyles.inputInner} ${styles.dropdown} ${
						isOpen ? styles.active : ""
					} ${isHover || isFocus ? styles.hover : ""}`}
					onClick={() => {
						setIsOpen(true);
						if (innerRef.current) innerRef.current.focus();
					}}
					ref={elem}
					style={{ gridColumn: "label / end" }}
				>
					<div
						style={{
							position: "absolute",
						}}
					>
						{args.values[state]}
					</div>
					{/* Hack to ensure dropdown is wide enough to fit the longest value */}
					<div className={styles.dropdownWidthHack}>
						{Object.keys(args.values).map((val: string) => (
							<div key={val}>{args.values[val]}</div>
						))}
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className={styles.dropdownContainer}
					ref={elemDropdown}
					style={{
						position: "fixed",
						left: dropdownPos.left,
						top: dropdownPos.top,
						width: dropdownPos.width,
						maxHeight: dropdownPos.heightLeft,
						zIndex: 10000000,
					}}
				>
					<div
						className={styles.dropdownItems}
						style={{
							maxHeight: dropdownPos.heightLeft,
							width: "100%",
						}}
					>
						{Object.keys(args.values).map((val: string) => (
							<div
								key={val}
								onClick={() => {
									if (val != state) {
										onChange(val);
									}
								}}
							>
								{args.values[val]}
							</div>
						))}
					</div>
				</div>
			)}
		</form>
	);
}
