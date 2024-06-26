const { createApp } = Vue;
// Luxon Library
const dt = luxon.DateTime;
createApp({
    data() {
        return {
            contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                  },
                  {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                  },
                  {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                  }
                ],
              },
              {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                  },
                  {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                  },
                  {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                  }
                ],
              },
              {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                  },
                  {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                  }
                ],
              },
            ],

            // Variables
            activeContact: 0,
            newMessage: '',
            searchContact: ''
        };
    },
    methods: {
      // FUNCTIONS

      // Filtering Contacts Function
      filterContacts: function(array, string) {
        array.forEach(contact => {
          if (!contact.name.toLowerCase().includes(string.toLowerCase())) {
            contact.visible = false;
          }  else if (string == '' || contact.name.toLowerCase().includes(string.toLowerCase())) {
            contact.visible = true;
          };
        });
      },

      // Activates choosen contact conversation
      activateContact: function(index) {
        this.activeContact = index;
      },

      // Creates an 'ok' message by CPU that replies to every message you write in the bottom input
      receiveMessage: function() {
        const now = dt.now().setLocale('fr').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS)
        const triggeredMessage = {
          date: now,
          message: 'ok',
          status: 'received'
        };
        this.contacts[this.activeContact].messages.push(triggeredMessage);
      },

      // Triggers whenever you press 'enter' when focused on the message input, creates a message with your text
      addNewMessage: function() {
        const now = dt.now().setLocale('fr').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS)
        if (this.newMessage.trim() != '') {
          const myMessage = {
            date: now,
            message: this.newMessage,
            status: 'sent'
          };
          this.contacts[this.activeContact].messages.push(myMessage);
          this.newMessage = '';
          setTimeout(this.receiveMessage, 1000);
        }
      },

      // Deletes a message
      deleteMessage(index) {
        this.contacts[this.activeContact].messages.splice(index, 1);
      }
    }
}).mount('#app');
