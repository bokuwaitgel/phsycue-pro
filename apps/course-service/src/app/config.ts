export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database_uri: process.env.DATABASE_URI,
})