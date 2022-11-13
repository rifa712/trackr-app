const admin = require('firebase-admin')
require('dotenv').config()

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.PROJECT_ID
      ? JSON.parse(process.env.PROJECT_ID)
      : undefined,
    private_key_id: process.env.PRIVATE_ID_KEY
      ? JSON.parse(process.env.PRIVATE_ID_KEY)
      : undefined,
    private_key: process.env.PRIVATE_KEY
      ? JSON.parse(process.env.PRIVATE_KEY)
      : undefined,
    client_email: process.env.CLIENT_EMAIL
      ? JSON.parse(process.env.CLIENT_EMAIL)
      : undefined,
    client_id: process.env.CLIENT_ID
      ? JSON.parse(process.env.CLIENT_ID)
      : undefined,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
      ? JSON.parse(process.env.CLIENT_X509_CERT_URL)
      : undefined,
  }),
})

module.exports = admin
