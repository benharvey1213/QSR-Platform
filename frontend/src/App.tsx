import { ReactNode, useContext, useEffect, useState } from "react";

import { ArrowRight, Plus } from "react-feather";
import { Link } from "react-router";

import { getMenuItems, MenuItem } from "./service/BackendInterfaceService";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";

function Card({ to, color = "white", border="#e5e7eb", children }: { to: string, color?: string, border?: string, children: ReactNode }) {
	return <Link to={to} className="group rounded-xl border shadow-sm hover:shadow-xl min-h-[200px] transition-all hover:translate-y-[-10px]" style={{
		backgroundColor: color,
		borderColor: border
	}}>
		{children}
	</Link>
}

function formatPrice(price: number) {
	return `$${price.toFixed(2)}`;
}

export default function App() {
	const { token } = useContext(AuthContext);

	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		if (token) {
			getMenuItems(token).then(data => {
				console.log('got menu items', data);
				setMenuItems(data);
			})
		}
	}, [token])

	return <div className="bg-[#FAFAFA] w-full min-h-screen">
		<Header title="Menu Items" color="black"/>

		<div className="relative mt-[200px] z-10">
			<div className="max-w-[800px] mx-auto grid grid-cols-3 gap-5">
				<Card to="/menu-item/new">
					<div className="w-full h-full grid place-items-center">
						<div className="flex items-center gap-1">
							<Plus size={24}/>
							<h2 className="text-xl leading-none mb-[3px]">New</h2>
						</div>
					</div>
				</Card>

				{menuItems.map(item => {
					return <Card to={`/menu-item/${item.id}`} key={item.id}>
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
		</div>
	</div>
}