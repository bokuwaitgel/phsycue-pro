export default () => ({
    service_name: process.env.SERVICE_NAME,
    port: parseInt(process.env.PORT, 10) || 3000,
    database_uri: process.env.DATABASE_URI,
    auth_service: {
        uri: process.env.AUTH_SERVICE_URL,
        prefix: process.env.AUTH_SERVICE_PREFIX,
    },
    content_service: {
        uri: process.env.CONTENT_SERVICE_URL,
        prefix: process.env.CONTENT_SERVICE_PREFIX,
    },
    course_service: {
        uri: process.env.COURSE_SERVICE_URL,
        prefix: process.env.COURSE_SERVICE_PREFIX,
    },
    personal_service: {
        uri: process.env.PERSONAL_SERVICE_URL,
        prefix: process.env.PERSONAL_SERVICE_PREFIX,
    },

})