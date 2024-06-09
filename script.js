let users = {};
let currentUser = '';
const colors = ['#ffcccc', '#ccffcc', '#ccccff', '#ffffcc', '#ccffff', '#ffccff'];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getCurrentTime() {
    const time = new Date();
    return time.toLocaleTimeString();
}

function login() {
    const usernameInput = document.getElementById('username');
    currentUser = usernameInput.value;
    if (currentUser) {
        if (!users[currentUser]) {
            users[currentUser] = getRandomColor();
            sendSystemMessage(`${currentUser} приєднався до чату о ${getCurrentTime()}.`);
        }
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        document.getElementById('current-user').textContent = `Ви увійшли як: ${currentUser}`;
        usernameInput.value = '';
    }
}

function loginAsGuest() {
    currentUser = 'Гість-' + Math.floor(Math.random() * 1000);
    users[currentUser] = getRandomColor();
    sendSystemMessage(`${currentUser} приєднався до чату о ${getCurrentTime()}.`);
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('current-user').textContent = `Ви увійшли як: ${currentUser}`;
}

function logout() {
    sendSystemMessage(`${currentUser} покинув чат о ${getCurrentTime()}.`);
    currentUser = '';
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('chat-container').style.display = 'none';
}

function sendMessage() {
    const messageText = document.getElementById('message').value;
    if (messageText) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');
        messageContainer.style.backgroundColor = users[currentUser];

        if (currentUser) {
            messageContainer.classList.add('current-user');
        } else {
            messageContainer.classList.add('other-user');
        }

        const usernameSpan = document.createElement('span');
        usernameSpan.classList.add('username');
        usernameSpan.textContent = currentUser;

        const textSpan = document.createElement('span');
        textSpan.classList.add('text');
        textSpan.textContent = messageText;

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('time');
        const time = new Date();
        timeSpan.textContent = time.toLocaleTimeString();

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '×';
        deleteBtn.onclick = () => messageContainer.remove();

        messageContainer.appendChild(usernameSpan);
        messageContainer.appendChild(textSpan);
        messageContainer.appendChild(timeSpan);
        messageContainer.appendChild(deleteBtn);

        document.getElementById('chat-window').appendChild(messageContainer);
        document.getElementById('message').value = '';
        document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
    }
}

function clearChat() {
    document.getElementById('chat-window').innerHTML = '';
}

function sendSystemMessage(text) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    messageContainer.classList.add('system-message');

    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.textContent = text;

    messageContainer.appendChild(textSpan);

    document.getElementById('chat-window').appendChild(messageContainer);
    document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
}
