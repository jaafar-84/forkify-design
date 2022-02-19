import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  currentPage;
  _parentElement = document.querySelector('.pagination');
  _generateNextBtn() {
    return `    <button data-goto = "${
      this.currentPage + 1
    }" class="btn--inline pagination__btn--next">
  <span>Page ${this.currentPage + 1}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</button>
`;
  }
  _generatePrevBtn() {
    return `
  <button data-goto = "${
    this.currentPage - 1
  }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this.currentPage - 1}</span>
  </button>
  `;
  }
  _generateMarkup() {
    this.currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    //page 1, and there are other pages
    if (this.currentPage === 1 && numPages > 1) {
      return this._generateNextBtn();
    }

    //Last Page
    if (this.currentPage === numPages && numPages > 1)
      return this._generatePrevBtn();
    //Other Page
    if (this.currentPage < numPages) {
      return this._generatePrevBtn() + '' + this._generateNextBtn();
    }
    //page 1, andthere are NO other pages
    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }
}

export default new PaginationView();
