const { SlashCommandBuilder } = require("discord.js")

//isso daqui está criando o comando que eu uso o / para chamalo e também estara exportando ele para o nosso arquivo principal 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Fala Pong viado!"),

    async execute(interaction) {
        await interaction.reply("Pong pra caralho!")
    }
}