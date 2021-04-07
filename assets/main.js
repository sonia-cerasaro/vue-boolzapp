var vue = new Vue(
  {
    el: '#root',
    data: {
      index: 0,
      message: '',
      selectedAvatarName: 'Wilma',
      currentAvatar: `./assets/img/avatar_1.jpg`,
      lastMessage: '',
      lastMessageReceivedTime: '',
      searchText: '',
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
      onSelectedAvatar: function (selectedIndex) {
        this.setCurrentIndex(selectedIndex);
        this.setCurrentAvatar();
        this.setLastMessageReceivedDate();
        this.setCurrentName();
      },
      sendMessage: function () {
        var userPushedText = $('input[name=textboxMessage]').val();
        var currentDate = this.getCurrentDate();
        this.setUserInputTextBox('');
        this.insertUserMessage(currentDate, userPushedText, 'sent');
        this.getFakeResponse();
      },
      removeSelectedMessage: function (selectedIndexMessage) {
        this.contacts[this.index].messages.splice(selectedIndexMessage, 1);
        this.setMessages(this.contacts[this.index].messages);
      },
      insertUserMessage: function (dateReceived, textReceived, statusReceived) {
       var currentContact = this.contacts[this.index];
       currentContact.messages.push({
         date: dateReceived,
         text: textReceived,
         status: statusReceived
       });
      },
      checkForReceivedMessage: function (messages) {
       var isReceivedMessageContained = false;
        messages.forEach(message => {
        isReceivedMessageContained = message.status == 'received' ? true : false;
        });
        return isReceivedMessageContained;
      },
      getMessageDate: function (selectedMessage) {
        var splittedFullDateTwoParts = selectedMessage.split(' ');
        var splittedHoursThreeParts = splittedFullDateTwoParts[1].split(':');
        return `${splittedHoursThreeParts[0]}:${splittedHoursThreeParts[1]}`
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
      getLastMessageReceivedDate: function (selectedIndex) {
        var found = false;
        var selectedUserMessages = this.getSelectedUserMessages(selectedIndex);
        var filteredMessages = this.getStatusReceivedMessages(selectedUserMessages);
        found = this.checkForReceivedMessage(filteredMessages);

        if (!found) {
          this.setLastMessageDate('--:--');
          return '--:--';
        }
        var messageFullDate = this.getLastFullDateFromMessages(filteredMessages);
        return this.getMessageDate(messageFullDate);
      },
      getLastReceivedMessage: function (selectedIndex) {
        var found = false;
        var selectedUserMessages = this.getSelectedUserMessages(selectedIndex);
        var filteredMessages = this.getStatusReceivedMessages(selectedUserMessages);
        found = this.checkForReceivedMessage(filteredMessages);

        if (!found) {
          this.setLastMessage('');
          return '';
        }
        return this.getLastTextFromMessages(filteredMessages);
      },
      getFilteredContacts: function () {
        var userSearchText = $('input[name=searchBox]').val();
        var filteredContacts = this.contacts.filter(element => {
        return element.name.toLowerCase().includes(userSearchText.toLowerCase());
       });
       return filteredContacts;
      },
      getSelectedUserMessages: function (selectedIndex) {
       return this.contacts[selectedIndex].messages;
      },
      getStatusReceivedMessages: function (selectedUserMessages) {
        return selectedUserMessages.filter(message => {
        return message.status == 'received'});
      },
      getFakeResponse: function () {
        setTimeout(() => {
          this.contacts[this.index].messages.push({
            date: this.getCurrentDate(),
            text: 'ok',
            status: 'received'
          })
        }, 2000);
      },
      getLastFullDateFromMessages: function (messages) {
        return messages[messages.length -1].date;
      },
      getLastTextFromMessages: function (messages) {
        return messages[messages.length -1].text;
      },
      setUserInputTextBox: function (textReceived) {
        this.message = textReceived;
      },
      setCurrentIndex: function (currentIndex) {
        this.index = currentIndex;
      },
      setCurrentAvatar: function () {
        var currentContact = this.contacts[this.index];
        this.currentAvatar = `./assets/img/avatar${currentContact.avatar}.jpg`;
      },
      setLastMessageReceivedDate: function () {
        this.lastMessageDate = this.getLastMessageReceivedDate(this.index);
      },
      setLastMessageDate: function (selectedDate) {
        this.lastMessageDate = selectedDate;
      },
      setLastMessage: function (textMessage) {
        this.lastMessage = textMessage;
      },
      setCurrentName: function () {
        this.selectedAvatarName = this.contacts[this.index].name;
      },
      setMessages: function (currentMessages) {
        this.contacts[this.index].messages = currentMessages;
      },
    }
  });
