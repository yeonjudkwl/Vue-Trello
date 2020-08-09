import axios from 'axios'
import router from '@/router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    router.push('/login')
}

const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
        .then( res => res.data )
        .catch( res => {
            const { status } = res.response
            if ( status === UNAUTHORIZED ) {
                onUnauthorized()
            }
            // 401 외의 error
            throw Error(res)
        })
}
export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}
export const board = {
    fetch (id) {
        return id ? request('get', `/boards/${id}`) : request('get', '/boards')
    },
    create(title) {
        return request('post', '/boards', { title })
    },
    destroy(id) {
        return request('delete', `/boards/${id}`)
    }
}

export const auth = {
    login (email, password) {
        return request('post', '/login', { email, password })
    }
}

export const card = {
    create(title, listId, pos) {
        return request('post', '/cards', {title, listId, pos})
    },
    fetch(id) {
        return request('get', `/cards/${id}`)
    },
    update(id, payload) {
        return request('put', `/cards/${id}`, payload)
    },
    destroy(id) {
        return request('delete', `/cards/${id}`)
    }
}