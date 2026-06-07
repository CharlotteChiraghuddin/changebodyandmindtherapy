async function loadPosts() {
  const postsList = document.getElementById("reflections-list");

  const response = await fetch("https://api.github.com/repos/CharlotteChiraghuddin/changebodyandmindtherapy/contents/posts");

  console.log("API response:", response); // <--- ADD THIS

  const files = await response.json();

  console.log("Parsed JSON:", files); // <--- AND THIS

  for (const file of files) {
    if (file.name.endsWith(".md")) {
      const mdResponse = await fetch(file.download_url);
      const mdText = await mdResponse.text();

      const html = marked.parse(mdText);

      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = html;

      postsList.appendChild(postDiv);
    }
  }
}

loadPosts();
