import { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "react-feather";

import { createMenuItem, deleteMenuItem, getMenuItemById, MenuItem as MenuItemDefinition, Role, updateMenuItem } from "../service/BackendInterfaceService";
import { AuthContext } from "../contexts/AuthContext";

import Input from "./Input";
import Button from "./Button";
import Header from "./Header";

export default function MenuItem({ newItem = false } : { newItem?: boolean }) {
    const { id } = useParams();
    const { token, role } = useContext(AuthContext);

    const [item, setItem] = useState<MenuItemDefinition | null>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [allowAction, setAllowAction] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && id && !newItem) {
            const idInt = parseInt(id);

            if (!isNaN(idInt)) {
                getMenuItemById(idInt, token).then(data => {
                    console.log('got menu item', data);
                    setItem(data);
                })
            }
        }
    }, [token])

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
        }
    }, [item])

    async function saveItem() {
        if (token) {
            setAllowAction(false);

            if (newItem) {
                createMenuItem(token, name, description, price).then(data => {
                    console.log('created menu item', data);
                    navigate('/');
                })
            }
            else if (item?.id) {
                updateMenuItem(item.id, token, name, description, price).then(data => {
                    console.log('updated menu item', data);
                    navigate('/');
                })
            }
        }
    }

    async function deleteItem() {
        if (token && item?.id) {
            setAllowAction(false);

            deleteMenuItem(item.id, token).then(() => {
                console.log('deleted menu item');
                navigate('/');
            })
        }
    }

    return <div className="bg-[#FAFAFA] w-full min-h-screen">
        <Header title={newItem ? "New Menu Item" : (item?.name ? item.name : "")} color="#63A8FF"/>

        <div className="relative z-10 mt-[200px] max-w-[500px] bg-white mx-auto border rounded-xl shadow-xl p-10 grid gap-10">
            <Link to="/" className="flex gap-2 items-center w-fit">
                <ArrowLeft size={18}/>
                <span className="leading-none mb-[3px]">Back</span>
            </Link>

            <div className="grid gap-5">
                <Input readOnly={role !== Role.ADMIN} placeholder="Name" value={name} setValue={setName}/>
                <Input readOnly={role !== Role.ADMIN} placeholder="Description" value={description} setValue={setDescription}/>
                <Input readOnly={role !== Role.ADMIN} placeholder="Price" value={price} setValue={setPrice} type="number"/>
            </div>

            {role == Role.ADMIN ? <div className="grid gap-3">
                <Button loading={!allowAction} text="Save" onClick={saveItem}/>
                {!newItem && <Button loading={!allowAction} danger text="Delete" onClick={deleteItem}/>}
            </div> : <span className="text-sm text-neutral-500">(Editing is restricted to Admin users only)</span>}
        </div>
    </div>
}