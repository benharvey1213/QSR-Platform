import { API_URL } from "../main";

export interface MenuItem {
    id: number;
	name: string;
	description: string;
	price: number;
}

export enum Role {
    ADMIN = "ADMIN",
    EDITOR = "EDITOR",
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

export async function getMenuItemById(id: number, token: string): Promise<MenuItem> {
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

export async function createMenuItem(token: string, name: string, description: string, price: number): Promise<MenuItem> {
    try {
        const response = await fetch(`${API_URL}/menus`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                price
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error creating menu item:', error);
        throw error;
    }
}

export async function deleteMenuItem(id: number, token: string) {
    try {
        const response = await fetch(`${API_URL}/menus/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return true;
    }
    catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
    }
}

export async function updateMenuItem(id: number, token: string, name: string, description: string, price: number): Promise<MenuItem> {
    try {
        const response = await fetch(`${API_URL}/menus/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                price
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
    }
}