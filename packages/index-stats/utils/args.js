function getScfArgs(event) {
  if (!event) {
    return {};
  }
  if (event.Type === 'Timer') {
    return JSON.parse(event.Message);
  }
  return event;
}

module.exports = {
  getScfArgs,
};
