import Component from '../Component.js';

class Login extends Component {
  onRender(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const user = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(user => {
          if(user._id) {
            window.location.href = '../my-shelves.html';
          } else {
            const error = document.createElement('div');
            error.innerHTML = '<p>Wrongs creds of user does not exist<p>';
            form.appendChild(error);
            if(form.children.length > 2) form.removeChild(form.lastChild);
          }
        });
    });
  }

  renderHTML() {
    return /*html*/`
      <div>
        <form>
          <fieldset>
            <legend>Login</legend>
            <input name="email" type="text" placeholder="email">
            <input name="password" type="password" placeholder="password">
          </fieldset>
          <button>Login</button>
        </form>
      </div>
    `;
  }
}

export default Login;
