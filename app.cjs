const fetch = require("node-fetch");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const apikey = process.env.apikey;

const apis = [
    {
        path: "/daily-rewards",
        rainyun_apiurl: "https://api.v2.rainyun.com/user/reward/tasks",
        fetch_options: {
            method: "POST",
            headers: {
                "X-Api-Key": zrRpWdjkSYYQFU0Nr5ZKXEfmXxN5iWOU,
                "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task_name: "每日签到",
            }),
            redirect: "follow",
        },
    },
];

apis.forEach((api) => {
    app.get(api.path, async (req, res) => {
        try {
            const rp = await fetch(api.rainyun_apiurl, api.fetch_options);
            const txt = await rp.text();
            console.log("Status", rp.status);
            console.log("Response", txt);
            res.status(rp.status).send(txt);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while processing the request.');
        }
    });
});

// 添加一个默认的首页路由
app.get('/', (req, res) => {
    res.send('Welcome to the Rainyun Auto Rewards Service!');
});

// 添加一个处理所有未定义路径的默认路由
app.use((req, res) => {
    res.status(404).send('This route does not exist.');
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`App started on port ${port}`);
    });
}

module.exports = app;
