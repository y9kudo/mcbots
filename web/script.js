async function checkServerStatus() {
    try {
        const response = await fetch('http://localhost:3000/status');
        const data = await response.json();
        const serverRunning = data.status === 'running';

        if (serverRunning) {
            document.getElementById('status').classList.add('hidden');
            document.getElementById('form').classList.remove('hidden');
            document.body.style.backgroundImage = 'url("https://i.ytimg.com/vi/Dc5QDrErNaw/maxresdefault.jpg")';
        }
    } catch (error) {
        console.error('Error checking server status:', error);
    }
}

function addBot() {
    const username = document.getElementById('username').value;
    if (username) {
        logInfo(`Successfully created bot: ${username}`);
    }
}

function addRandomBots() {
    for (let i = 0; i < 10; i++) {
        logInfo(`Successfully created bot: RandomBot${i}`);
    }
}

function joinServer() {
    const address = document.getElementById('server-address').value;
    if (address) {
        logInfo(`Bot successfully joined server: ${address}`);
    }
}

function raidServer() {
    logInfo('All bots are raiding the server!');
}

function logInfo(message) {
    const logContent = document.getElementById('log-content');
    const date = new Date().toLocaleString();
    logContent.innerHTML += `<p>[${date}] [ℹ️ Info] ${message}</p>`;
}

checkServerStatus();
