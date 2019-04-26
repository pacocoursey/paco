import React from 'react';
import markdown from 'markdown-in-js';

import MarkdownPost from '../../components/MarkdownPost';
import Image from '../../components/Image';
import CLI from '../../components/CLI';
import Link from '../../components/Link';

const id = 'persistent-icons';

export default MarkdownPost({
  id,
})(markdown({
  img: Image,
  a: Link,
})`
  I created [Dusk](https://dusk.now.sh) to make my dock look more visually harmonious. [LiteIcon](https://freemacsoft.net/liteicon/) does a great job of automating the icon changing process, but every time I opened Discord, the dock icon reverted back to default. Not cool.

  <div>
    ${<Image
      src={`/static/blog/${id}/dock-1.png`}
      alt="Original Discord Icon in Dock"
      height={188 / 2}
      width={1248 / 2}
    />}
  </div>

  It happens to other Electron applications (Hyper, VSCode) over time. Even Safari reverts back occasionally. It's frustratingly ugly. Let's fix it.

  Find the application in Finder and right click to "Show Package Contents".

  <div>
    ${<Image
      src={`/static/blog/${id}/show.png`}
      alt="Show Package Contents on Discord.app"
      height={992 / 2}
      width={1654 / 2}
    />}
  </div>

  Navigate to \`Contents/Resources/\`. Here, \`electron.icns\` is the culprit. Let's replace it with our custom icon.

  <div>
    ${<Image
      src={`/static/blog/${id}/icns.png`}
      alt="electron.icns in Contents/Resources Folder"
      height={1022 / 2}
      width={1654 / 2}
    />}
  </div>

  We'll need to convert our custom \`.png\` icon from Dusk (or anywhere else) to an \`.icns\` file. MacOS ships with the command line tool \`sips\` to help with this.

  Run the following from the command line, replacing ICON as needed.


  <div>
    ${<CLI>sips -s format icns ICON.png --out ICON.icns</CLI>}
  </div>

  Move your new \`.icns\` file into the previously opened \`Resources/\` folder. I like to save the old icon by renaming it, just in case I have to revert later. Rename your new file to match the old (in this case, \`electron.icns\`).

  <div>
    ${<Image
      src={`/static/blog/${id}/fixed-icns.png`}
      alt="New electron.icns File"
      height={1096 / 2}
      width={1764 / 2}
    />}
  </div>

  Restart the app, and your custom application icon should persist!

  <div>
    ${<Image
      src={`/static/blog/${id}/dock-2.png`}
      alt="A Beautiful Dock"
      caption="Much better."
      height={188 / 2}
      width={1248 / 2}
    />}
  </div>
`);
