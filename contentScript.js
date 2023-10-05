(() => {
    let youtubeLeftControls, youtubePlayer;

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, videoId} = obj;
        if (type === "NEW"){
            console.log("Webpage Loaded");
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        const maximizeBtnExists = document.getElementsByClassName("maximize-btn")[0];
        if (!maximizeBtnExists){
            const maximizebtn = document.createElement("img");
            maximizebtn.src = chrome.runtime.getURL("assets/Maximize.svg")
            maximizebtn.className = "ytp-button " + "maximize-btn";
            maximizebtn.title = "Maximize";
            maximizebtn.style = "width: 38px; height: 38px; margin-bottom: 2px;";

            youtubeLeftControls = document.getElementsByClassName("ytp-right-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            if (youtubeLeftControls){
                youtubeLeftControls.appendChild(maximizebtn);
            }
            maximizebtn.addEventListener("click", maximizeWindow);
        }
    }

    const maximizeWindow = () => {
        chrome.runtime.sendMessage({action: "redirect"});
    }

    newVideoLoaded();
})();
