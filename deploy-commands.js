const { REST, Routes } = require("discord.js")

const dotenv = require('dotenv')//essas 3 linhas basicamente etaram puxando os dados que estão dentro do nosso .env
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}


//instancia rest
const rest = new REST({version: "10"}).setToken(TOKEN);

(async () => {
    try {
        console.log(`resetando ${commands.length} comandos`)

        //PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}       
        )
            console.log("Comandos foram registrados")
    }
    catch (error){
        console.error(error)
    }
})()