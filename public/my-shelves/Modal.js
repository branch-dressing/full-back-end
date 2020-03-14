import Component from '../Component.js';

class Modal extends Component {
  onRender(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const book = {
        title: formData.get('title'),
        author: formData.get('author'),
        pages: formData.get('pages'),
        publicationYear: formData.get('publication-year'),
        dateRead: formData.get('date-read'),
      };

      fetch('/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
        .then(res => res.json())
        .then(book => {
          if(book._id) {
            window.location.href = '/my-shelves.html';
          } else {
            console.log('Book NOT created');
          }
        });
    });
  }

  renderHTML(){
    return /*html*/`
    <div>
      <form class="modal">
        <fieldset>
          <legend>Add a Book</legend>
          <label for="title">Title</label>
          <input id="title" name="title" type="text" placeholder="title" required>
          </br>
          <label for="author">Author</label>
          <input id="author" name="author" type="text" placeholder="author" required>
          </br>
          <label for="pages">Pages</label>
          <input id="pages" name="pages" type="number" placeholder="pages" required>
          </br>
          <label for="binding">Binding</label>
          <input id="binding" name="binding" type="string" placeholder="hardback" required>
          </br>
          <label for="publication-year">Publication Year</label>
          <input id="publication-year" name="publication-year" type="number" placeholder="publication-year">
          </br>
          <label for="date-read">Date Read</label>
          <input id="date-read" name="date-read" type="date">
        </fieldset>
        <button>Add Book</button>
    </form>
  </div>
  `;
  }
}

export default Modal;
