function formatMessage(username, text) {
  const today = new Date();
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + String(today.getDate()).padStart(2, "0");
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  return {
    username,
    text,
    time: dateTime,
  };
}

module.exports = formatMessage;
