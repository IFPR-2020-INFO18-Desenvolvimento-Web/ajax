const urlBase = 'https://api.github.com';
const botaoCarregar = document.querySelector('#carregar');
const listaUsuarios = document.querySelector('#lista-usuarios');

let ultimoUsuarioId = 0;

const consultarRepositorios = login => {
  axios
    .get(`${urlBase}/users/${login}/repos`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
    .then(response => {
      const repositorios = response.data;
      const modal = document.querySelector('#repositoriosModal');
      const listaRepositorios = modal.querySelector('.lista-repositorios');
      listaRepositorios.innerHTML = '';
      for (const repositorio of repositorios) {
        listaRepositorios.innerHTML += `
          <li class="list-group-item">
            <a href="${repositorio.html_url}">${repositorio.name}</a>
          </li>
        `;
      }
      const repositoriosModal = new bootstrap.Modal(modal);
      repositoriosModal.show();
    });
};

const consultarUsuario = login => {
  axios
    .get(`${urlBase}/users/${login}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
    .then(response => {
      const usuario = response.data;

      const divUsuario = document.querySelector(`#${login}`);
      const spanSeguidores = divUsuario.querySelector('.seguidores');
      const spanSeguindo = divUsuario.querySelector('.seguindo');
      const spanRepositorios = divUsuario.querySelector('.repositorios');
      const verRepositorio = divUsuario.querySelector('.ver-repositorios');

      spanSeguidores.textContent = `${usuario.followers} seguidores`;
      spanSeguindo.textContent = `${usuario.following} seguindo`;
      spanRepositorios.textContent = `${usuario.public_repos} repositórios`;

      verRepositorio.addEventListener('click', () => {
        consultarRepositorios(login);
      });
    });
};

const consultarUsuarios = () => {
  axios
    .get(`${urlBase}/users`, {
      params: {
        per_page: 12,
        since: ultimoUsuarioId,
      },
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
    .then(response => {
      listaUsuarios.innerHTML = '';
      for (const usuario of response.data) {
        const cardUsuario = montaCardUsuario(usuario);
        listaUsuarios.innerHTML += cardUsuario;
        consultarUsuario(usuario.login);
        ultimoUsuarioId = usuario.id;
      }
    });
};

const montaCardUsuario = usuario => {
  return `
    <div class="col-2 mb-3">
      <div class="card" id="${usuario.login}">
        <a href="${usuario.html_url}">
          <img class="card-img-top" src="${usuario.avatar_url}" />
        </a>
        <div class="card-body">
          <h5 class="card-title">${usuario.login}</h5>
          <span class="badge rounded-pill bg-info seguidores">Carregando...</span>
          <span class="badge rounded-pill bg-info seguindo">Carregando...</span>
          <span class="badge rounded-pill bg-info repositorios">Carregando... públicos</span>
          <button type="button" class="btn btn-link mt-2 w-100 ver-repositorios">Ver Repositórios</button>
        </div>
      </div>
    </div>
  `;
};

botaoCarregar.addEventListener('click', () => {
  consultarUsuarios();
});
