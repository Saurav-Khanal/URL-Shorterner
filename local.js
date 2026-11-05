require("node:dns").setServers(["8.8.8.8", "8.8.4.4"]);

const app = require("./server");

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});