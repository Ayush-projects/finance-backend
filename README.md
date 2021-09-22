# E-POTLI
(Project description)

## Base URL

https://ewallet-server.herokuapp.com
    
    
# API Documentation
The REST API to E-POTLI is described below :

## Create Wallet

### Request

__Action  :__   Create Wallet

__Method  :__   POST

__URL     :__   https://ewallet-server.herokuapp.com/createWallet

__Body    :__
  
    xyz
    

### Response

#### Case 1: Wallet created Successfully
Response:



#### Case 2: Either of the fields missing in POST request
Response:

#### Case 3: User registering again with same email id
Response: 
 
#### Case 4: Some server side error occurred
Response: 



## Login

### Request

__Action  :__   Login

__Method  :__   POST

__URL     :__   https://ewallet-server.herokuapp.com/login

__Body    :__
  
    xyz
    

### Responses



> **_NOTE  :_** **After successfully login the response header will contain a cookie named as “jwt” which contains a json web token that is needed to be sent in each one of the following requests and that will serve the purpose of authentication before accessing each one of the protected route.**


## Logout

### Request

__Action  :__   Logout

__Method  :__   GET

__URL     :__   https://ewallet-server.herokuapp.com/signout


> **_NOTE  :_** **Request with the jwt token as cookies and in response the server will clear the cookie “jwt”**


