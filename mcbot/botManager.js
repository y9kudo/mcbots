// botManager.js

const mineflayer = require('mineflayer');

class BotManager {
    constructor() {
        this.bots = {};
    }

    addBot(botName, options) {
        if (this.bots[botName]) {
            console.log(`Bot ${botName} already exists.`);
            return;
        }

        const bot = mineflayer.createBot(options);

        bot.on('login', () => {
            console.log(`Bot ${botName} logged in.`);
        });

        bot.on('end', () => {
            console.log(`Bot ${botName} disconnected.`);
            delete this.bots[botName];
        });

        bot.on('error', (err) => {
            console.error(`Error with bot ${botName}:`, err);
        });

        this.bots[botName] = bot;
    }

    removeBot(botName) {
        const bot = this.bots[botName];
        if (bot) {
            bot.quit();
            delete this.bots[botName];
            console.log(`Bot ${botName} removed.`);
        } else {
            console.log(`Bot ${botName} not found.`);
        }
    }

    listBots() {
        return Object.keys(this.bots);
    }
}

// Пример использования BotManager
const botManager = new BotManager();

// Настройки для подключения бота
const botOptions = {
    host: 'localhost', // IP адрес или хост сервера Minecraft port: 25565,       // Порт сервера Minecraft
    username: 'Bot1',  // Имя пользователя бота // password: 'password', // Пароль, если используется учетная запись Mojang
};

// Добавление и запуск бота
botManager.addBot('Bot1', botOptions);

// Список активных ботов
console.log('Active bots:', botManager.listBots());

// Остановка и удаление бота через некоторое время
setTimeout(() => {
    botManager.removeBot('Bot1');
    console.log('Active bots after removal:', botManager.listBots());
}, 60000); // 60 секунд

module.exports = BotManager;