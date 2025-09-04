# EZ Manage -BE



## Getting started

To run a project, simply run: npm start

Lint check: npm run lint

Lint fix: npm run lint-fix

## Manual Setup

```bash
git clone https://gitlab.com/tukilogic/ez-manage-be.git
cd ez-manage-be
```

Install the dependencies:

```bash
npm install
```

## Set the environment variables:
```bash
create .env
paste .env.environment content to .env
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3100

# URL of the Mongo DB
MONGODB_URL=mongodb+srv://admin:admin@cluster0.qka7l.mongodb.net/EZmanage?retryWrites=true&w=majority

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=300
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=300
# Number of minutes after which a reset password token expires
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=100
# Number of minutes after which a verify email token expires
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=100

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USERNAME=support@arsgroup.com.au
SMTP_PASSWORD=Admin@ARS1
EMAIL_FROM=support@arsgroup.com.au


