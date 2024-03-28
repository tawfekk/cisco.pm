import { Client, Account } from "appwrite";
import { func } from "prop-types";



export async function SignIn (){

try{            
const client = new Client()
    .setEndpoint('https://api.cisco.pm/v1')
    .setProject('cisco-pm');  
    
const account = new Account(client);

account.createOAuth2Session('oidc');

const session = await account.getSession('current');

localStorage.providerAccessToken = session.providerAccessToken


}catch(e){if(!session) {localStorage.providerAccessToken = ""}}


}
