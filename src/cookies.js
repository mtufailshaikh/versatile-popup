export default class Cookies {

  static get YearMaxAge() {
      let MaxAge =  365 * 24 * 60 * 60 * 1000; //1 year;
      return MaxAge;
  }

  static write(name, value, options = {}) {
    var str = `${this.encode(name)}=${this.encode(value)}`

    if (value == null) {options.maxage = -1}

    if (options.maxage) {
      let date = new Date();
      date.setTime(date.getTime()+(options.maxage));
      options.expires = date.toUTCString();
      //options.expires = new Date((new Date()).getTime() + options.maxage)
    }

    if (options.path) {str += '; path=' + options.path}
    if (options.domain) {str += '; domain=' + options.domain}
    if (options.expires) {str += '; expires=' + options.expires;}
    if (options.secure) {str += '; secure'}

    document.cookie = str
  }

  create(name, value, options = {}) {
    var str = `${Cookies.encode(name)}=${Cookies.encode(value)}`

    if (value == null) {options.maxage = -1}

    if (options.maxage) {
      let date = new Date();
      date.setTime(date.getTime()+(options.maxage));
      options.expires = date.toUTCString();
      //options.expires = new Date((new Date()).getTime() + options.maxage)
    }

    if (options.path) {str += '; path=' + options.path}
    if (options.domain) {str += '; domain=' + options.domain}
    if (options.expires) {str += '; expires=' + options.expires;}
    if (options.secure) {str += '; secure'}

    document.cookie = str
  }

  static read(name) {
    var cookies = this.parse(document.cookie);
    if(name) {
      return cookies[name] || null;
    } else {
      return cookies;
    }
  }

  get(name) {
    var cookies = Cookies.parse(document.cookie);
    if(name) {
      return cookies[name] || null;
    } else {
      return cookies;
    }
  }

  static delete(name) {
    if(name) {
      this.write(name, null);
    } else {
      let cookies = this.read();
      for(let key in cookies) {
        if(cookies.hasOwnProperty(key)){
          this.write(key, null)
        }
      }

    }
  }

 static parse(str) {
    var obj = {},
      pairs = str.split(/ *; */)

    if (!pairs[0]) {return obj}

    for (let pair of pairs) {
      pair = pair.split('=')
      obj[this.decode(pair[0])] = this.decode(pair[1])
    }
    return obj
  }


  static encode(value){
    try {
      return encodeURIComponent(value);
    } catch (e) {
      return null
    }
  }

  static decode(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      return null
    }
  }

}
