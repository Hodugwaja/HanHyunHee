const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const command = require('./commands/command');
const voteDiscord = require('./commands/vote');

client.on('ready', () => {
    console.log("현희봇 켜졌습니다");
    command(client, ['투표하기'], message => {
        const args = message.content.slice(config.prefix.length).trim().split(' ');
        var contentsVote = "투표 내용 : ";
        for(var i = 1; i<args.length; i++){
            contentsVote += args[i] + " ";
        }
        const vote = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('현희봇 조사 보고서')
            .setURL('https://github.com/cropMr/HanHyunHee')
            .setAuthor('현희봇#2702', 'https://imgur.com/wiAbK0Q.jpg', 'https://github.com/cropMr/HanHyunHee')
            .setDescription(`${message.author.username}` + "님이 제안한 투표입니다")
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addField('투표하는 법', "해당 메시지의 O(찬성), X(반대) 이모지를 클릭하시면 됩니다", false)
            .addField('투표내용', `${contentsVote}`, false)
            .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
        
        voteDiscord(client, `${message.channel.id}`, vote, ['⭕', '❌']);
    })
    
    command(client, ['핑', '테스트'], message => {
        message.channel.send("퐁");
    })

    command(client, ['서버조사', '서버정보'], message => {
        const serverInfo = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('현희봇 조사 보고서')
            .setURL('https://github.com/cropMr/HanHyunHee')
            .setAuthor('현희봇#2702', 'https://imgur.com/wiAbK0Q.jpg', 'https://github.com/cropMr/HanHyunHee')
            .setDescription(`${message.author.username}` + "님이 요청한 서버조사 결과입니다")
            .setThumbnail(`${message.guild.iconURL()}`)
            .addField('서버 이름', `${message.guild.name}`, false)
            .addField('서버 인원', `${message.guild.memberCount}`, false)
            .addField('서버 개설일', `${message.guild.createdAt}`, false)
            .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
        message.channel.send(serverInfo)

    })
    command(client, '초대', message => {
        const invite = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('현희봇 조사 보고서')
            .setURL('https://github.com/cropMr/HanHyunHee')
            .setAuthor('현희봇#2702', 'https://imgur.com/wiAbK0Q.jpg', 'https://github.com/cropMr/HanHyunHee')
            .setDescription(`${message.author.username}` + "님이 요청한 현희봇 초대장입니다")
            .setThumbnail(`${message.guild.iconURL()}`)
            .addField('초대 URL', `https://discordapp.com/oauth2/authorize?client_id=756727461747753081&scope=bot&permissions=8`, false)
            .setFooter('호두과자 #8981', 'https://imgur.com/DD3DQxx.jpg');
        message.channel.send(invite)
    })

    command(client, ['채널 검열','채널 삭제'], message => {
        if(message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results);
            })
        }
    })
    
})
client.login(config.token);

//https://discordapp.com/oauth2/authorize?client_id=756727461747753081&scope=bot&permissions=8
