export function host(endpoint) {
  const appId = '5BDFCD08-36D1-D8FE-FF9E-B312ECB3DC00';
  const restApiKey = '70EBAFD8-2834-4916-B7E2-A2212A7498FE';

  return `https://api.backendless.com/${appId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
  REGISTER: 'users/register',
  LOGIN: 'users/login',
  LOGOUT: 'users/logout',
  BOARDGAMES: 'data/boardgames',
  IMAGES_UPLOAD:'files/images',
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
console.log(boardGame);
  return ( fetch(host(endpoints.BOARDGAMES), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      },
      body: JSON.stringify(boardGame)
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

  return (await fetch(host(endpoints.BOARDGAMES), {
      headers: {
          'Content-Type': 'application/json',
          'user-token': token
      }
  })).json();
}


// export const handleFileSelect = event => {
//   const { files } = event.target // FileList object

//   for (let file of files) {
//     Backendless.Files.upload(file, '/myFiles')
//       .then(onSuccess, onError)
//   }
// }

// export const onSuccess = file => {
//   console.log('Uploaded file URL - ' + file.fileURL)
// }

// export const onError = error => {
//   console.error('Server reported an error: ', error.message)
//   console.error('error code: ', error.code)
//   console.error('http status: ', error.status)
// }
