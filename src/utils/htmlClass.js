export default {
  has(elem, classNames) {
    const classNamesArray = normalizeClassNamesArgument(classNames, elem.className);
    if (!classNamesArray.length) {
      return false;
    }
    for (let i = 0, l = classNamesArray.length; i < l; i++) {
      const className = classNamesArray[i];
      if (!has(className)) {
        return false;
      }
    }
    return true;

    function has(className) {
      if (className) {
        return createClassNameRegexp(className).test(elem.className);
      }
      return false;
    }
  },
  add(elem, classNames) {
    const classNamesArray = normalizeClassNamesArgument(classNames, elem.className);
    if (!classNamesArray.length) {
      return;
    }
    for (let i = 0, l = classNamesArray.length; i < l; i++) {
      const className = classNamesArray[i];
      if (!this.has(elem, className)) {
        elem.className += elem.className ? ` ${className}` : className;
      }
    }
  },
  remove(elem, classNames) {
    const classNamesArray = normalizeClassNamesArgument(classNames, elem.className);
    if (!classNamesArray.length) {
      return;
    }
    for (let i = 0, l = classNamesArray.length; i < l; i++) {
      const className = classNamesArray[i];
      if (this.has(elem, className)) {
        elem.className = elem.className.replace(createClassNameRegexp(className), '$1').trim();
      }
    }
  },
};

// Returns array of class names
function normalizeClassNamesArgument(classNames, originClassNames) {
  if (classNames instanceof RegExp) {
    const classNameRegexp = classNames;
    // eslint-disable-next-line no-param-reassign
    classNames = [];
    const originClassNamesArray = originClassNames == null ? [] : `${originClassNames}`.split(/\s+/);
    if (!originClassNamesArray.length) {
      return [];
    }
    for (let i = 0, l = originClassNamesArray.length; i < l; i++) {
      const classNameOrigin = originClassNamesArray[i];
      if (classNameOrigin && classNameRegexp.test(classNameOrigin)) {
        classNames.push(classNameOrigin);
      }
    }
    return classNames;
  }
  return classNames == null ? [] : `${classNames}`.split(/\s+/);
}

function createClassNameRegexp(className) {
  return new RegExp(`(\\s|^)${className}(\\s|$)`);
}
