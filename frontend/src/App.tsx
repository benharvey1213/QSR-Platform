import { ReactNode, useContext, useEffect, useState } from "react";
import { logout } from "./service/AuthService"
import { AuthContext } from "./contexts/AuthContext";
import { Edit, LogOut, Plus } from "react-feather";
import { getMenuItems, MenuItem } from "./service/BackendInterfaceService";
import { Link } from "react-router";

function Card({ children }: { children: ReactNode }) {
	return <div className="bg-white rounded-xl shadow-xl">
		{children}
	</div>
}

function formatPrice(price: number) {
	return `$${price.toFixed(2)}`;
}

export default function App() {
	// const [count, setCount] = useState(0);
	const { token, setToken } = useContext(AuthContext);

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
		{/* <p>home page</p> */}

		<div className="absolute top-0 left-0 right-0 h-[300px] bg-[#6C63FF]">

		</div>

		<div className="absolute top-0 left-0 right-0 p-5 grid grid-cols-[1fr_auto] items-center text-white">
			<p className="text-xl font-medium">Welcome!</p>

			<button className="" onClick={() => {
				logout(setToken);
			}}>
				<LogOut color="white"/>
			</button>
		</div>

		<div className="relative mt-[200px] z-10">
			<div className="max-w-[800px] mx-auto grid grid-cols-3 gap-5">
				<Card>
					<button className="w-full h-full grid place-items-center">
						<div className="flex flex-col items-center gap-1">
							<Plus strokeWidth={2}/>
							<h2>Create Menu Item</h2>
						</div>
					</button>
				</Card>

				{menuItems.map(item => {
					return <Card key={item.id}>
						<div className="grid p-8">
							<div className="grid grid-cols-[1fr_auto] gap-2">
								<h2 className="font-bold text-xl">{item.name}</h2>
								<Link to={`/menu-item/${item.id}`} className="p-[5px]">
									<Edit size={20}/>
								</Link>
							</div>
							<p className="text-lg">{formatPrice(item.price)}</p>
							<p className="pt-2">{item.description}</p>
						</div>
					</Card>
				})}
			</div>
		</div>
	</div>
}