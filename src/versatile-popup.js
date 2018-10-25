'use strict';
import localQuery from 'domtastic';
import Cookies from './cookies';

export default class TTversatilePopup {

  constructor(options = {}) {
    this.header = options.header || false;
    this.body = options.body || '';
    this.footer = options.footer || false;
    this.showOnLoad = !!options.showOnLoad; //default to show the popup not arrow
    this.startDate = options.startDate || null; // starting date to show the widget
    this.endDate = options.endDate || null; // end date of the widget to hide after passing this date
    this.globalName =  options.globalName || false; // popup unique name to target all popup individually if more than one popup
    this.customVisible = !!options.customVisible; // show hide popup on other pages based on current status
    this.inForm = options.inForm || '';
    this.$widget = "";
  //  this.init();
  }

  get header() {
    return this._header;
  }
  set header(value) {
    this._header = value;
  }
  get body() {
    return this._body;
  }
  set body(value) {
    this._body = value;
  }
  get footer() {
    return this._footer;
  }
  set footer(value) {
    this._footer = value;
  }

  get htmlString() {
    let showClass = '';
    let showArrow = '';
    let bgImage = "";
    if (this.showOnLoad) {
      if (Cookies.read('tt-' + this.globalName)) {
        if (Cookies.read('tt-' + this.globalName) == 'show') {
          showClass = ' ttw-versatile__card--show';
          showArrow = '';
        } else {
          showClass = '';
          showArrow = ' ttw-versatile__open--show';
        }
      } else {
        if (this.customVisible) {
          Cookies.write('tt-' + this.globalName, 'show', {'path':'/'});
          showClass = ' ttw-versatile__card--show';
        } else {
          showClass = ' ttw-versatile__card--show';
        }
      }
    } else {
      if (Cookies.read('tt-' + this.globalName) == 'show') {
        showArrow = '';
        showClass = ' ttw-versatile__card--show';
      }else{
        showArrow = ' ttw-versatile__open--show';
        showClass = '';
      }
    }
    if (this.backgroundImage) {
      bgImage = ` style="background-image:url('${this.backgroundImage}')"`;
    }
    return `<div class="ttw-versatile ${this.globalName}">
            ${this.inForm}
              <div class="ttw-versatile__card${showClass}">
            		<span class="ttw-versatile__close">&times;</span>
            		${this.header ? `<div class="ttw-versatile__title">
            			${this.header}
            		</div>` : ``}
              	<div class="ttw-versatile__body"${bgImage}>
              	  ${this.body}
              	</div>
                ${this.footer ? `<div class="ttw-versatile__footer">
                  ${this.footer}
                </div> ` : ``}
              </div>
              ${this.inForm ? '</form>': ''} 
            	<span class="ttw-versatile__open${showArrow}"><i>&rarr;</i></span>
            </div>`;
  }

  createElementFromString(htmlString) {
    let elem = document.createElement('div');
    elem.innerHTML = htmlString.trim();
    return elem.firstChild;
  }

  init() {
    this._widget = this.createElementFromString(this.htmlString);
    this.$widget = localQuery(this._widget);
    if (typeof this.globalName == 'string') {
      if (this.startDate != null && this.endDate != null) {
        if (this.checkexpireDate(this.startDate, this.endDate)) {
          localQuery('body').append(this.$widget);
        }
      } else {
        localQuery('body').append(this.$widget);
      }
    } else {
      console.error('Please set the "globalName" for TT Versatile Popup.');
    }
    localQuery(localQuery(this.$widget).find('.ttw-versatile__close')).on('click', () => {
      this.hide();
    });
    localQuery(localQuery(this.$widget).find('.ttw-versatile__open')).on('click', () => {
      this.show();
    });
  }

  checkexpireDate(startDate = null, endDate = null) {
    if (startDate != null && endDate != null) {
      let start_date = new Date(startDate);
      let end_date = new Date(endDate);
      let today = new Date();
      if (today >= start_date && today <= end_date) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  show() {
    let conversionCard = this.$widget.find('.ttw-versatile__card');
    let openBtn        = this.$widget.find('.ttw-versatile__open');

    conversionCard.toggleClass('ttw-versatile__card--show');
    openBtn.toggleClass('ttw-versatile__open--show');
    if (this.customVisible) {
      Cookies.write('tt-' + this.globalName, 'show', {'path':'/'});
    }
  }

  hide() {
    let conversionCard = this.$widget.find('.ttw-versatile__card');
    let openBtn        = this.$widget.find('.ttw-versatile__open');

    conversionCard.toggleClass('ttw-versatile__card--show');
    openBtn.toggleClass('ttw-versatile__open--show');
    if (this.customVisible) {
      Cookies.write('tt-' + this.globalName, 'hide', {'path':'/'});
    }
  }

}
