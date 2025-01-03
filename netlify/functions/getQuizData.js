const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${process.env.FILE_PATH}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch quiz data' })
    };
  }
};
