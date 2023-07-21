// Instalando do discord JS as classes que estão sendo chamadas
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
//Client é a classe que usaremos para fazer basicamente tudo

const dotenv = require('dotenv')//essas 3 linhas basicamente etaram puxando os dados que estão dentro do nosso .env
dotenv.config()
const { TOKEN } = process.env



//Importação de dados, basicamente aqueles arquivos JSON para mandar dados para algum lugar 
const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Criando uma instancia de client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filepath} está com data ou execute com problema`)
    }
}

//Login do vbot
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command) {
        console.error("Comando não encontrado")
        return
    } 
    try {
        await command.execute(interaction)
    }
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando")
    }
})