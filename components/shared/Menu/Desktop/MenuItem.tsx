"use client";

import { MenuItemDTO } from "./MenuItemDTO";
import Link from "next/link";

const MenuItem = ({ text, childrenIcon, href, onClick }: MenuItemDTO) => {
	return href ? (
		<Link href={href} className="cursor-pointer group relative flex w-full justify-center rounded-sm px-2 py-1.5 text-lg text-neutral-700 hover:bg-neutral-100 hover:text-neutral-800">
			{childrenIcon}
			<span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-neutral-800 px-2 py-1.5 text-xs font-medium text-white group-hover:visible z-50 whitespace-nowrap">
				{text}
			</span>
		</Link>
	) : (
		<div onClick={onClick} className="cursor-pointer group relative flex w-full justify-center rounded-sm px-2 py-1.5 text-lg text-neutral-700 hover:bg-neutral-100 hover:text-neutral-800">
			{childrenIcon}
			<span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-neutral-800 px-2 py-1.5 text-xs font-medium text-white group-hover:visible z-50 whitespace-nowrap">
				{text}
			</span>
		</div>
	);
};

export default MenuItem;
