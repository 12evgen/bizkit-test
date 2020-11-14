import React from 'react';
import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import ru from './translations/languages/ru.json';
import en from './translations/languages/en.json';

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/en');
  require('@formatjs/intl-pluralrules/dist/locale-data/ru');
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/ru');
}

const messages = {
  en,
  ru,
};

const Localizer = observer(({children, locale}) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
));

Localizer.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Localizer;
