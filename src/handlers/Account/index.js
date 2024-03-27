import { Client, Account } from "appwrite";
import { func } from "prop-types";



export async function SignIn (){

try{            
const client = new Client()
    .setEndpoint('https://api.cisco.pm/v1') // Your API Endpoint
    .setProject('cisco-pm');  // Your project ID   
    
const account = new Account(client);
//const promise = account.updateSession('current');
try{const session = await account.getSession('current');}catch(e){}

account.createOAuth2Session('oidc');

localStorage.providerAccessToken = session.providerAccessToken


}catch(e){localStorage.providerAccessToken = ""}


}
