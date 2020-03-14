import Component from '../Component.js';
import Header from '../common/Header.js';
import Signup from './Signup.js';
import Login from './Login.js';

class App extends Component {
  onRender(el) {
    fetch('/api/v1/auth/verify', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(user => {
        if(user._id) window.location.href = '/my-shelves.html';
      });

    const header = new Header();
    el.prepend(header.renderDOM());

    //Would love for these options to be toggled:
    const signup = new Signup();
    el.appendChild(signup.renderDOM());

    const login = new Login();
    el.appendChild(login.renderDOM());
  }

  renderHTML() {
    return /*html*/`
      <div>
      </div>`;
  }
}

export default App;
