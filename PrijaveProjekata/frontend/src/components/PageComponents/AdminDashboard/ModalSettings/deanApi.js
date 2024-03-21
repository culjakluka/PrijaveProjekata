// deanApi.js
const BASE_URL = '/api/dean';

// get all deans..in reality there should be only one at index [0]
export const getDean = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch dean data');
            throw new Error('Failed to fetch dean data');
        }
    } catch (error) {
        console.error('Error during getDean:', error);
        throw new Error('Error during getDean');
    }
};

// create dean
export const createDean = async (deanData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deanData),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to create dean');
            throw new Error('Failed to create dean');
        }
    } catch (error) {
        console.error('Error during createDean:', error);
        throw new Error('Error during createDean');
    }
};


// update dean
export const updateDean = async (id, deanData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deanData),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to update dean');
            throw new Error('Failed to update dean');
        }
    } catch (error) {
        console.error('Error during updateDean:', error);
        throw new Error('Error during updateDean');
    }
};

// delete dean
export const deleteDean = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to delete dean');
            throw new Error('Failed to delete dean');
        }
    } catch (error) {
        console.error('Error during deleteDean:', error);
        throw new Error('Error during deleteDean');
    }
};