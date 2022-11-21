const admin = require('firebase-admin')
require('dotenv').config()

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id:
      process.env.NODE_ENV === 'production'
        ? JSON.parse(process.env.PROJECT_ID)
        : process.env.PROJECT_ID,
    private_key_id:
      process.env.NODE_ENV === 'production'
        ? JSON.parse(process.env.PRIVATE_ID_KEY)
        : process.env.PRIVATE_ID_KEY,
    private_key:
      process.env.NODE_ENV === 'production'
        ? JSON.parse(process.env.PRIVATE_KEY)
        : process.env.PRIVATE_KEY,
    client_email:
      process.env.NODE_ENV === 'production'
        ? JSON.parse(process.env.CLIENT_EMAIL)
        : process.env.CLIENT_EMAIL,
    client_id:
      process.env.NODE_ENV === 'production'
        ? JSON.parse(process.env.CLIENT_ID)
        : process.env.CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      process.env.NODE_ENV === 'production'
        ? JSON.parse(process.env.CLIENT_X509_CERT_URL)
        : process.env.CLIENT_X509_CERT_URL,
  }),
})

module.exports = admin
