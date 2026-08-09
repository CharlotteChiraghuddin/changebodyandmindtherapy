const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const reviewsDir = path.join(process.cwd(), "reviews");
    const files = fs.readdirSync(reviewsDir);

    const mdFiles = files.filter(f => f.endsWith(".md"));

    return {
      statusCode: 200,
      body: JSON.stringify(mdFiles),
      headers: { "Content-Type": "application/json" }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
