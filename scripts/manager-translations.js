/* eslint-disable */
const fs = require('fs-extra');
const ora = require('ora');
const chalk = require('chalk');
const shell = require('shelljs');

run().catch(catchError);

async function run() {
  await logAsync(`Extracting APP messages`, extractAppMessages());
  await logAsync(`Extracting COMMON COMPONENTS messages`, extractCommonComponentsMessages());
  await logAsync(`Merging messages`, mergeMessages());
  await logAsync(`Clean messages`, cleanMessages());

  // STEPS

  function logAsync(message, promise) {
    ora.promise(promise, message);
    return promise;
  }

  async function extractAppMessages() {
    await shell.exec(
      `NODE_ENV=development extract-messages -l=en,ru -o src/translations/languages -d en --flat 'src/**/*.messages.js'`,
    );
  }

  async function extractCommonComponentsMessages() {
    await shell.exec(
      `NODE_ENV=development extract-messages -l=en,ru -o src/translations/components -d en --flat './../../components/src/**/*.js'`,
    );
  }

  async function mergeMessages() {
    const languages = require('../src/translations/languages/Languages');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < languages.length; i++) {
      const currentLanguage = languages[i];

      try {
        const json = require('../src/translations/languages/' + currentLanguage + '.json'); // eslint-disable-line
        const baseJson = require('../src/translations/components/' + currentLanguage + '.json'); // eslint-disable-line
        const newJson = {
          ...baseJson,
          ...json,
        };

        require('fs').writeFileSync(
          `./src/translations/languages/${currentLanguage}.json`,
          JSON.stringify(newJson, null, 2),
        );
      } catch (e) {
        throw new Error(`File with translations for language '${currentLanguage}' not found.`);
      }
    }
  }

  async function cleanMessages() {
    await fs.remove('./src/translations/components').catch(err => {
      throw new Error(err);
    });
  }
}

//
// UTILS
//

function catchError(error = new Error()) {
  console.error(chalk.red(`${chalk.bold('ERROR')}\n${error.message || error}`));
  process.exit(1);
}
