const API_KEY = "";

    const generateImage = async () => {
        const inputElement = document.querySelector("#inputField");
        const prompt = inputElement.value.trim();
        const size = "1024x1024";
        const quality = "standard";
        const n = 1;

        // Constructing the prompt with the additional instruction
        const augmentedPrompt = `${prompt}. I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:`;

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ model: "dall-e-3", prompt: augmentedPrompt, size, quality, n })
        };

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", options);
            const data = await response.json();
            const imageUrl = data.data[0].url;
            displayImage(imageUrl);
        } catch (error) {
            console.error(error);
        }
    };

    const displayImage = (url) => {
        const imagesSection = document.querySelector(".images-section");
        imagesSection.innerHTML = `<img src="${url}" alt="Generated Image"/>`;
    };

    const submitIcon = document.querySelector("#submit-icon");
    submitIcon.addEventListener('click', generateImage);

    const inputField = document.querySelector("#inputField");
    inputField.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            generateImage();
        }
    });