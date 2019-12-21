import Component from '../Component.js';
import Header from '../common/Header.js';
import Signup from './Signup.js';
//import Login from './Login.js';

class App extends Component {
  onRender(el) {
    const header = new Header();
    el.prepend(header.renderDOM());

    //the following needs to be in an if/else statement, only one should show at a time.
    const signup = new Signup();
    el.appendChild(signup.renderDOM());

    // const login = new Login();
    // el.appendChild(login.renderDOM());
  }

  renderHTML() {
    return /*html*/`
            <div>
            <div>`;
  }
}

export default App;
