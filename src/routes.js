const conf = require('./conf/settings');
const i18nService = require('./services/i18n');
const appConfig = conf.get('appConfig');
const vendorJsFiles = conf.get('vendorJs');
const appJsFiles = conf.get('appJs');
const environment = conf.get('NODE_ENV');

module.exports = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: homePageHandler
  },
  { method: 'GET', path: '/app/{path*}',
    handler: {
      directory: { path: `${__dirname}/app/` },
    },
  },
  { method: 'GET', path: '/modules/{module}/views/{view*}', handler: angularViewsHandler },
  { method: 'GET', path: '/modules/{module*2}/views/{view*}', handler: angularViewsHandler },
  { method: 'GET', path: '/modules/{module}/templates/{view*}', handler: angularViewsHandler },
  { method: 'GET', path: '/layouts/{layout}.html', handler: angularLayoutsHandler }
];

function homePageHandler(request, reply) {
  const lang = request.lang || 'en';
  const attribs = {
    environment,
    appConfig,
    vendorJsFiles,
    appJsFiles,
    apiUrl: conf.get('API_PATH'),
    brandName: conf.get('brandName'),
    googleMapAPIKey: conf.get('googleMapAPIKey'),
    lang: lang
  };

  i18nService.getTranslations('frontend').then((translations) => {
    attribs.translations = JSON.stringify(translations[lang]);
    reply.view('templates/home', attribs);
  }, () => {
    reply.view('templates/home', attribs);
  });
}


function angularViewsHandler(request, reply) {
  reply.view(`public/scripts${request.path.replace('.html', '')}`, { appConfig });
}

function angularLayoutsHandler(request, reply) {
  reply.view(`public${request.path.replace('.html', '')}`);
}