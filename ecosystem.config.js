module.exports = {
    apps: [{
        name: "cipher-ui",
        script: "webpack-dev-server --port 3000 --hot --host 0.0.0.0",
        watch: true,
        env: {
            "NODE_ENV": "development",
        },
        env_production: {
            "NODE_ENV": "production"
        }
    }]
}