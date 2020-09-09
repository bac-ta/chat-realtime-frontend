import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatWindow} from './chat-gui/chat-gui.component';
import {Strophe, $build, $iq, $msg, $pres} from 'strophe.js';
import {environment} from '../../../environments/environment';
import './strophe';

const connection: Strophe.Connection = new Strophe.Connection(environment.BOSH_SERVICE);
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatWindows: BehaviorSubject<ChatWindow>;

  constructor() {
    this.chatWindows = new BehaviorSubject<ChatWindow>({username: 'Admin', content: 'default content'});
  }

  addNewChatWindow(chatWindow): void {
    this.chatWindows.next(chatWindow);
  }

  openConnection(jid, password): void {
    connection.rawInput = this.rawInput;
    connection.rawOutput = this.rawOutput;
    connection.connect(jid, password, this.onConnect);
  }

  private rawInput(data): void {
    console.log(data);
  }

  private rawOutput(data): void {
    console.log(data);
  }

  onConnect(status): void {
    if (status === Strophe.Status.CONNECTING) {
      console.log('Strophe is connecting.');
    } else if (status === Strophe.Status.CONNFAIL) {
      console.log('Strophe failed to connect.');
    } else if (status === Strophe.Status.DISCONNECTING) {
      console.log('Strophe is disconnecting.');
    } else if (status === Strophe.Status.DISCONNECTED) {
      console.log('Strophe is disconnected.');
    } else if (status === Strophe.Status.CONNECTED) {
      console.log('Strophe is connected.');
      console.log(connection);

      connection.addHandler(this.onMessage, null, 'message', null, null, null);
      connection.addHandler(this.onOwnMessage, null, 'iq', 'set', null, null);
      connection.send($pres().tree());
    }
  }
  onMessage(msg): boolean {
    const to = msg.getAttribute('to');
    const from = msg.getAttribute('from');
    const type = msg.getAttribute('type');
    const elems = msg.getElementsByTagName('body');

    if (type === 'chat' && elems.length > 0) {
      const body = elems[0];
      console.log('CHAT: I got a message from ' + from + ': ' + Strophe.getText(body));
    }
    return true;
  }

  onOwnMessage(msg: Element): boolean {
  console.log(msg);
  const elems = msg.getElementsByTagName('own-message');
  if (elems.length > 0) {
    const own = elems[0];
    const to = msg.getAttribute('to');
    const from = msg.getAttribute('from');
    const iq = $iq({
      to: from,
      type: 'error',
      id: msg.getAttribute('id')
    }).cnode(own).up().c('error', { type: 'cancel', code: '501' })
      .c('feature-not-implemented', { xmlns: 'urn:ietf:params:xml:ns:xmpp-stanzas' });

    connection.sendIQ(iq);
  }

  return true;
}

  subscribePresence(jid): void {
    console.log('subscribePresence: ' + jid);
    connection.send($pres({
      to: jid,
      type: 'subscribe'
    }));
  }

  sendMessage(msg, from, to): void {
    console.log('CHAT: Send a message to ' + to + ': ' + msg);

    const m = $msg({
      to,
      from,
      type: 'chat'
    }).c('body').t(msg);
    connection.send(m);
  }

  onSubscriptionRequest(stanza): boolean {
    if (stanza.getAttribute('type') === 'subscribe') {
      const from = stanza.getAttribute('from');
      console.log('onSubscriptionRequest: from=' + from);
      connection.send($pres({
        to: from,
        type: 'subscribed'
      }));
    }
    return true;
  }

  onPresence(presence): boolean {
    console.log('onPresence:');
    let presenceType = presence.getAttribute('type'); // unavailable, subscribed, etc...
    const from = presence.getAttribute('from'); // the jabber_id of the contact
    if (!presenceType) { presenceType = 'online'; }
    console.log('	>' + from + ' --> ' + presenceType);
    if (presenceType !== 'error') {
      if (presenceType === 'unavailable') {
        // Mark contact as offline
      } else {
        const show = presence.find('show').text(); // this is what gives away, dnd, etc.
        if (show === 'chat' || show === '') {
          // Mark contact as online
        } else {
          // etc...
        }
      }
    }
    return true;
  }
}
