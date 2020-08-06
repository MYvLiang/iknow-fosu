const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init()

exports.main = async (event, context) => {
  var res = {
    state: false,
    data: {}
  }
  await axios.get(event.URL, {
    params: event.params
  })
    .then(function (response) {
      res.data = response.data;
      res.state = true;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    state: res.state,
    data: res.data
  }
}