const fetch = require("node-fetch");

exports.handler = async () => {
  const token = process.env.NETLIFY_API_TOKEN;

  // Get all forms
  const forms = await fetch("https://api.netlify.com/api/v1/forms", {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());

  // Find the "reviews" form
  const reviewsForm = forms.find(f => f.name === "reviews");

  if (!reviewsForm) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Reviews form not found" })
    };
  }

  // Get submissions
  const submissions = await fetch(
    `https://api.netlify.com/api/v1/forms/${reviewsForm.id}/submissions`,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.json());

  // Filter only approved ones
  const approved = submissions
    .filter(s => s.tags.includes("approved"))
    .map(s => ({
      name: s.data.name || "",
      rating: parseInt(s.data.rating),
      message: s.data.message
    }));

  return {
    statusCode: 200,
    body: JSON.stringify(approved)
  };
};
