import {environment} from '../../environments/environment.ts'

export function host(endpoint) {
  return `https://api.backendless.com/${environment.backendless.appId}/${environment.backendless.restApiKey}/${endpoint}`;
}

const endpoints = {
  REGISTER: 'users/register',
  LOGIN: 'users/login',
  LOGOUT: 'users/logout',
  BOARDGAMES: 'data/boardgames',
  IMAGES_UPLOAD:'files/images',
  RATINGS: 'data/gameratings'
};

//REGISTER USER
export async function registerAsync(email, password, userName, mobile) {
  return (await fetch(host(endpoints.REGISTER), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email,
          password,
          userName,
          mobile
      })
  })).json()
}

//LOGIN USER WITH EMAIL
export async function loginAsync(email, password) {
  const result = await (await fetch(host(endpoints.LOGIN), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          login: email,
          password
      })
  })).json();

  return result;
}

//LOGOUT USER
export async function logoutAsync() {
  const token = localStorage.getItem('userToken');
  localStorage.removeItem('userToken');

  return await fetch(host(endpoints.LOGOUT), {
      headers: {
          'user-token': token
      }
  });
}

//CREATE BOARDGAME IN DATABASE
export function createBoardGameAsync(boardGame) {
  const token = localStorage.getItem('userToken');
  return ( fetch(host(endpoints.BOARDGAMES), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      },
      body: JSON.stringify(boardGame)
  })).then(resposne => resposne.json());
}

//CREATE RATING IN DATABASE
export function rateBoardGameAsync(rating) {
  const token = localStorage.getItem('userToken');
  return ( fetch(host(endpoints.RATINGS), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      },
      body: JSON.stringify(rating)
  })).then(resposne => resposne.json());
}


//UPLOAD IMAGE FILE IN DATABASE
export async function uploadFileAsync(fileToUpload) {
  const token = localStorage.getItem('userToken');
  return Backendless.Files.upload( fileToUpload, 'images', true );
}


//READ BOARDGAME FROM DATABASE BY GIVEN ID
export async function getBoardGameByIdAsync(id) {
  const token = localStorage.getItem('userToken');

  return (await fetch(host(endpoints.BOARDGAMES + `/${id}`), {
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      }
  })).json();
}


//READ ALL BOARDGAMES FROM DATABASE
export async function getAllBoardGamesAsync() {
  const token = localStorage.getItem('userToken');

  return (await fetch(host(endpoints.BOARDGAMES + `?sortBy=Rating%20desc`), {
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      }
  })).json();
}

//READ ALL RATINGS FROM DATABASE
export async function getAllRatingsAsync() {
  const token = localStorage.getItem('userToken');

  return (await fetch(host(endpoints.RATINGS), {
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      }
  })).json();
}

//UPDATE OBJECT IN DATABASE BY GIVEN ID
export async function updateBoardGameAsync(id, updatedBoardGame) {
  const token = localStorage.getItem('userToken');

  return (await fetch(host(endpoints.BOARDGAMES + `/${id}`), {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      },
      body: JSON.stringify(updatedBoardGame)
  })).json();
}

//UPDATE OBJECT IN DATABASE BY GIVEN ID
export async function updateRatingAsync(id, rating) {
  const token = localStorage.getItem('userToken');

  return (await fetch(host(endpoints.RATINGS + `/${id}`), {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      },
      body: JSON.stringify(rating)
  })).json();
}

//DELETE OBJECT FROM DATABASE BY GIVEN ID
export async function deleteBoardGameAsync(id) {
  const token = localStorage.getItem('userToken');

  return (await fetch(host(endpoints.BOARDGAMES + `/${id}`), {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      }
  })).json();
}
