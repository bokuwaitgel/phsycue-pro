export default () => ({
    service_name: process.env.SERVICE_NAME,
    port: parseInt(process.env.PORT, 10) || 3000,
    database_uri: process.env.DATABASE_URI,
    secret_key: process.env.SECRETKEY,
    expires_in_access: process.env.EXPIRESINACCESS,
    expires_in_refresh: process.env.EXPIRESINREFRSH,
    sms_serivce_uri: process.env.SMS_SERVICE_URI
})