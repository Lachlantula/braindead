// Reponsible for Menu Bar functionality.

import { app, Menu, shell } from 'electron'; // eslint-disable-line
import redir from './index';

// Generate template
function getMenuTemplate() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label:
            process.platform === 'darwin'
              ? 'Create New Torrent...'
              : 'Create New Torrent from Folder...',
          accelerator: 'CmdOrCtrl+N',
          // click: () => dialog.openSeedDirectory(),
        },
        {
          label: 'Open Torrent File...',
          accelerator: 'CmdOrCtrl+O',
          // click: () => dialog.openTorrentFile(),
        },
        {
          label: 'Open Torrent Address...',
          accelerator: 'CmdOrCtrl+U',
          // click: () => dialog.openTorrentAddress(),
        },
        {
          type: 'separator',
        },
        {
          label: process.platform === 'win32' ? 'Close' : 'Close Window',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo',
        },
        {
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          role: 'cut',
        },
        {
          role: 'copy',
        },
        {
          role: 'paste',
        },
        {
          role: 'delete',
        },
        {
          role: 'selectall',
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn more about Braindead',
          click: () => {
            shell.openExternal('https://lachlan.codes/Braindead');
          },
        },
        {
          label: 'Contribute on GitHub',
          click: () => {
            shell.openExternal('https://github.com/lachlantula/Braindead');
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Report an Issue...',
          click: () => {
            shell.openExternal('https://github.com/lachlantula/Braindead/issues');
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    // Add Braindead app menu (OS X)
    template.unshift({
      label: 'Braindead',
      submenu: [
        {
          label: 'About Braindead',
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          label: 'Preferences...',
          accelerator: 'Cmd+,',
          click: () => {
            redir('/preferences');
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Services',
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide Braindead',
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => app.quit(),
        },
      ],
    });

    // Add Window menu (OS X)
    template.splice(5, 0, {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          type: 'separator',
        },
        {
          label: 'Bring All to Front',
          role: 'front',
        },
      ],
    });
  }

  // On Windows and Linux, open dialogs do not support selecting both files and
  // folders and files, so add an extra menu item so there is one for each type.
  if (process.platform === 'linux' || process.platform === 'win32') {
    // File menu (Windows, Linux)
    template[0].submenu.unshift({
      label: 'Create New Torrent from File...',
    });

    // Help menu (Windows, Linux)
    template[4].submenu.push(
      {
        type: 'separator',
      },
      {
        label: 'About Braindead',
      },
    );
  }
  // Add "File > Quit" menu item so Linux distros where the system tray icon is
  // missing will have a way to quit the app.
  if (process.platform === 'linux') {
    // File menu (Linux)
    template[0].submenu.push({
      label: 'Quit',
      click: () => app.quit(),
    });
  }

  return template;
}

// Set the menu
const initMenu = () => {
  const menu = Menu.buildFromTemplate(getMenuTemplate());
  Menu.setApplicationMenu(menu);
};

// Export the menu, so that it may be imported
export default initMenu;
