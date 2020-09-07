---
title: Persistent Custom App Icons
description: Make your custom macOS application icons persistent across app restarts.
slug: persistent-icons
date: March 30, 2019
---

I created [Dusk](https://dusk.now.sh) to make my dock look more visually harmonious. [LiteIcon](https://freemacsoft.net/liteicon/) does a great job of automating the icon changing process, but every time I opened Discord, the dock icon reverted back to default. Not cool.

![Original Discord Icon in Dock](https://paco.sh/blog/persistent-icons/dock-1.png)

It happens to other Electron applications (Hyper, VSCode) over time. Even Safari reverts back occasionally. It's frustratingly ugly. Let's fix it.

Find the application in Finder and right click to "Show Package Contents".

![Show Package Contents on Discord.app](https://paco.sh/blog/persistent-icons/show.png)


Navigate to `Contents/Resources/`. Here, `electron.icns` is the culprit. Let's replace it with our custom icon.

![electron.icns in Contents/Resources Folder](https://paco.sh/blog/persistent-icons/icns.png)

We'll need to convert our custom `.png` icon from Dusk (or anywhere else) to an `.icns` file. MacOS ships with the command line tool `sips` to help with this.

Run the following from the command line, replacing ICON as needed.

```bash
sips -s format icns ICON.png --out ICON.icns
```

Move your new `.icns` file into the previously opened `Resources/` folder. I like to save the old icon by renaming it, just in case I have to revert later. Rename your new file to match the old (in this case, `electron.icns`).

![New electron.icns File](https://paco.sh/blog/persistent-icons/fixed-icns.png)

Restart the app, and your custom application icon should persist!

![Much better](https://paco.sh/blog/persistent-icons/dock-2.png)
