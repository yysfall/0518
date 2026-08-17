/* =========================================
   MONTHSARY DATA
   ========================================= */

const monthsaries = [

    {
        month: 1,
        date: "2026-06-18",

        title: "Month One",

        message:
            "This is the first time we met and the best time of my lifeeee!",

        media: [
            {
                type: "image",
                src: "assets/monthsaries/month-01/01.JPG"
            },
            {
                type: "video",
                src: "assets/monthsaries/month-01/02.mp4"
            },
            {
                type: "image",
                src: "assets/monthsaries/month-01/03.JPG"
            },
            {
                type: "video",
                src: "assets/monthsaries/month-01/04.mp4"
            },
            {
                type: "image",
                src: "assets/monthsaries/month-01/05.JPG"
            },
        ]
    },


    {
        month: 2,
        date: "2026-07-18",

        title: "Month Two",

        message:
            "We spent the whole month together. We went on a lot of dates and we got our first tattoo!",

        media: [
            {
                type: "image",
                src: "assets/monthsaries/month-02/01.JPG"
            },
            {
                type: "image",
                src: "assets/monthsaries/month-02/02.JPG"
            },
            {
                type: "image",
                src: "assets/monthsaries/month-02/03.JPG"
            }
            ,
            {
                type: "image",
                src: "assets/monthsaries/month-02/04.JPG"
            }
        ]
    },


    {
        month: 3,
        date: "2026-08-18",

        title: "Month Three",

        message:
            "We were far away but it doesn't feel like it. We watched The Last of Us, Legend of the Kitchen Soldier, Chef & My Fridge, and Rick and Morty.",

        media: [
            {
                type: "image",
                src: "assets/monthsaries/month-03/01.png"
            },
            {
                type: "image",
                src: "assets/monthsaries/month-03/02.png"
            },
            {
                type: "image",
                src: "assets/monthsaries/month-03/03.JPG"
            },
            {
                type: "image",
                src: "assets/monthsaries/month-03/04.png"
            }
        ]
    }

];


/* =========================================
   VARIABLES
   ========================================= */

let currentMonthIndex = 0;
let currentMediaIndex = 0;


/* =========================================
   INITIALIZE
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderArchive();

        updateTotalMonths();

    }
);


/* =========================================
   RENDER MONTHSARY GRID
   ========================================= */

function renderArchive() {

    const grid =
        document.getElementById("monthsaryGrid");

    if (!grid) return;

    grid.innerHTML = "";


    monthsaries.forEach(
        (month, index) => {

            const card =
                document.createElement("article");

            card.className = "month-card";


            card.onclick = function () {

                openViewer(index);

            };


            /*
               First media item becomes
               the card thumbnail.
            */

            const firstMedia =
                month.media[0];


            const date =
                formatDate(month.date);


            /*
               If the first item is a video,
               use the video as the thumbnail.

               If it's an image, use an image.
            */

            let thumbnailHTML = "";


            if (firstMedia.type === "video") {

                thumbnailHTML = `
                    <video
                        src="${firstMedia.src}"
                        muted
                        playsinline
                        preload="metadata"
                    ></video>
                `;

            } else {

                thumbnailHTML = `
                    <img
                        src="${firstMedia.src}"
                        alt="Month ${month.month}"
                        loading="lazy"
                    >
                `;

            }


            card.innerHTML = `

                <div class="month-thumbnail">

                    ${thumbnailHTML}

                </div>


                <div class="month-card-info">

                    <div class="month-number">
                        Month ${month.month}
                    </div>

                    <h3>
                        ${month.title}
                    </h3>

                    <div class="month-card-date">
                        ${date}
                    </div>

                </div>

            `;


            grid.appendChild(card);

        }
    );

}


/* =========================================
   OPEN VIEWER
   ========================================= */

