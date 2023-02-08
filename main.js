const { app, BrowserWindow } = require('electron')
const path  = require('path')
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
const isMac = process.platform === 'darwin';

const isDev = process.env.NODE_ENV !== 'production'

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

app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
      })
})

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })