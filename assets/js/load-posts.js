async function loadPosts() {
  const postsList = document.getElementById("reflections-list");

  const response = await fetch("https://api.github.com/repos/CharlotteChiraghuddin/changebodyandmindtherapy/contents/posts");
  const files = await response.json();

  for (const file of files) {
    if (file.name.endsWith(".md")) {
      const mdResponse = await fetch(file.download_url);
      const mdText = await mdResponse.text();

      // Parse frontmatter
      const parsed = matter(mdText);

      const title = parsed.data.title || "Untitled";
      const date = parsed.data.date
        ? new Date(parsed.data.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : "";

      const contentHTML = marked.parse(parsed.content);

      // Build your custom HTML layout
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");

      postDiv.innerHTML = `
        <div class="post-card">
          <h2 class="post-title">${title}</h2>
          <p class="post-date">${date}</p>
          <div class="post-content">${contentHTML}</div>
        </div>
      `;

      postsList.appendChild(postDiv);
    }
  }
}

loadPosts();
