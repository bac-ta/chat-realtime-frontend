import {Strophe, $build, $iq, $msg, $pres} from 'strophe.js';
import {environment} from '../../../environments/environment';
import * as $ from 'jquery';
import {Subject} from 'rxjs';
import {MessageChat} from './chat-gui/chat-content/chat-content.component';
import {User} from '../pre-auth/model/user';
import {Howl, Howler} from 'howler';
import {ajax} from 'rxjs/ajax';
import {buffer, concatMap, map} from 'rxjs/operators';

export const receiver = new Subject<MessageChat>();
export const roster = new Subject<User>();
const sessionCheck = (user) => {
  return ajax({
    // url: environment.apiOP + 'sessions/' + user.username,
    method: 'GET',
    headers: {
      // Authorization: environment.tokenOP
    }
  });
};
export const status = new Subject<User>();

const sound = new Howl({
  src: ['/assets/sound/notify.mp3']
});

function log(msg: string): void {
  console.log(msg);
}

function rawInput(data: string): void {
  log('RECV: ' + data);
}

function rawOutput(data: string): void {
  log('SENT: ' + data);
}

function onOwnMessage(msg: Element): boolean {
  const elems = msg.getElementsByTagName('own-message');
  if (elems.length > 0) {
    const own = elems[0];
    const to = msg.getAttribute('to');
    const from = msg.getAttribute('from');
    const iq = $iq({
      to: from,
      type: 'error',
      id: msg.getAttribute('id')
    }).cnode(own).up().c('error', {type: 'cancel', code: '501'})
      .c('feature-not-implemented', {xmlns: 'urn:ietf:params:xml:ns:xmpp-stanzas'});

    connection.sendIQ(iq);
  }

  return true;
}

function onMessage(msg: Element): boolean {
  const to = msg.getAttribute('to');
  const from = msg.getAttribute('from');
  const type = msg.getAttribute('type');
  const elems = msg.getElementsByTagName('body');

  if (type === 'chat' && elems.length > 0) {
    sound.play();
    const body = elems[0];

    const text = Strophe.getText(body);
    const message = new MessageChat();
    message.isMe = false;
    message.username = from.substring(0, from.indexOf('@'));
    message.detail = text;
    message.timeChat = new Date();
    receiver.next(message);
  }

  // we must return true to keep the handler alive.
  // returning false would remove it after it finishes.
  return true;
}


export function sendMessage(message, to): void {
  if (message && to) {
    const reply = $msg({
      to,
      type: 'chat'
    }).c('body').t(message);

    connection.send(reply);
  }
}

const connection = new Strophe.Connection(environment.BOSH_SERVICE, {keepalive: true});
connection.rawInput = rawInput;
connection.rawOutput = rawOutput;

function onConnect(s: Strophe.Status): void {
  if (s === Strophe.Status.CONNECTING) {
    log('Strophe is connecting.');
  } else if (s === Strophe.Status.CONNFAIL) {
    log('Strophe failed to connect.');
  } else if (s === Strophe.Status.DISCONNECTING) {
    log('Strophe is disconnecting.');
  } else if (s === Strophe.Status.DISCONNECTED) {
  } else if (s === Strophe.Status.CONNECTED) {
    log('Strophe is connected.');
    getRoster();
    connection.addHandler(onMessage, null, 'message', null, null, null);
    connection.addHandler(onOwnMessage, null, 'iq', 'set', null, null);
    connection.addHandler(onSubscriptionRequest, null, 'presence', 'subscribe', null, null);
    connection.addHandler(onPresence, null, 'presence', null, null, null);
    connection.send($pres().tree());
  }
}

function subscribePresence(jid): void {
  log('subscribePresence: ' + jid);
  connection.send($pres({
    to: jid,
    type: 'subscribe'
  }));
}

function getPresence(jid): void {
  log('getPresence: ' + jid);
  const check = $pres({
    type: 'available',
    to: jid
  });
  connection.send(check);
}

function getRoster(): void {
  log('getRoster');
  const iq = $iq({
    type: 'get'
  }).c('query', {
    xmlns: 'jabber:iq:roster'
  });
  connection.sendIQ(iq, rosterCallback);
}

function rosterCallback(iq): void {
  const buddys = $(iq).find('item').toArray();
  const listCheck: string[] = [];
  buddys.forEach(item => {
    let jid = item.attributes[0].nodeValue; // The jabber_id of your contact
    jid = jid.substring(0, jid.indexOf('@'));
    if (!listCheck.includes(jid)) {
      listCheck.push(jid);
      const user = new User();
      user.username = jid;
      roster.next(user);
    }
  });
}

function onSubscriptionRequest(stanza): boolean {
  if (stanza.getAttribute('type') === 'subscribe') {
    const from = $(stanza).attr('from');
    log('onSubscriptionRequest: from=' + from);
    // Send a 'subscribed' notification back to accept the incoming
    // subscription request
    connection.send($pres({
      to: from,
      type: 'subscribed'
    }));
  }
  return true;
}

function onPresence(presence): boolean {
  log('onPresence:');
  let presenceType = $(presence).attr('type'); // unavailable, subscribed, etc...
  const from = $(presence).attr('from'); // the jabber_id of the contact
  if (!presenceType) {
    presenceType = 'Online';
  }
  const user = new User();
  if (presenceType !== 'error') {
    user.username = from.substring(0, from.indexOf('@'));
    if (presenceType === 'unavailable') {
      presenceType = 'Offline';
    } else {
      const show = $(presence).find('show').text(); // this is what gives away, dnd, etc.
      if (show === 'chat' || show === '') {
        presenceType = 'Online';
      } else {
        // presenceType = 'Offline';
      }
    }
    user.status = presenceType;
  }
  status.next(user);
  return true;
}

export function getConnection(jid, password): Strophe.Connection {
  connection.disconnect('open again');
  connection.reset();
  connection.connect(jid, password, onConnect);
  return connection;
}
