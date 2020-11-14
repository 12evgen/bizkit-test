function getObject(key) {
  return JSON.parse(this.getItem(key) || '{}');
}

function setObject(key, value) {
  if (value && value instanceof Object) {
    try {
      this.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* do nothing */
    }
  }
}

if (typeof Storage !== 'undefined') {
  Storage.prototype.getObject = getObject;
  Storage.prototype.setObject = setObject;
}

function Store(storage) {
  this.storage = storage;
  this.storage.getObject = getObject;
  this.storage.setObject = setObject;
}

Store.prototype = {
  get(key) {
    return this.storage.getItem(key) || undefined;
  },
  set(key, value) {
    if (typeof value !== 'undefined') {
      this.storage.setItem(key, value);
    }
  },
  getObject(key) {
    return typeof this.storage.getObject === 'function' // Prevent runtime error in IE
      ? this.storage.getObject(key)
      : JSON.parse(this.storage.getItem(key) || '{}');
  },
  setObject(key, value) {
    if (typeof this.storage.setObject === 'function') {
      // Prevent runtime error in IE
      this.storage.setObject(key, value);
    } else {
      this.storage.setItem(key, JSON.stringify(value));
    }
  },
  remove(key) {
    this.storage.removeItem(key);
  },
  clear() {
    this.storage.clear();
  },
};

const LocalStore = new Store(window.localStorage);

module.exports = {
  LocalStore,
};
