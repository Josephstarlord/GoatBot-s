const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🐐 | GoatBot V2 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "TeTo",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `💬»𝘼𝙀𝙎𝙏𝙃𝙀𝙍♡𝗖𝗠𝗗\n━━━━━━━━━━━━━━\n `; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += ` \n━━━━━━━━━━━━━━\nミ★【 ${category.toUpperCase()} 】🎎`;
const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `\n✦${item}`);
            msg += ` ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += ``;
        }
      });

      const totalCommands = commands.size;
      msg += `\n━━━━━━━━━━━━━━\n🎋𝗧𝗢𝗧𝗔𝗟 𝗖𝗺𝗱 [${totalCommands}📑]\n━━━━━━━━━━━━━━\n⭕𝗖𝗥𝗘𝗔𝗧𝗢𝗥 𝗟𝗜𝗡𝗞⭕ :\n▪〉https://www.facebook.com/profile.php?id=100087186685708\n▪〉𝗕𝗢𝗧 :[🏮]TeTo💟©\n━━━━━━━━━━━━━━\n☪ 𝗡𝗕 : IF ANY PROBLEM USE  \n🔴[!callad]🔴`;
      msg += ``;
      msg += ``; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.ibb.co/JHS1WNL/image.gif", // add image link here
        "https://i.ibb.co/ZV5NdyJ/image.gif",

"https://i.ibb.co/CzRr9GH/image.gif",
        "https://i.ibb.co/9ZGVFSd/image.gif",

        "https://i.ibb.co/mTQfnHF/image.gif",

      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `🦋⃤𝗡𝗔𝗠𝗘⚪🔵🔴\n────────────\n〉[ ${configCommand.name}]\[🦋⃤𝗜𝗡𝗙𝗢⚪🔵🔴]\n--------------------------------------\n〉[𝘥𝘦𝘴𝘤𝘳𝘪𝘱𝘵𝘪𝘰𝘯]:\n▶︎${longDescription}\n〉🔵[𝘖𝘵𝘩𝘦𝘳-𝘯𝘢𝘮𝘦𝘴]:\n▶︎${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"} Other names in your group: Do not have\n〉⚪[𝘝𝘦𝘳𝘴𝘪𝘰𝘯]:\n▶︎${configCommand.version || "1.0"}\n〉⚪[𝘙𝘰𝘭𝘦]:\n▶︎${roleText}\n〉⚪𝘛𝘪𝘮𝘦 𝘱𝘦𝘳 𝘤𝘰𝘮𝘮𝘢𝘯𝘥:\n ▶︎${configCommand.countDown || 1}s〉⚪[𝘈𝘶𝘵𝘩𝘰𝘳]:\n▶︎${author}\🦋⃤𝗨𝗦𝗔𝗚𝗘⚪🔵\n────────────\n▶︎ ${usage}\n━━━━━━━━━━━━\n„ಡωಡ„Ae-TeTo💟`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
