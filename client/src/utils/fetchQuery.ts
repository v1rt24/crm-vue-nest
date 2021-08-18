import router from '../router';
import store from '../store';

interface IBody {
    method: string,
    headers: {
        [key: string]: string
    };
    body?: string | FormData;
}

export const FetchQuery = async (url: RequestInfo, method?: string, data?: object | FormData): Promise<object> => {
    // @ts-ignore
    const TOKEN = localStorage.getItem(import.meta.env.VITE_TOKEN);

    let bodyData: IBody = {
        method: method || 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    };

    if (data) {
        if (data instanceof FormData) {
            bodyData.body = data;
        } else {
            bodyData.headers['Content-Type'] = 'application/json';
            bodyData.body = JSON.stringify(data);
        }
    }

    try {
        const resData = await fetch(`${import.meta.env.VITE_URL_SERVER}/${url}`, {
            ...bodyData,
        });

        const res = await resData.json();

        if (!resData.ok) {
            if (resData.status === 401) {
                await router.push({name: 'Login', query: {message: 'notAuthorized'}});
                store.commit('auth/logout');
            }
            throw res;
        }

        return res;
    } catch (error) {
        throw error;
    }
};