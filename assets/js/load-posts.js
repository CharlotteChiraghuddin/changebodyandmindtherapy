async function loadPosts() {
  const postsList = document.getElementById("reflections-list");

  const response = await fetch("https://api.github.com/repos/CharlotteChiraghuddin/changebodyandmindtherapy/contents/posts");
  const files = await response.json();

  for (const file of files) {
    if (file.name.endsWith(".md")) {
      const mdResponse = await fetch(file.download_url);
      const mdText = await mdResponse.text();

      // Extract title
      const titleMatch = mdText.match(/title:\s*(.*)/);
      const title = titleMatch ? titleMatch[1].trim() : "Untitled";

      // Extract date
      const dateMatch = mdText.match(/date:\s*(.*)/);
      let formattedDate = "";

      if (dateMatch) {
        const rawDate = new Date(dateMatch[1].trim());
        formattedDate = rawDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }

      // Remove frontmatter lines (title/date/---)
      const cleaned = mdText
        .replace(/---/g, "")
        .replace(/title:.*\n?/g, "")
        .replace(/date:.*\n?/g, "")
        .trim(); // removes blank lines

      // Convert markdown to HTML
      const contentHTML = marked.parse(cleaned);

      // Build final HTML
      const html = `
        <h2 class="post-title">${title}</h2>
        <p class="post-date">${formattedDate}</p>
        ${contentHTML}
        <hr>
      `;

      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = html;

      postsList.appendChild(postDiv);
    }
  }
}

loadPosts();
