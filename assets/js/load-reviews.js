async function loadReviews() {
  const container = document.getElementById("reviewsList");

  // Get list of review files from Netlify Function
  const response = await fetch("/.netlify/functions/list-reviews");
  const files = await response.json();

  for (const file of files) {
    const md = await fetch("/reviews/" + file).then(r => r.text());
    const parsed = matter(md);

    const name = parsed.data.name || "Anonymous";
    const rating = parsed.data.rating || 5;
    const date = new Date(parsed.data.date).toLocaleDateString();
    const body = parsed.content.trim();

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <h3>${name}</h3>
      <p class="stars">${stars}</p>
      <p class="date">${date}</p>
      <p>${body}</p>
    `;
    container.appendChild(item);
  }
}

loadReviews();
