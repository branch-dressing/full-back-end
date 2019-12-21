import Component from '../Component.js';

class Signup extends Component {
  onRender(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      console.log('Event Listener Working');

      const formData = new FormData(event.target);
      const user = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json());
        // .then(() => {
        //   window.location.reload();
        // });
    });
  }

  renderHTML() {
    return /*html*/`
      <form>
        <fieldset>
          <legend>Signup</legend>
          <input name="email" type="text" placeholder="email">
          <input name="password" type="password" placeholder="password">
        </fieldset>
        <button>Signup</button>
      </form>
    `;
  }

}

export default Signup;
