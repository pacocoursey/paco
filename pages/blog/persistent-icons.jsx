import React from 'react';
import markdown from 'markdown-in-js';
import bash from 'highlight.js/lib/languages/bash';

import MarkdownPost from '../../components/MarkdownPost';
import Code from '../../components/Code';
import Image from '../../components/Image';

const id = 'persistent-icons';

export default MarkdownPost({
  id,
})(markdown({
  img: Image,
})`
  I created <a href="https://dusk.now.sh" className="inline">Dusk</a> to make my dock look more visually harmonious. <a href="https://freemacsoft.net/liteicon/" className="inline">LiteIcon</a> does a great job of automating the icon changing process, but every time I opened Discord, the dock icon reverted back to default. Not cool.

  ${<Image src={`/static/blog/${id}/dock-1.png`} alt="Original Discord Icon in Dock" />}

  It happens to other Electron applications (Hyper, VSCode) over time. Even Safari reverts back occasionally. It's frustratingly ugly. Let's fix it.

  Find the application in Finder and right click to "Show Package Contents".

  ${<Image
    src={`/static/blog/${id}/show.png`}
    alt="Show Package Contents on Discord.app"
  />}

  Navigate to \`Contents/Resources/\`. Here, \`electron.icns\` is the culprit. Let's replace it with our custom icon.

  ${<Image
    src={`/static/blog/${id}/icns.png`}
    alt="electron.icns in Contents/Resources Folder"
  />}

  We'll need to convert our custom \`.png\` icon from Dusk (or anywhere else) to an \`.icns\` file. MacOS ships with the command line tool \`sips\` to help with this.

  Run the following from the command line, replacing ICON as needed.

  <div>
  ${
    <Code language="bash" syntax={bash}>
      {'sips -s format icns ICON.png --out ICON.icns'}
    </Code>}
  </div>

  Move your new \`.icns\` file into the previously opened \`Resources/\` folder. I like to save the old icon by renaming it, just in case I have to revert later. Rename your new file to match the old (in this case, \`electron.icns\`).

  ${<Image
    src={`/static/blog/${id}/fixed-icns.png`}
    alt="New electron.icns File"
  />}

  Restart the app, and your custom application icon should persist!

  ${<Image
    src={`/static/blog/${id}/dock-2.png`}
    alt="A Beautiful Dock"
    caption="Much better."
  />}
`);
