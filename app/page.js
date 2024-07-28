'use client';

import { EventType, PublicClientApplication } from '@azure/msal-browser';
import {msalConfig } from './authConfig';

import { MsalProvider } from '@azure/msal-react';
import Login from './login/page';



export default function Home() {

//-----------------------------------------------------------------------------------------
// AUTH CODE
//-----------------------------------------------------------------------------------------

const msalInstance = new PublicClientApplication(msalConfig);

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if ((event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || event.eventType === EventType.SSO_SILENT_SUCCESS) && event.payload.account) 
    {
      msalInstance.setActiveAccount(event.payload.account);
    }
});
//-----------------------------------------------------------------------------------------
// AUTH CODE END
//-----------------------------------------------------------------------------------------



   return (
    <MsalProvider instance={msalInstance}>
      <Login />
    </MsalProvider>
   )

}
