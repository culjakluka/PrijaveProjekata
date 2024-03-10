// departmentApi.js
const BASE_URL = '/api/department';

export const getDepartments = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch department data');
            throw new Error('Failed to fetch department data');
        }
    } catch (error) {
        console.error('Error during getDepartments:', error);
        throw new Error('Error during getDepartments');
    }
};

export const createDepartment = async (departmentData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentData),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to create department');
            throw new Error('Failed to create department');
        }
    } catch (error) {
        console.error('Error during createDepartment:', error);
        throw new Error('Error during createDepartment');
    }
};

export const updateDepartment = async (id, departmentData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentData),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to update department');
            throw new Error('Failed to update department');
        }
    } catch (error) {
        console.error('Error during updateDepartment:', error);
        throw new Error('Error during updateDepartment');
    }
};

export const deleteDepartment = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to delete department');
            throw new Error('Failed to delete department');
        }
    } catch (error) {
        console.error('Error during deleteDepartment:', error);
        throw new Error('Error during deleteDepartment');
    }
};