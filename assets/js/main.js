document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Simple smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (nav && nav.classList.contains("open")) {
            nav.classList.remove("open");
          }
        }
      }
    });
  });
});


async function handleSubmit(event) {
  event.preventDefault(); // stop normal redirect

  const form = event.target;
  const overlay = document.getElementById("formSuccessOverlay");

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      // Show overlay
      overlay.classList.remove("hidden");

      // Clear form
      form.reset();

      // Hide overlay after 3 seconds
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 3000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
}

async function handleFeedbackSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const overlay = document.getElementById("formSuccessOverlay");

  const formData = new FormData(form);

  // If name is empty, set it to Anonymous
  const nameValue = formData.get("name").trim();
  if (!nameValue) {
    formData.set("name", "Anonymous");
  }

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      overlay.classList.remove("hidden");
      form.reset();

      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 3000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
}

