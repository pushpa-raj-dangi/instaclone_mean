// module.exports = {
//   MONGOURI: "mongodb+srv://pushpa:pushpa@instaclone.n2awf.mongodb.net/insta_db?retryWrites=true&w=majority",
//   JWT_SECRET: "mysecretdon",
// };


module.exports = {
  MONGOURI: process.env.MONGOURI || "mongodb://mongo:27017/instclone",
  JWT_SECRET: process.env.JWT_SECRET || "mysecretdon",  
};
