You can check out a live demo of the app on https://iotp-dashboard.vercel.app/api/auth/signin?callbackUrl=%2F . It is hosted on vercel.

Steps to to run the code,

1) make sure you have npm installed or equivalent. Visit https://nodejs.org/en/ for more information if you do not have it installed.

2) clone this repositry or download the zip file

3) type in npm install at the root directory

4) Add a env file to the root directory of the file

5) go to auth0 website https://auth0.com/ and create a new application

6) add in an env file at the root directory of the project and add this in:<br/>
AUTH0_CLIENT_ID = (id here)<br/>
AUTH0_CLIENT_SECRET = (secrety here)<br/>
AUTH0_ISSUER = (issuer address here)<br/>
NEXTAUTH_URL = (your website host address)<br/>

For more information I have found this website that explain the process of using Nextjs, Next-Auth and Auth0 pretty well https://javascript.plainenglish.io/how-to-authenticate-users-with-auth0-in-next-auth-9c1160ce48a8 .

Happy coding!
