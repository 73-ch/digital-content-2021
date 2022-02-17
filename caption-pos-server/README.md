## How to Use
- run `npm run calib-server`

## client example
```js
const ws = new WebSocket("ws://localhost:42331");
console.log(ws);
ws.onopen = () => {
  const data = {
    adad: "ass",
    das: "dfasdf"
  };

  ws.send(JSON.stringify({
    command: "save",
    data,
    path: "tests.json"
  }));
};
```
