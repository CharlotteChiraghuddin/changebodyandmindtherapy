async function loadApprovedReviews() {
  const container = document.getElementById("reviews-list");

  try {
    const response = await fetch("/.netlify/functions/get-reviews");
    const reviews = await response.json();

    if (!reviews.length) {
      container.innerHTML = "<p class='lead'>No reviews have been approved yet.</p>";
      return;
    }

    reviews.forEach(review => {
      const item = document.createElement("div");
      item.className = "card-soft review-item";
      item.style.padding = "1.4rem";

      item.innerHTML = `
        <p class="review-message" style="margin: 0 0 0.8rem; font-size: 1.05rem; color: var(--text-main);">
          “${review.message}”
        </p>

        <div class="review-rating" style="color: var(--accent-lavender); font-size: 1.2rem; margin-bottom: 0.4rem;">
          ${"★".repeat(review.rating)}
        </div>

        ${review.name ? `<p class="review-name" style="color: var(--text-soft); font-size: 0.9rem;">— ${review.name}</p>` : ""}
      `;

      container.appendChild(item);
    });
  } catch (err) {
    container.innerHTML = "<p class='lead'>Unable to load reviews at this time.</p>";
  }
}

loadApprovedReviews();