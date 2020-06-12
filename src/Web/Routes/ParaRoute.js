const Router = require("express").Router();
const Bumper = require("../../Bot/MemoryClient.js");
let Memory = Bumper;
const Quick = require("quick.db");
const ms = require("parse-ms");
const Discord = require("discord.js");
let Developers = ["338192747754160138", "320602199006642178"];
let staff = ["338192747754160138", "320602199006642178"];

Router.get("/", checkAuth, async (req, res) => {
  let Page = "Paragraphs";
  let Query = req.query.q;
  let Data = [];
  let Value = Bumper.queuePara.get("queued");

  if (Value.length === 0) {
    Data = null;
  } else if (Value) {
    Value.map(async Kiro => {
      let user = Bumper.paraUsers.get(Kiro, "users");

      Data[Data.length] = {
        avatarURL: Bumper.users.get(user).displayAvatarURL.split("?")[0],
        id: Kiro,
        tag: Bumper.users.get(user).tag
      };
    });
  } else {
    Data = null;
  }

  res.render(process.cwd() + "/src/Web/Views/allpara.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    Bumper,
    Page,
    Data,
    Query
  });
});

Router.get("/:id", async (req, res) => {
  let Data = [];
  let Key = req.params.id;
  let Alert = req.query.q;
  if (!Key) return res.redirect("/");

  /*     let paragraphs = Memory.paragraphs.get("para", Key)
     if(!paragraphs)return res.redirect("/");    */

  let user = Memory.paraUsers.get(Key, "users");
  if (user.length === 0) return res.redirect("/");
  if (!user) return res.redirect("/");
  let author = Memory.users.get(user).tag;
  let avatar = Memory.users.get(user).displayAvatarURL.split("?")[0];
  let para = await Quick.fetch(`updatedParagraph_${Key}`);
  let writer = await Quick.fetch(`writerParagraph_${Key}`);

  res.render(process.cwd() + "/src/Web/Views/paragraphs.ejs", {
    Bumper,
    user: req.isAuthenticated() ? req.user : null,
    Data,
    author,
    para,
    Key,
    avatar,
    writer,
    staff,
    Page: "Paragraph",
    Alert
  });
});

Router.get("/:id/edit", checkAuth, async (req, res) => {
  let Data = [];
  let Key = req.params.id;
  if (!Key) return res.redirect("/");

  let uID = req.isAuthenticated() ? req.user : null;
  let id = uID.id;

  /*     let paragraphs = Memory.paragraphs.get("para", Key)
     if(!paragraphs)return res.redirect("/");    */

  let user = Memory.paraUsers.get(Key, "users");
  if (user.length === 0) return res.redirect("/");
  if (!user) return res.redirect("/");
  let author = Memory.users.get(user).tag;
  let avatar = Memory.users.get(user).displayAvatarURL.split("?")[0];
  let para = await Quick.fetch(`updatedParagraph_${Key}`);
  if (para) return res.redirect(`/paragraphs/${Key}`);
  let value;

  if (id === user) return res.redirect(`/paragraphs/${Key}?q=no`);

  res.render(process.cwd() + "/src/Web/Views/edit.ejs", {
    bot: Memory,
    user: req.isAuthenticated() ? req.user : null,
    Data,
    author,
    para,
    Key,
    avatar,
    value,
    Page: "Edit Paragraph"
  });
});

