document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views
  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox"));
  document
    .querySelector("#sent")
    .addEventListener("click", () => load_mailbox("sent"));
  document
    .querySelector("#archived")
    .addEventListener("click", () => load_mailbox("archive"));
  document.querySelector("#compose").addEventListener("click", compose_email);
  document
    .querySelector("#compose-form")
    .addEventListener("submit", send_email);

  // By default, load the inbox
  load_mailbox("inbox");
});

function compose_email() {
  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("email-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";

  // Clear out composition fields
  document.querySelector("#compose-recipients").value = "";
  document.querySelector("#compose-subject").value = "";
  document.querySelector("#compose-body").value = "";
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector("#email-view").style.display = "none";
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";

  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML = `<h3>${
    mailbox.charAt(0).toUpperCase() + mailbox.slice(1)
  }</h3>`;

  fetch(`/emails/${mailbox}`)
    .then((response) => response.json())
    .then((emails) => {
      emails.forEach((email) => {
        let mailDiv = document.createElement("div");
        mailDiv.className = email["read"]
          ? "read-mail-display"
          : "unread-mail-display";
        mailDiv.innerHTML = `
      <div class="sender">From: <strong>${email["sender"]}</strong></div>
      <div class="subject">Subject: <strong>${email["subject"]}</strong></div>
      <div class="timestamp">Received: ${email["timestamp"]}</div>`;
        document.querySelector("#emails-view").append(mailDiv);
        mailDiv.addEventListener("click", () => {
          load_email(email["id"]);
        });
      });
    });
}

// Send mails and redirect to the Sent-Mails Page
function send_email() {
  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: document.querySelector("#compose-recipients").value,
      subject: document.querySelector("#compose-subject").value,
      body: document.querySelector("#compose-body").value,
    }),
  }).then((response) => load_mailbox("sent"));
}

// Load Email

function load_email(id) {
  fetch(`/emails/${id}`)
    .then((response) => response.json())
    .then((email) => {
      document.querySelector("#emails-view").style.display = "none";
      document.querySelector("#compose-view").style.display = "none";
      document.querySelector("#email-view").style.display = "block";

      const viewMail = document.querySelector("#email-view");
      viewMail.innerHTML = `
    <div class="mail-details>
        <div class="sender"><b>From:</b> <span>${email["sender"]}</span></li>
        <div class="recipient"><b>To: </b><span>${email["recipients"]}</span></li>
        <div class="subject"><b>Subject:</b> <span>${email["subject"]}</span</li>
        <div class="timestamp"><b>Time:</b> <span>${email["timestamp"]}</span></li>
      </div>
      <p>${email["body"]}</p>
    `;
    });
}
