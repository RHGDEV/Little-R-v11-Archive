module.exports = (type, msg, title) => {
  if (!title) title = "LOG";
  if (!type){
    console.log(`${type} | ${title}: ${msg}`)
  }
}
