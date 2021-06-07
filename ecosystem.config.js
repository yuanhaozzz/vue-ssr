module.exports = {
    apps: [
        {
            // PM2 应用名称
            name: "vue-ssr-3001",
            // node 启动文件
            script: "server/server.js",
        },
    ],
    deploy: {
        // "prod" 是环境名称
        prod: {
            // 私钥目录
            key: "~/.ssh/id_rsa",
            // 登录用户
            user: "root",
            // 远程服务器
            host: ["132.232.1.48"],
            // 自动将 github 加入远程服务器的信任列表
            ssh_options: "StrictHostKeyChecking=no",
            // git 分支
            ref: "origin/master",
            // git 仓库地址（ssh）
            repo: "git@github.com:yuanhaozzz/vue-ssr",
            // 项目在远程服务器的存放路径
            path: "/root/web/vue-ssr",
            // PM2拉取最新分支后，安装 npm 包，并启动（重启）NodeJS 应用
            "post-deploy":
                "source ~/.nvm/nvm.sh && cnpm install && npm run build && pm2 startOrRestart ecosystem.config.js",
        },
    },
};

