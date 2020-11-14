import htmlClass from './htmlClass';

export default function addMainClasses(userStore) {
  if (userStore.isUserLogged) {
    htmlClass.add(document.body, 'is-logged-in');
    htmlClass.remove(document.body, 'is-logged-out');
  } else {
    htmlClass.add(document.body, 'is-logged-out');
    htmlClass.remove(document.body, 'is-logged-in');
  }

  const {userAgent} = window.navigator;
  if (userAgent.match(/iPhone/i) || userAgent.match(/iPad/i)) {
    htmlClass.add(document.body, 'is-ios');
  } else {
    htmlClass.remove(document.body, 'is-ios');
  }

  return null;
}
