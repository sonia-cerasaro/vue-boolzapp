var vue = new Vue(
  {
    el: '#root',
    data: {
      index: 0,
      message: '',
      nameSelectedAvatar: 'Wilma',
      currentAvatar: `./assets/img/avatar_1.jpg`,
      lastMessageDate: '16:15',
      contacts: [
      	{
      		name: 'Wilma',
      		avatar: '_1',
      		visible: true,
      		messages: [
      			{
      				date: '10/01/2020 15:30:55',
      				text: 'Hai portato a spasso il cane?',
      				status: 'sent'
      			},
      			{
      				date: '10/01/2020 15:50:00',
      				text: 'Ricordati di dargli da mangiare',
      				status: 'sent'
      			},
      			{
      				date: '10/01/2020 16:15:22',
      				text: 'Tutto fatto!',
      				status: 'received'
      			}
      		],
      	},
      	{
      		name: 'George',
      		avatar: '_2',
      		visible: true,
      		messages: [
      			{
      				date: '10/01/2020 15:50:00',
      				text: 'Ciao come stai?',
      				status: 'sent'
      			},
      			{
      				date: '20/03/2020 16:30:55',
      				text: 'Bene grazie! Stasera ci vediamo?',
      				status: 'received'
      			},
      			{
      				date: '20/03/2020 16:35:00',
      				text: 'Mi piacerebbe ma devo andare a fare la spesa.',
      				status: 'sent'
      			}
      		],
      	},
      	{
      		name: 'Kevin',
      		avatar: '_3',
      		visible: true,
      		messages: [
      			{
      				date: '28/03/2020 10:10:40',
      				text: 'La Marianna va in campagna',
      				status: 'received'
      			},
      			{
      				date: '28/03/2020 10:20:10',
      				text: 'Sicuro di non aver sbagliato chat?',
      				status: 'sent'
      			},
      			{
      				date: '28/03/2020 18:06:22',
      				text: 'Ah scusa!',
      				status: 'received'
      			}
      		],
      	},
      	{
      		name: 'Luke',
      		avatar: '_4',
      		visible: true,
      		messages: [
      			{
      				date: '10/01/2020 15:30:55',
      				text: 'Lo sai che ha aperto una nuova pizzeria?',
      				status: 'sent'
      			},
      			{
      				date: '10/01/2020 15:50:00',
      				text: 'Si, ma preferirei andare al cinema',
      				status: 'received'
      			}
      		],
      	},
      ],
    },
    methods: {
      getMessageTime: function (selectedMessage) {
        var messageTimes = selectedMessage.split(' ');
        var splittedMessageTime = messageTimes[1].split(':');
        return `${splittedMessageTime[0]}:${splittedMessageTime[1]}`
      },
      getCurrentDate: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day= date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
      },
      sendMessage: function () {
        var currentIndex = this.index;
        var text = $('input[name=textboxMessage]').val();
        var contact = this.contacts[currentIndex];
        this.message = '';
        contact.messages.push({
          date: this.getCurrentDate(),
          text: text,
          status: 'sent'
        });
        setTimeout(() => {
          this.contacts[currentIndex].messages.push({
            date: this.getCurrentDate(),
            text: 'ok',
            status: 'received'
          })
        }, 2000);
      },
      onSelectedAvatar: function (selectedIndex) {
        var currentContact = this.contacts[selectedIndex];
        this.index = selectedIndex;
        this.currentAvatar = `./assets/img/avatar${currentContact.avatar}.jpg`;
        this.lastMessageDate = this.getLastReceivedMessageTime(currentContact.messages);
        this.nameSelectedAvatar = currentContact.name;
      },
      getLastReceivedMessageTime: function (messages) {
        var filteredMessages = messages.filter(element => {
        return element.status == 'received'});
        var messageFullDate = filteredMessages[filteredMessages.length -1].date;
        return this.getMessageTime(messageFullDate);
      }
    }
  });
