async function loadPosts() {
  const postsList = document.getElementById("reflections-list");

  // Fetch the list of posts from the GitHub API
  const response = await fetch("https://api.github.com/repos/charlottetechiraghuddin/sarah_reeve/contents/posts");
  const files = await response.json();

  // Loop through each markdown file
  for (const file of files) {
    if (file.name.endsWith(".md")) {
      const mdResponse = await fetch(file.download_url);
      const mdText = await mdResponse.text();

      // Convert markdown to HTML using a simple converter
      const html = marked.parse(mdText);

      // Create a container for each post
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = html;

      postsList.appendChild(postDiv);
    }
  }
}

loadPosts();
