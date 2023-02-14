# Initial Setup
Before the service is run please make a copy of the `.env.default` file and rename it to `.env`. Feel free to change any of the configurations you'd like.

## Making use of the optimized thumbnails
The thumbnail generation algorithm is currently making use of gm (GraphicsMagick). In order to use this functionality you need two things

1. Install gm on your local OS
2. Set the `GENERATE_THUMBNAILS` to `true` in the `.env` configuration file.

## Installing gm locally

* Using macOS `brew install graphicsmagick`
* Using Debian `sudo apt install gm`
* Using Windows - Download from [here](https://sourceforge.net/projects/graphicsmagick/files/)