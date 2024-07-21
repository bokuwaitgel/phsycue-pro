export default () => ({
    service_name: process.env.SERVICE_NAME,
    port: parseInt(process.env.PORT, 10) || 3000,
    database_uri: process.env.DATABASE_URI,
})