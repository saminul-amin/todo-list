// server.js
const WebSocket = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let tasks = {
  'todo': [],
  'inProgress': [],
  'done': []
};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.action) {
      case 'addTask':
        const newTask = { id: uuidv4(), content: data.content };
        tasks[data.category].push(newTask);
        break;
      case 'editTask':
        const categoryTasks = tasks[data.category];
        const taskIndex = categoryTasks.findIndex(task => task.id === data.id);
        if (taskIndex !== -1) {
          categoryTasks[taskIndex].content = data.newContent;
        }
        break;
      case 'deleteTask':
        tasks[data.category] = tasks[data.category].filter(task => task.id !== data.id);
        break;
      case 'reorderTasks':
        tasks[data.category] = data.tasks;
        break;
    }
    // Broadcast updated tasks to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(tasks));
      }
    });
  });

  // Send current tasks to newly connected client
  ws.send(JSON.stringify(tasks));
});

server.listen(8080, () => {
  console.log('WebSocket server started on port 8080');
});