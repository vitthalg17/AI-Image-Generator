const apikey = "[INSERT YOUR API KEY HERE]";
const submitIcon = document.querySelector("#submit-icon");
const inputField = document.querySelector("input");
const imagesSection = document.querySelector(".images-section");

const getImages = async () => {
    const prompt = inputField.value;

    if (!prompt) {
        console.error("Prompt is empty");
        return;
    }

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apikey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt,
            n: 2,
            size: "1024x1024"
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error ${response.status}: ${errorText}`);
            return;
        }

        const data = await response.json();

        if (!data || !data.data) {
            console.error("No data returned from API");
            return;
        }

        data.data.forEach(imageObject => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const imageElement = document.createElement("img");
            imageElement.setAttribute("src", imageObject.url);
            imageElement.setAttribute("alt", "Generated image");

            imageContainer.append(imageElement);
            imagesSection.append(imageContainer);
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

// Add event listener to the submit icon (click event)
submitIcon.addEventListener("click", getImages);

// Add event listener to the input field (key press event)
inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getImages();
    }
});
