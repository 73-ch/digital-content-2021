export const openPopupWindow = (url) => {
  const win = window.open(url, 'Popup Window', 
            'width=1000, height=600, top=70, left=100, resizable=1, menubar=yes', true)
  win.focus()
}