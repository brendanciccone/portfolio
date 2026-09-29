/*
 * The "Currently" section of the about page: what I'm listening to and reading.
 *
 * To update an entry:
 *   1. Drop the new cover into assets/about/albums/ or assets/about/books/,
 *      named after the album or book (e.g. slaughterhouse-five.webp).
 *   2. Import it below and edit the entry. Delete the old cover file.
 *
 * Cover art is imported rather than referenced from public/ so Next
 * content-hashes each file into /_next/static/media/. The hash changes with the
 * bytes, so swapping in new artwork changes the URL and busts every cache by
 * itself. Under public/ the path never changes, and the week-long
 * Cache-Control in public/_headers would serve the old cover to anyone who had
 * already loaded this page.
 */
import thisMirrorWeighsATonCover from "@/assets/about/albums/this-mirror-weighs-a-ton.webp"
import onAveryIslandCover from "@/assets/about/albums/on-avery-island.webp"
import lifeInSmallSpacesCover from "@/assets/about/albums/life-in-small-spaces.webp"
import greatestHitsVol2Cover from "@/assets/about/albums/greatest-hits-vol-2.webp"
import slaughterhouseFiveCover from "@/assets/about/books/slaughterhouse-five.webp"

export const albums = [
  {
    name: "This Mirror Weighs a Ton",
    artist: "Interpol",
    cover: thisMirrorWeighsATonCover,
    url: "https://music.apple.com/us/album/this-mirror-weighs-a-ton/6768694728",
  },
  {
    name: "On Avery Island",
    artist: "Neutral Milk Hotel",
    cover: onAveryIslandCover,
    url: "https://music.apple.com/us/album/on-avery-island/1839074660",
  },
  {
    name: "Life in Small Spaces",
    artist: "Black Marble",
    cover: lifeInSmallSpacesCover,
    url: "https://music.apple.com/us/album/life-in-small-spaces/6768450506",
  },
  {
    name: "Greatest Hits, Vol. 2",
    artist: "Ovlov",
    cover: greatestHitsVol2Cover,
    url: "https://music.apple.com/us/album/greatest-hits-vol-2/1438672380",
  },
]

export const books = [
  {
    name: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    cover: slaughterhouseFiveCover,
    url: "https://bookshop.org/p/books/slaughterhouse-five-kurt-vonnegut/7b7d29ee40b5ce15?ean=9780440180296",
  },
]
