// //@ts-ignore
// export default async function httpClient(endpoint, method, body = {}) {
//     const BASE_APP_API_URL = process.env.BASE_APP_API_URL
//         ? process.env.BASE_APP_API_URL
//         : 'http://localhost:5000/api';
//     const headers = {'content-type': 'application/json'};

//     const config = {
//         method, // 'POST' : 'GET',
//         headers: {
//             ...headers,
//         },
//     };
//     if (Object.keys(body).length > 0) {
//         config['body'] = JSON.stringify(body);
//     }

//     // console.log('BASE_APP_API_URL', process.env.BASE_APP_API_URL);
//     const response = await fetch(
//         `${BASE_APP_API_URL}/${endpoint}`,
//         config,
//     );
//     console.log('response', response);

//     // if (response.status === 401) {
//     //     logout();
//     //     window.location.assign(window.location);
//     //     return;
//     // }
//     if (response.ok) {
//         return await response.json();
//     } else {
//         const errorMessage = await response.text();
//         console.log('errorMessage',errorMessage)
//         // return Promise.reject(new Error(errorMessage));
//     }
// }

function assertPath(path) {
    const type = typeof path;
    if (type !== 'string') {
        throw new TypeError(
            `The path should be a string, instead received a ${type}`,
        );
    }
}

const BASE_APP_API_URL = process.env.BASE_APP_API_URL
    ? process.env.BASE_APP_API_URL
    : 'http://localhost:5000/api';

async function parseResponse(res: any) {

    if (res.ok) {
        return res.status !== 204 ? await res.json() : {success: true};
    } else {
        const errorMessage = await res.text();
        return Promise.reject(new Error(errorMessage));
    }
}

export function httpClient(path, options: any = {}) {
    const {
        headers,
        query = null,
        method = 'GET',
        body,
        host = BASE_APP_API_URL,
        ...extraOpts
    } = options;
    assertPath(path);

    // Compose the request configuration object
    const reqOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...extraOpts,
    };

    // If a body object is passed, automatically stringify it.
    if (body && !['GET', 'DELETE'].includes(method)) {
        reqOptions.body =
            typeof body === 'object' ? JSON.stringify(body) : body;
    }

    let queryString = '';
    if (query) {
        // Convert to encoded string and prepend with ?
        queryString = new URLSearchParams(query).toString();
        queryString = queryString && `?${queryString}`;
    }

    return fetch(`${host}${path}${queryString}`, reqOptions).then(
        parseResponse,
    );
}