Router.post("/:id/edit", checkAuth, async (req, res) => {
  let Data = [];
  let Key = req.params.id;
  if (!Key) return res.redirect("/");

  let uID = req.isAuthenticated() ? req.user : null;
  let id = uID.id;

  /*     let paragraphs = Memory.paragraphs.get("para", Key)
     if(!paragraphs)return res.redirect("/");    */

  let user = Memory.paraUsers.get(Key, "users");
  if (user.length === 0) return res.redirect("/");
  if (!user) return res.redirect("/");
  let para = await Quick.fetch(`updatedParagraph_${Key}`);
  if (para) return res.redirect(`/paragraphs/${Key}`);

  if (id === user) return res.redirect(`/paragraphs/${Key}`);
  let writer = Memory.users.get(id).tag;

  Quick.set(`updatedParagraph_${Key}`, req.body.paragraph);
  Quick.delete(`newParagraph_${user}`);
  Quick.delete(`keyParagraph_${user}`);
  Quick.set(`writerParagraph_${Key}`, writer);
  // Memory.paraUsers.remove(Key, "users");
  Memory.queuePara.remove("queued", Key);

  res.redirect(`/paragraphs/${Key}`);

  let channel = Memory.channels.get("546104187486863360");
  let correctEmbed = new Discord.RichEmbed()
    .setColor(Memory.Color)
    .setTitle("Someone wrote a person a paragraph.")
    .setThumbnail(Memory.user.avataURL)
    .setDescription(
      `${writer} ( <@${id}> )\n Wrote: ${
        Memory.users.get(user).tag
      } a paragraph\n${
        req.body.paragraph
      }\nView: [Here](https://project-memory.glitch.me/paragraphs/${Key})`
    )
    .setFooter("Does it fit our guielines?");
  channel.send(correctEmbed);
  Memory.fetchUser(user).then(user => {
    let embed = new Discord.RichEmbed()
      .setTitle("Someone wrote you a paragraph!")
      .setColor(Memory.Color)
      .setDescription(
        `**${
          Memory.users.get(id).tag
        }** Wrote you a paragraph!\nView: [Here](https://project-memory.glitch.me/paragraphs/${Key})`
      );
    user.send(embed);
  });

  Memory.fetchUser(id).then(use => {
    let embed = new Discord.RichEmbed()
      .setTitle("Thank You")
      .setColor(Memory.Color)
      .setDescription(
        `Thank you, ${Memory.users.get(id).username} for writing, ${
          Memory.users.get(user).tag
        } a paragraph`
      );
    use.send(embed);
  });
});

Router.get("/:id/admin/edit", checkAuth, async (req, res) => {
  let Data = [];
  let Key = req.params.id;
  if (!Key) return res.redirect("/");

  let uID = req.isAuthenticated() ? req.user : null;
  let id = uID.id;

  /*     let paragraphs = Memory.paragraphs.get("para", Key)
     if(!paragraphs)return res.redirect("/");    */

  let user = Memory.paraUsers.get(Key, "users");
  if (user.length === 0) return res.redirect("/");
  if (!user) return res.redirect("/");
  let author = Memory.users.get(user).tag;
  let avatar = Memory.users.get(user).displayAvatarURL.split("?")[0];
  let para = await Quick.fetch(`updatedParagraph_${Key}`);
  if (para) return res.redirect(`/paragraphs/${Key}`);
  let value = await Quick.fetch(`updatedParagraph_${Key}`);
  if (id === user) return res.redirect(`/paragraphs/${Key}`);

  res.render(process.cwd() + "/src/Web/Views/edit.ejs", {
    bot: Memory,
    user: req.isAuthenticated() ? req.user : null,
    Data,
    author,
    para,
    Key,
    avatar,
    value,
    Page: "Edit Paragraph"
  });
});

Router.post("/:id/admin/edit", checkAuth, async (req, res) => {
  let Data = [];
  let Key = req.params.id;
  if (!Key) return res.redirect("/");

  let uID = req.isAuthenticated() ? req.user : null;
  let id = uID.id;

  /*     let paragraphs = Memory.paragraphs.get("para", Key)
     if(!paragraphs)return res.redirect("/");    */

  let user = Memory.paraUsers.get(Key, "users");
  if (user.length === 0) return res.redirect("/");
  if (!user) return res.redirect("/");
  let para = await Quick.fetch(`updatedParagraph_${Key}`);
  if (para) return res.redirect(`/paragraphs/${Key}`);

  Quick.set(`updatedParagraph_${Key}`, req.body.paragraph);

  res.redirect(`/paragraphs/${Key}`);
});

module.exports = Router;

/*
 * Authorization check, if not authorized return them to the login page.
 */
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.backURL = req.url;

    res.redirect("/login?redirect=/paragraphs/" + req.url);
  }
}
