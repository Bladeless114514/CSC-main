import { WebSocketServer } from 'ws';
// import { createServer } from 'http';

export default async function (hazel, core, hold) {
  // 冻结对象和函数的原型链
  Object.freeze(Object.prototype);
  Object.freeze(Function.prototype);

  // 尽可能简单地创建一个 HTTP 服务器
  // 暂时不上 HTTP WebSocket 混合服务器了，暂时不需要
  // hold.httpServer = createServer().listen(hazel.mainConfig.port);
  // hold.httpServer.requestTimeout = hazel.mainConfig.HTTP.requestTimeout;

  // 尽可能简单地创建一个无头 WebSocket 服务器
  // 暂时不上 HTTP WebSocket 混合服务器了，暂时不需要
  // hold.wsServer = new WebSocketServer({ noServer: true });

  // 创建一个 WebSocket 服务器
  hold.wsServer = new WebSocketServer({ port: hazel.mainConfig.port });
  // 绑定 WebSocket 服务器的事件
  hold.wsServer.on('error', (error) => { hazel.emit('error', error); });
  hold.wsServer.on('connection', (socket, request) => { hazel.runFunction('handle-connection', socket, request); });
  // hold.wsServer.on('close', () => { hazel.runFunction('handle-close'); });
  // hold.wsServer.on('headers', ( headers, request ) => { hazel.runFunction('handle-headers', headers, request); });

  // 启动定时任务，每过半点执行一次
  // 这个暂时也不用
  /* 
  setTimeout(() => {
    hazel.runFunction('hourly-tasks');
    setInterval(() => { hazel.runFunction('hourly-tasks'); }, 3600000);
  }, 3600000 - (Date.now() + 1800000) % 3600000);
  */

  // 频率限制器用
  hold.rateRecords = {};
  hold.perviousRate = 1000;
};