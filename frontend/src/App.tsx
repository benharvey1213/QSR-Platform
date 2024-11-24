import { ReactNode, useContext, useEffect, useState } from "react";

import { ArrowRight, Plus } from "react-feather";
import { Link } from "react-router";

import { getMenuItems, MenuItem, Role } from "./service/BackendInterfaceService";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";

function Card({ enabled, to, color = "white", border="#e5e7eb", children }: { enabled?: boolean, to: string, color?: string, border?: string, children: ReactNode }) {
	const className = `
		rounded-xl border shadow-sm

		${enabled ? `
			group
			hover:shadow-xl min-h-[200px]
			transition-all hover:translate-y-[-10px]
		` : ""}
	`

	const style = {
		backgroundColor: color,
		borderColor: border
	}

	if (enabled) {
		return <Link to={to} className={className} style={style}>
			{children}
		</Link>
	}
	else {
		return <div className={className} style={style}>
			{children}
		</div>
	}
}

function formatPrice(price: number) {
	return `$${price.toFixed(2)}`;
}

export default function App() {
	const { token, role } = useContext(AuthContext);

	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		if (token) {
			getMenuItems(token).then(data => {
				console.log('got menu items', data);
				
				setMenuItems(data.sort((a, b) => a.name.localeCompare(b.name)));
			})
		}
	}, [token])

	return <div className="bg-[#FAFAFA] w-full min-h-screen">
		<Header title="All Menu Items" color="#63A8FF"/>

		<div className="relative mt-[200px] z-10">
			<div className="max-w-[850px] mx-auto grid gap-5 px-5">
				<div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-5">

					{role == Role.ADMIN && <Card enabled to="/menu-item/new">
						<div className="w-full h-full grid place-items-center">
							<div className="flex items-center gap-1">
								<Plus size={24}/>
								<h2 className="text-xl leading-none mb-[3px]">New</h2>
							</div>
						</div>
					</Card>}

					{menuItems.map(item => {
						return <Card enabled to={`/menu-item/${item.id}`} key={item.id}>
							<div className="grid p-8 gap-2">
								<div className="grid grid-cols-[1fr_auto]">
									<h2 className="font-bold text-xl">{item.name}</h2>
									<ArrowRight size={24} className="mt-1 transition-transform group-hover:translate-x-[10px]"/>
								</div>

								<p className="text-xs text-neutral-500">{item.description}</p>
								<p className="pt-1">{formatPrice(item.price)}</p>
							</div>
						</Card>
					})}
				</div>

				{role !== Role.ADMIN && <span className="text-sm text-neutral-500">
					(Adding new Menu Items is restricted to Admin users only)
				</span>}
			</div>
		</div>
	</div>
}