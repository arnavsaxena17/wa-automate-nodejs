// const sulla = require('../dist/index');
// var create = require("sulla").create;
// import { create, Whatsapp, decryptMedia} from 'sulla-hotfix';
import { create, Whatsapp, decryptMedia } from '../src/index';
const mime = require('mime-types');
const fs = require('fs');

function start(client: Whatsapp) {
  client.onMessage(async message => {
    console.log('TCL: start -> message', message);
    //@ts-ignore
    if (message.mimetype) {
      const mediaData = await decryptMedia(message);
      // client.sendText(message.from,'some text');
      fs.writeFile(
        //@ts-ignore
        `${message.t}.${mime.extension(message.mimetype)}`,
        mediaData,
        function(err) {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        }
      );
    }
  });
}

create().then(client => start(client));