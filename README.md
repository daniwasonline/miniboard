# Miniboard
A program written in Node.js using the Electron framework to display the weather, the time, and the date. It also allows you to use the version of YouTube used on Smart TVs (not to be confused with YouTube TV, the subscription TV service).

## How can I use Miniboard?
**At the moment, Miniboard does not have a standalone binary, but these will be made soon.**

You can download, configure, and run this in just a few steps.

#### Requirements
- [Node.js](https://nodejs.org) ([Linux installation with NVM](https://github.com/nvm-sh/nvm)
- [Electron](https://electronjs.org)
- An [OpenWeatherMap](https://openweathermap.org) API key
- (Optional) A [Last.fm API key](https://www.last.fm/api/account/create), for getting your Last.fm scrobbles (Spotify included)!

#### Main installation

1. **Download Node.js and Electron if you haven't already done so.**
You can install Node for Linux and macOS [here, following the instructions](https://github.com/nvm-sh/nvm), or you can install it on Windows [here](https://nodejs.org).

2. **Install Electron using the following command**:

``npm i -g electron``

3. **Clone the repository like so, then cd into the directory:**

``git clone https://github.com/Dannnington/miniboard``

``cd miniboard``

4. **Download dependencies:**

``npm install``

5. **Run the app!**

``electron ./main.js``

## What's the inspiration for this project? Was this forked?
The original purpose of Miniboard was to have a little dashboard running on my Raspberry Pi (even though I already have my own Android TV in my room). This inspiration also ties in with if this was based off some other project. **Miniboard is based on a little [project](https://github.com/SmatMan/personal_dashboard) that one of my best mates created**, but while his dashboard is a **webserver written in Python**'s Flask engine, Miniboard is a **standalone Electron app** (albeit not compiled into a binary). The frontend UI is mostly similar, too, and Miniboard has some things that my friend's dashboard does not have (and vice versa).

#### Should I use Miniboard or this other dashboard?
It's personal preference, really. If you need/want a dashboard that can be installed on a computer, use Miniboard. If you need a webserver and/or a dashboard that can be used with a standard browser, go with [the personal dashboard](https://github.com/SmatMan/personal_dashboard).

## PRs?
Yes. I'm accepting PRs for this project.
