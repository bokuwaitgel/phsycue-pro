export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database_uri: process.env.DATABASE_URI,
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    },
    
})