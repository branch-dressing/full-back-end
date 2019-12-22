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
            console.log('Error');
          }
        });
    });
  }

  renderHTML() {
    return /*html*/`
      <form>
        <fieldset>
          <legend>Login</legend>
          <input name="email" type="text" placeholder="email">
          <input name="password" type="password" placeholder="password">
        </fieldset>
        <button>Login</button>
      </form>
    `;
  }
}

export default Login;