function openViewer(index) {

    currentMonthIndex = index;

    currentMediaIndex = 0;


    document
        .getElementById("archiveView")
        .classList
        .add("hidden");


    document
        .getElementById("viewerView")
        .classList
        .remove("hidden");


    updateViewer();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   CLOSE VIEWER
   ========================================= */

function closeViewer() {

    stopCurrentVideo();


    document
        .getElementById("viewerView")
        .classList
        .add("hidden");


    document
        .getElementById("archiveView")
        .classList
        .remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   UPDATE VIEWER
   ========================================= */

function updateViewer() {

    const month =
        monthsaries[currentMonthIndex];

    if (!month) return;


    document.getElementById(
        "viewerMonth"
    ).textContent =
        `Month ${month.month}`;


    document.getElementById(
        "viewerTitle"
    ).textContent =
        month.title;


    document.getElementById(
        "viewerDate"
    ).textContent =
        formatDate(month.date);


    document.getElementById(
        "viewerMessage"
    ).textContent =
        month.message;


    /*
       Display current media
    */

    updateMedia();


    /*
       Month position
    */

    document.getElementById(
        "monthPosition"
    ).textContent =
        `${currentMonthIndex + 1} / ${monthsaries.length}`;


    /*
       Previous month
    */

    const previousButton =
        document.getElementById(
            "previousMonthButton"
        );

    const previousName =
        document.getElementById(
            "previousMonthName"
        );


    if (currentMonthIndex === 0) {

        previousButton.disabled = true;

        previousName.textContent =
            "First month";

    } else {

        previousButton.disabled = false;

        previousName.textContent =
            `Month ${
                monthsaries[
                    currentMonthIndex - 1
                ].month
            }`;

    }


    /*
       Next month
    */

    const nextButton =
        document.getElementById(
            "nextMonthButton"
        );

    const nextName =
        document.getElementById(
            "nextMonthName"
        );


    if (
        currentMonthIndex ===
        monthsaries.length - 1
    ) {

        nextButton.disabled = true;

        nextName.textContent =
            "Latest month";

    } else {

        nextButton.disabled = false;

        nextName.textContent =
            `Month ${
                monthsaries[
                    currentMonthIndex + 1
                ].month
            }`;

    }

}


/* =========================================
   UPDATE MEDIA
   ========================================= */

function updateMedia() {

    const month =
        monthsaries[currentMonthIndex];

    const media =
        month.media[currentMediaIndex];


    const viewer =
        document.querySelector(
            ".photo-viewer"
        );


    if (!viewer || !media) return;


    /*
       Stop existing video
    */

    stopCurrentVideo();


    /*
       Remove existing media
    */

    const oldMedia =
        document.getElementById(
            "viewerPhoto"
        );


    if (oldMedia) {

        oldMedia.remove();

    }


    /*
       IMAGE
    */

    if (media.type === "image") {

        const image =
            document.createElement("img");


        image.id =
            "viewerPhoto";


        image.src =
            media.src;


        image.alt =
            `${month.title} - Photo ${
                currentMediaIndex + 1
            }`;


        viewer.insertBefore(
            image,
            viewer.querySelector(
                ".photo-arrow.right"
            )
        );

    }


    /*
       VIDEO
    */

    else if (media.type === "video") {

        createMemoryVideo(
            viewer,
            media,
            month
        );

    }


    /*
       Update dots
    */

    renderMediaDots();

}

function createMemoryVideo(
    viewer,
    media,
    month
) {

    /*
       Main container
    */

    const container =
        document.createElement("div");


    container.className =
        "memory-video";


    container.id =
        "viewerPhoto";


    /*
       Video
    */

    const video =
        document.createElement("video");


    video.src =
        media.src;


    video.playsInline =
        true;


    video.preload =
        "metadata";


    /*
       Don't use native controls.
       Our custom controls handle them.
    */

    video.controls =
        false;


    video.setAttribute(
        "playsinline",
        ""
    );


    video.setAttribute(
        "webkit-playsinline",
        ""
    );


    /*
       Label
    */

    /*
       Center play button
    */

    const playButton =
        document.createElement("button");


    playButton.className =
        "memory-play-button";


    playButton.innerHTML =
        "▶";


    playButton.setAttribute(
        "aria-label",
        "Play video"
    );


    /*
       Controls overlay
    */

    const overlay =
        document.createElement("div");


    overlay.className =
        "memory-video-overlay";


    /*
       Progress bar
    */

    const progress =
        document.createElement("input");


    progress.type =
        "range";


    progress.className =
        "memory-progress";


    progress.min =
        0;


    progress.max =
        100;


    progress.value =
        0;


    /*
       Control row
    */

    const controls =
        document.createElement("div");


    controls.className =
        "memory-controls";


    /*
       Left controls
    */

    const leftControls =
        document.createElement("div");


    leftControls.className =
        "memory-control-left";


    /*
       Play/pause
    */

    const smallPlay =
        document.createElement("button");


    smallPlay.className =
        "memory-control-button";


    smallPlay.innerHTML =
        "▶";


    smallPlay.setAttribute(
        "aria-label",
        "Play or pause"
    );


    /*
       Time
    */

    const time =
        document.createElement("span");


    time.className =
        "memory-time";


    time.textContent =
        "0:00 / 0:00";


    /*
       Right controls
    */

    const rightControls =
        document.createElement("div");


    rightControls.className =
        "memory-control-right";


    /*
       Volume
    */

    const volumeButton =
        document.createElement("button");


    volumeButton.className =
        "memory-control-button";


    volumeButton.innerHTML =
        "🔊";


    volumeButton.setAttribute(
        "aria-label",
        "Mute or unmute"
    );


    /*
       Fullscreen
    */

    const fullscreenButton =
        document.createElement("button");


    fullscreenButton.className =
        "memory-control-button";


    fullscreenButton.innerHTML =
        "⛶";


    fullscreenButton.setAttribute(
        "aria-label",
        "Fullscreen"
    );


    /*
       Build controls
    */

    leftControls.appendChild(
        smallPlay
    );

    leftControls.appendChild(
        time
    );


    rightControls.appendChild(
        volumeButton
    );

    rightControls.appendChild(
        fullscreenButton
    );


    controls.appendChild(
        leftControls
    );

    controls.appendChild(
        rightControls
    );


    overlay.appendChild(
        progress
    );

    overlay.appendChild(
        controls
    );


    /*
       Build player
    */

    container.appendChild(
        video
    );

    container.appendChild(
        playButton
    );

    container.appendChild(
        overlay
    );


    /*
       Insert before right arrow
    */

    viewer.insertBefore(
        container,
        viewer.querySelector(
            ".photo-arrow.right"
        )
    );


    /* =====================================
       PLAY / PAUSE
       ===================================== */

    function togglePlay() {

        if (video.paused) {

            video.play();

        } else {

            video.pause();

        }

    }


    playButton.addEventListener(
        "click",
        togglePlay
    );


    smallPlay.addEventListener(
        "click",
        togglePlay
    );


    /*
       Update buttons
    */

    video.addEventListener(
        "play",
        function () {

            playButton.classList.add(
                "hidden"
            );

            smallPlay.innerHTML =
                "❚❚";

            container.classList.add(
                "show-controls"
            );

        }
    );


    video.addEventListener(
        "pause",
        function () {

            playButton.classList.remove(
                "hidden"
            );

            smallPlay.innerHTML =
                "▶";

            container.classList.add(
                "show-controls"
            );

        }
    );


    /* =====================================
       TIME
       ===================================== */

    video.addEventListener(
        "loadedmetadata",
        function () {

            updateTime();

        }
    );


    video.addEventListener(
        "timeupdate",
        function () {

            updateTime();

        }
    );


    function updateTime() {

        const current =
            formatVideoTime(
                video.currentTime
            );


        const duration =
            formatVideoTime(
                video.duration
            );


        time.textContent =
            `${current} / ${duration}`;


        if (
            video.duration &&
            !isNaN(video.duration)
        ) {

            progress.value =
                (
                    video.currentTime /
                    video.duration
                ) * 100;

        }

    }


    /* =====================================
       PROGRESS
       ===================================== */

    progress.addEventListener(
        "input",
        function () {

            if (
                !video.duration ||
                isNaN(video.duration)
            ) {

                return;

            }


            video.currentTime =
                (
                    progress.value / 100
                ) *
                video.duration;

        }
    );


    /* =====================================
       VOLUME
       ===================================== */

    volumeButton.addEventListener(
        "click",
        function () {

            video.muted =
                !video.muted;


            if (video.muted) {

                volumeButton.innerHTML =
                    "🔇";

            } else {

                volumeButton.innerHTML =
                    "🔊";

            }

        }
    );


    /* =====================================
       FULLSCREEN
       ===================================== */

    fullscreenButton.addEventListener(
        "click",
        function () {

            if (
                container.requestFullscreen
            ) {

                container.requestFullscreen();

            }

            else if (
                video.webkitEnterFullscreen
            ) {

                /*
                   iPhone Safari
                */

                video.webkitEnterFullscreen();

            }

        }
    );


    /* =====================================
       SHOW CONTROLS ON TOUCH
       ===================================== */

    let hideTimer;


    function showControls() {

        container.classList.add(
            "show-controls"
        );


        clearTimeout(
            hideTimer
        );


        if (!video.paused) {

            hideTimer =
                setTimeout(
                    function () {

                        container.classList.remove(
                            "show-controls"
                        );

                    },
                    2500
                );

        }

    }


    container.addEventListener(
        "touchstart",
        showControls,
        {
            passive: true
        }
    );


    container.addEventListener(
        "mousemove",
        showControls
    );

}
function formatVideoTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return `${minutes}:${
        remainingSeconds
            .toString()
            .padStart(2, "0")
    }`;

}


/* =========================================
   STOP CURRENT VIDEO
   ========================================= */

function stopCurrentVideo() {

    const video =
        document.querySelector(
            ".photo-viewer video"
        );


    if (video) {

        video.pause();

        video.removeAttribute("src");

        video.load();

    }

}


/* =========================================
   MEDIA DOTS
   ========================================= */

function renderMediaDots() {

    const container =
        document.getElementById(
            "photoDots"
        );


    const month =
        monthsaries[currentMonthIndex];


    container.innerHTML = "";


    month.media.forEach(
        function (item, index) {

            const dot =
                document.createElement("span");


            dot.className =
                "photo-dot";


            if (
                index === currentMediaIndex
            ) {

                dot.classList.add(
                    "active"
                );

            }


            /*
               Optional:
               clicking a dot changes
               the media.
            */

            dot.style.cursor = "pointer";


            dot.addEventListener(
                "click",
                function () {

                    currentMediaIndex =
                        index;

                    updateMedia();

                }
            );


            container.appendChild(dot);

        }
    );

}


/* =========================================
   NEXT MEDIA
   ========================================= */

function nextPhoto() {

    const month =
        monthsaries[currentMonthIndex];


    if (
        currentMediaIndex <
        month.media.length - 1
    ) {

        currentMediaIndex++;

    } else {

        /*
           Loop back to first media
        */

        currentMediaIndex = 0;

    }


    updateMedia();

}


/* =========================================
   PREVIOUS MEDIA
   ========================================= */

function previousPhoto() {

    const month =
        monthsaries[currentMonthIndex];


    if (currentMediaIndex > 0) {

        currentMediaIndex--;

    } else {

        /*
           Loop to last media
        */

        currentMediaIndex =
            month.media.length - 1;

    }


    updateMedia();

}


/* =========================================
   NEXT MONTH
   ========================================= */

function nextMonth() {

    if (
        currentMonthIndex <
        monthsaries.length - 1
    ) {

        stopCurrentVideo();


        currentMonthIndex++;

        currentMediaIndex = 0;


        updateViewer();

    }

}


/* =========================================
   PREVIOUS MONTH
   ========================================= */

function previousMonth() {

    if (currentMonthIndex > 0) {

        stopCurrentVideo();


        currentMonthIndex--;

        currentMediaIndex = 0;


        updateViewer();

    }

}


/* =========================================
   FORMAT DATE
   ========================================= */

function formatDate(dateString) {

    const [year, month, day] =
        dateString
            .split("-")
            .map(Number);


    const date =
        new Date(
            year,
            month - 1,
            day
        );


    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* =========================================
   TOTAL MONTHS
   ========================================= */

function updateTotalMonths() {

    const total =
        monthsaries.length;


    const element =
        document.getElementById(
            "totalMonths"
        );


    if (element) {

        element.textContent =
            total;

    }

}


/* =========================================
   KEYBOARD CONTROLS
   ========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const viewer =
            document.getElementById(
                "viewerView"
            );


        if (
            viewer.classList.contains(
                "hidden"
            )
        ) {

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextPhoto();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousPhoto();

        }


        if (
            event.key === "Escape"
        ) {

            closeViewer();

        }

    }
);


/* =========================================
   TOUCH / SWIPE SUPPORT
   ========================================= */

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


const photoViewer =
    document.querySelector(
        ".photo-viewer"
    );


if (photoViewer) {

    photoViewer.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

            touchStartY =
                event.changedTouches[0]
                    .screenY;

        },
        {
            passive: true
        }
    );


    photoViewer.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            touchEndY =
                event.changedTouches[0]
                    .screenY;


            handleSwipe();

        },
        {
            passive: true
        }
    );

}


function handleSwipe() {

    const horizontalDistance =
        touchEndX - touchStartX;


    const verticalDistance =
        touchEndY - touchStartY;


    /*
       Ignore mostly vertical swipes.
    */

    if (
        Math.abs(horizontalDistance) <
        Math.abs(verticalDistance)
    ) {

        return;

    }


    /*
       Ignore tiny movements.
    */

    if (
        Math.abs(horizontalDistance) < 50
    ) {

        return;

    }


    if (horizontalDistance < 0) {

        // Swipe LEFT
        nextPhoto();

    } else {

        // Swipe RIGHT
        previousPhoto();

    }

}