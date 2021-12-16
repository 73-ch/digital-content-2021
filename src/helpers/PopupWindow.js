export const openPopupWindow = (url) => {
  const win = window.open(url, 'Popup Window', 
            'width=1200, height=800, top=70, left=100, resizable=1, menubar=yes', true)
  win.focus()
}