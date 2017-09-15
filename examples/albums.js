global.fetch = require('node-fetch');

import SpotifyWrapper from "../src/index";

const spotify = new SpotifyWrapper({
  token: 'BQCcq4EHwBapP5w0x9yeN_7_oQtqMYAf3l5SPUjtPpnVIRfXjprHmD_Y20DAOELqw2sp_a4zqiXBeh7nn0X8j3bCtQcmEtEsrQStW79IzePdhDAqShz0T9yK1L6XjhrModinFbI8'
});
const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
