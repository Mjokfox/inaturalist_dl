# iNaturalist quick download
Download images in original quality quickly with nice filenames.

## Installation

1. Install a [Userscript Manager](https://en.wikipedia.org/wiki/Userscript_manager) of your choice. I recommend [Violentmonkey](https://violentmonkey.github.io/).
    > - [violentmonkey for Firefox](https://addons.mozilla.org/firefox/addon/violentmonkey/)<br>
    > - [violentmonkey for Chrome](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)<br>
    > - [violentmonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao)<br>
    
    or [Tampermonkey](https://www.tampermonkey.net/), which is not open source..
    > - [tampermonkey for Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)<br>
    > - [tampermonkey for Safari (MacOS/iOS/iPadOS)](https://apps.apple.com/us/app/userscripts/id1463298887)<br>

2. Install **INaturalist dl** by clicking **[this link](https://github.com/Mjokfox/inaturalist_dl/raw/refs/heads/main/inaturalist_dl.user.js)**.

## Usage
A quick download button will appear above photos on the observation page, simply click it and instantly download the orignal size available of that image

### An extra tip when browsing INaturalist
If you're sick of seeing observations of deceased creatures, add this after a search url:

`&without_term_id=17&without_term_value_id=19`

This will apply a normally hidden filter, removing observations with the "Dead" attribute!

An example: `https://www.inaturalist.org/observations?taxon_id=42076&without_term_id=17&without_term_value_id=19`
