// Your API key or any relevant key that needs to be used in the script
const API_KEY = '35a720ee94694582ae22cfe1a566a00b';

async function getNewsDataFromServer(topic) {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&from=2024-07-28&sortBy=publishedAt&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayNewsArticles(data.articles);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayNewsArticles(articles) {
    const cardsPlace = document.getElementById("cardsPlace");

    // Clear previous articles
    while (cardsPlace.firstChild) {
        cardsPlace.removeChild(cardsPlace.firstChild);
    }

    // Loop through each article and create the card elements
    articles.forEach((article) => {
        const div1 = document.createElement("div");
        div1.classList.add(
            "bg-slate-500", "bg-opacity-70", "hover:bg-opacity-90", 
            "p-2", "rounded-xl", "transition", "duration-1000", 
            "ease-in-out", "transform", "hover:scale-105"
        );

        const div2 = document.createElement("div");
        div2.classList.add(
            "flex", "justify-around", "gap-6", "bg-slate-300", 
            "items-center", "px-2", "rounded-md", "py-3", 
            "bg-opacity-90", "hover:bg-opacity-95"
        );

        const div4 = document.createElement("div");
        div4.classList.add("max-w-60");

        const div5 = document.createElement("div");
        div5.classList.add("rounded-lg");

        const div6 = document.createElement("div");
        div6.classList.add(
            "h-16", "bg-opacity-70", "hover:bg-opacity-90", 
            "flex", "justify-around", "mt-2", "bg-slate-200", 
            "w-11/12", "mx-auto", "rounded-2xl", "items-center", "mb-6"
        );

        const div7 = document.createElement("div");
        div7.classList.add("flex", "justify-center");

        // Title and description
        const h1 = document.createElement("h2");
        h1.classList.add("font-bold");
        h1.innerHTML = article.title.substring(0, 30) + "..";
        const p1 = document.createElement("p");
        p1.innerHTML = article.description.substring(0, 125) + "...";
        div4.appendChild(h1);
        div4.appendChild(p1);

        // Article image
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.classList.add("h-32", "w-32", "bg-cover", "rounded-md");

        div2.appendChild(img);
        div2.appendChild(div4);

        // Action buttons
        const likeButton = createIconButton("./img/likee.png", "likee");
        const dislikeButton = createIconButton("./img/dislikeee.png", "dislikeee");
        const commentButton = createIconButton("./img/chat.png", "comment");
        const bookmarkButton = createIconButton("./img/bookmark (1).png", "bookmark");

        div6.appendChild(likeButton);
        div6.appendChild(dislikeButton);
        div6.appendChild(commentButton);
        div6.appendChild(bookmarkButton);

        const linkButton = document.createElement("a");
        linkButton.classList.add(
            "bg-black", "text-white", "px-7", "py-2", 
            "rounded-2xl", "outline", "outline-offset-0", 
            "outline-cyan-100", "hover:bg-white", "mb-3", 
            "hover:outline-cyan-950", "hover:text-black", 
            "hover:font-bold"
        );
        linkButton.innerHTML = "Link &#8594;";
        linkButton.href = article.url;
        linkButton.target = "_blank";

        div7.appendChild(linkButton);

        div5.appendChild(div6);
        div5.appendChild(div7);

        div1.appendChild(div2);
        div1.appendChild(div5);

        cardsPlace.appendChild(div1);
    });
}

function createIconButton(src, altText) {
    const anchor = document.createElement("a");
    const icon = document.createElement("img");
    icon.src = src;
    icon.classList.add(
        "h-10", "w-10", "transition", "duration-100", 
        "ease-in-out", "transform", "hover:scale-110"
    );
    icon.alt = altText;
    anchor.appendChild(icon);
    return anchor;
}

window.onload = function () {
    getNewsDataFromServer("odisha");
};

function addEvents(topic) {
    document.getElementById(topic).addEventListener("click", function (e) {
        e.preventDefault();
        getNewsDataFromServer(topic);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const topics = ["Geopolitics", "Entertainment", "Stocks", "Business", "Sports"];
    topics.forEach(addEvents);
    
    document.getElementById("search").addEventListener("click", function (e) {
        e.preventDefault();
        const topic = document.getElementById("input").value;
        getNewsDataFromServer(topic);
    });
});
