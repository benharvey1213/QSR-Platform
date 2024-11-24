import { useParams } from "react-router";
import { getMenuItemById, MenuItem as MenuItemDefinition } from "../service/BackendInterfaceService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MenuItem({ newItem = false } : { newItem?: boolean }) {
    const { id } = useParams();
    const { token } = useContext(AuthContext);

    const [item, setItem] = useState<MenuItemDefinition | null>(null);

    // function 

    useEffect(() => {
        if (token && id) {
            const idInt = parseInt(id);

            if (!isNaN(idInt)) {
                getMenuItemById(idInt, token).then(data => {
                    console.log('got menu item', data);
                    setItem(data);
                })
            }
        }
    }, [token])

    return (
        <div>
            <h1>MenuItem</h1>

            {JSON.stringify(item)}
        </div>
    );
}