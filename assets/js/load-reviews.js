async function loadReviews() {
  const container = document.getElementById("reviewsList");

  // Get list of review files
  const response = await fetch("/reviews/");
  const text = await response.text();

  // Extract filenames from directory listing
  const files = [...text.matchAll(/href="([^"]+\.md)"/g)].map(m => m[1]);

  for (const file of files) {
    const md = await fetch("/reviews/" + file).then(r => r.text());
    const parsed = matter(md);

    const name = parsed.data.name;
    const rating = parsed.data.rating;
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