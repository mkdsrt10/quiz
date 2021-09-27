import { QUIZ_BACKEND } from './constants';

export async function joinQuiz({ token, id }) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
    };
    try {
        const res = await fetch(QUIZ_BACKEND + '/joinasyncquiz?quizId='+id, req);
        return { data: await res.json(), error: res.status === 400 };
    } catch (e) {
        return { data: null, error: e };
    }
}

export async function startQuiz({ token, id }) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
    };

    try {
        const res = await fetch(QUIZ_BACKEND + '/startasyncquiz?quizId='+id, req);
        return { data: await res.json(), error: res.status === 400 };
    } catch (e) {
        return { data: null, error: e };
    }
}

export async function postAnswers({ token, response, id }) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
        body: JSON.stringify(response),
    };
    try {
        const res = await fetch(QUIZ_BACKEND + '/postanswer?quizId='+id, req);
        return { data: await res.json(), error: res.status === 400 };
    } catch (e) {
        return { data: null, error: e };
    }
}

export async function getSambhav({ token }) {
    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: token,
        },
    };
    try {
        const res = await fetch(QUIZ_BACKEND + '/userstracker', req);
        return { data: res.json(), error: res.status === 400 };
    } catch (e) {
        return { data: true, error: e };
    }
}
