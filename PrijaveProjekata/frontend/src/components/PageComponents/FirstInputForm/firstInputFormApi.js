const BASE_URL = '/api/department';

// load departments


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
