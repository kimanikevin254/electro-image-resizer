const { app, BrowserWindow, Menu } = require('electron')
const path  = require('path')

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })

const isMac = process.platform === 'darwin';

const isDev = process.env.NODE_ENV !== 'production'

// create main window
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        height: 600,
        width: isDev ? 1000: 500
    })

    // open dev tools if in dev env
    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

// create about window
function createAboutWindow(){
    const aboutWindow = new BrowserWindow({
        title: "About Image Resizer",
        height: 300,
        width: isDev ? 1000: 500
    })

    // open dev tools if in dev env
    if(isDev){
        aboutWindow.webContents.openDevTools();
    }

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'))
}

// App is ready
app.whenReady().then(() => {
    createMainWindow()

    // implement menu
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
      })
})

// Menu template
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            }
        ]
    }] : []),
    {
        role: 'fileMenu'
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    }] : [])
]

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })