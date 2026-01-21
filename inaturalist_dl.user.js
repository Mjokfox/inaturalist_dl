// ==UserScript==
// @name        iNaturalist quick downloads
// @match       *://www.inaturalist.org/*
// @icon        https://static.inaturalist.org/sites/1-favicon.png
// @grant       none
// @version     1.0
// @author      Mjokfox
// @description Makes it easier to download images from inaturalist, with nice filenames
// @inject-into content
// @run-at      document-idle
// @updateURL   https://github.com/Mjokfox/inaturalist_dl/raw/refs/heads/main/inaturalist_dl.user.js
// ==/UserScript==

(function() {
    'use strict';
    async function downloadFromUrl(url, observation_id, image_id, i) {
        await fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const burl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = burl;
                a.download = `inaturalist_${observation_id}_${image_id}_${i}`;
                a.click();
                URL.revokeObjectURL(burl);
                a.remove();
            })
    }

    function downloadFromImg(img, i) {
        if (!img) return;
        let observation_id = window.location.href.match(/\/(\d+)$/)[1];
        let url = img.src;
        url = url.replace(/(\/)\w+(\.\w+)$/, "$1original$2"); // original size link
        let image_id = url.match(/\/(\d+)\/\w+\.\w+$/)[1];
        downloadFromUrl(url, observation_id, image_id, i);
    }

    function downloadImage(e) {
        const top = e.target.offsetParent;
        const gallery = top.querySelector(".image-gallery-slides");
        if (!gallery) return;
        if (gallery.childElementCount === 1) {
            const img = gallery.querySelector("img");
            downloadFromImg(img, 1);
        } else if (gallery.childElementCount > 1) {
            for (let i = 0; i < gallery.childElementCount; i++) {
                const child = gallery.childNodes[i];
                if (child.classList.contains("center")) {
                    const img = child.querySelector("img");
                    downloadFromImg(img, i + 1);
                    break;
                }
            }
        }
    }

    function addDownloadButton(el) {
        const a = document.createElement("a");
        a.title = "Download this image";
        const i = document.createElement("i");
        i.classList.add("fa");
        i.classList.add("fa-download");
        i.style.cursor = "pointer";
        i.style.fontSize = "2em";
        a.append(i);
        el.prepend(a);
        i.addEventListener("click", downloadImage);
    }

    const app = document.getElementById("app");
    if (!app) return

    const observerCallback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            for (const node of mutation.addedNodes) {
                if (node.id == "ObservationShow") { // wait untill the page is loaded from the web app
                    node.querySelectorAll('.image-gallery-slide-wrapper').forEach(el => {addDownloadButton(el);});
                    observer.disconnect();
                }
            }
        }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(app, { childList: true });
})();

