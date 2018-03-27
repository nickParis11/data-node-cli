
function clearInput (str,multiLine)  {

  str = multiLine ? str : str.trim(); 
  let regExp = multiLine ?  /^\s*([a-z0-9\-]+\s*\n*\r*)*/gi : /^([a-z0-9\-]+\s*)*/gi
  str = str.match(regExp).join('');
  return str;

}

// ******************** exports *******************************

module.exports.clearInput = clearInput;