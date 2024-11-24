import { API_URL } from "../main";

export interface MenuItem {
    id: number;
	name: string;
	description: string;
	price: number;
}

export async function getMenuItems(token: string): Promise<MenuItem[]> {
    try {
        const response = await fetch(`${API_URL}/menus`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
}

export async function getMenuItemById(id: number, token: string): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/menus/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching menu item by id:', error);
        throw error;
    }
}