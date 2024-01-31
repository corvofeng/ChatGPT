// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 菜单栏模板
  const menuBar = [
    {
      label: '文件',
      submenu: [
        { label: '打开' },
        { label: '保存' },
        { label: '退出' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        { label: '访问官网' },
        { label: '关于' }
      ]
    }
  ];

  // 构建菜单项
  const menu = Menu.buildFromTemplate(menuBar);
  // 设置一个顶部菜单栏
  Menu.setApplicationMenu(menu);

  // Menu.setApplicationMenu(null)

  mainWindow.webContents.session
    .setProxy({
      // proxyRules:"socks5://54.248.22.243:1080",
      // proxyRules:"http://127.0.0.1:1080",
    }).then(() => {
      mainWindow.loadURL('https://chat.openai.com/');
    }).catch((err) => console.error(err));

  // mainWindow.webContents.session.setProxy({ proxyRules: "socks5://54.248.22.243:1080" }, function () {
  //   // mainWindow.loadURL('https://whatismyipaddress.com/');
  //   mainWindow.loadURL("https://chat.openai.com/")
  // });
  // mainWindowloadURL(url.format({
  //     pathname: path.join(__dirname, 'index.html'),
  //     protocol: 'file:',
  //     slashes: true
  // }))

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
