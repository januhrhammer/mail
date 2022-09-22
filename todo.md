# Mail

## Send Mail:

- POST Request: sende recipients, subject und body
- Nach dem Senden: Lade "sent" Box
### DONE

## Mailbox:

- GET Reqest: empfange alle emails (/emails)
- query: neueste mails
- Jede Mail: Eigene Box, Absender, Subject, Timestamp
- Ungelesen: Weiß, Gelesen: Grau

## View Email:

- GET Request (/emails/email_id): Empfange Mail
- Details: Absender, Adressat, subject, timestamp, content
- Edit Inbox.html: Add email-view

## Archive and Unarchive:

- Inbox: Archive Button
- PUT Request (/emails/email_id) to mark archived/unarchived
- Reload Inbox

## Reply:

- In email-view: Add Reply Button
- Reply: email-composition form
- Recipient pre-fill: Absender
- Subject line pre-fill: Re: (orginal subject line)
- Body pre-fill: "On (Timestamp) (Absender) wrote:" followed by original email content


## Hints:

- Create HTML Element + EventHandler:

```
const element = document.createElement('div');
element.innerHTML = 'This is the content of the div.';
element.addEventListener('click', function() {
    console.log('This element has been clicked!')
});
document.querySelector('#container').append(element);
```

- This code creates a new div element, sets its innerHTML, adds an event handler to run a particular function when that div is clicked on, and then adds it to an HTML element whose id is container (this code assumes that there is a HTML element whose id is container: you’ll likely want to change the argument to querySelector to be whichever element you’d like to add an element to).

- edit mail/static/mail/styles.css
- Loop over each array element using forEach



