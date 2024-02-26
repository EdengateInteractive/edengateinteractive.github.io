// Sample post data (you can load this dynamically from a JSON file or an API)
const posts = [
    { title: "Post Title 1", description: "Post description goes here...", imageUrl: "post1.jpg" },
    { title: "Post Title 2", description: "Post description goes here...", imageUrl: "post2.jpg" },
    { title: "Post Title 3", description: "Post description goes here...", imageUrl: "post3.jpg" },
    { title: "Post Title 4", description: "Post description goes here...", imageUrl: "post4.jpg" },
    { title: "Post Title 5", description: "Post description goes here...", imageUrl: "post5.jpg" },
    { title: "Post Title 6", description: "Post description goes here...", imageUrl: "post6.jpg" },
    { title: "Post Title 7", description: "Post description goes here...", imageUrl: "post7.jpg" },
    // Add more posts as needed
];

const postsPerPage = 4; // Number of posts to display per page
let currentPage = 1; // Current page number

function generatePostHTML(post) {
    return `
        <div class="post">
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title} Image">` : ''}
        </div>
    `;
}

function displayPosts(page) {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = '';

    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    for (let i = startIndex; i < Math.min(endIndex, posts.length); i++) {
        const post = posts[i];
        const postElement = document.createElement('div');
        postElement.innerHTML = generatePostHTML(post);
        postsContainer.appendChild(postElement);
    }
}

function displayPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(posts.length / postsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayPosts(currentPage);
            updateActivePageButton();
        });
        paginationContainer.appendChild(pageButton);
    }

    updateActivePageButton();
}

function updateActivePageButton() {
    const paginationButtons = document.querySelectorAll("#pagination button");
    paginationButtons.forEach(button => {
        if (parseInt(button.textContent) === currentPage) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

window.onload = function() {
    displayPosts(currentPage);
    displayPagination();
};