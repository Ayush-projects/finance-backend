<div align="center"> <img align="center" alt="Chords" src="https://user-images.githubusercontent.com/52379890/133371696-2488b42d-62fa-4210-b49f-9ebfea97fcd0.png" height='400' width='600'></div>

# E-POTLI
(Project description)

## Base URL

https://epotli-wallet.herokuapp.com/
    
    
# API Documentation
The REST API to E-POTLI is described below :

## Create Wallet

### Request

__Action  :__   Create Wallet

__Method  :__   POST

__URL     :__   https://epotli-wallet.herokuapp.com/createWallet

__Body    :__
  
    {
        "fname": "Ayush",
        "lname": "Addhyan",
        "email": "testing@gmail.com",
        "phone": "0123456789",
        "password": "password"
    }
    

### Response

#### Case 1: Wallet created Successfully

    {
        "code": 200,
        "message": "Wallet Created Successfully, Please check your email and verify"
    }



#### Case 2: Either of the fields missing in POST request

    Response

#### Case 3: User registering again with same email id

    {
        "code": 404,
        "message": "User already registed with the given email ID"
    }
    
#### Case 4: Some server side error occurred

    {
        "code": 404,
        "message": "Some Error Occured"
    } 



## Login

### Request

__Action  :__   Login

__Method  :__   POST

__URL     :__   https://epotli-wallet.herokuapp.com/login

__Body    :__
  
     {
        "email":"kryptonites.ju@gmail.com",
        "password": "Ayush"
    }
    

### Response

#### Case 1: Logged-in Successfully
    {
        "code": 200,
        "message": "Login Successful"
    }
    

#### Case 2: Incorrect Password
    {
        "code": 404,
        "message": "Incorrect Password"
    }



> **_NOTE  :_** **After successfully login the response header will contain a cookie named as “jwt” which contains a json web token that is needed to be sent in each one of the following requests and that will serve the purpose of authentication before accessing each one of the protected route.**


## Logout

### Request

__Action  :__   Logout

__Method  :__   GET

__URL     :__   https://epotli-wallet.herokuapp.com/signout


> **_NOTE  :_** **Request with the jwt token as cookies and in response the server will clear the cookie “jwt”**


## Get Wallet Info

### Request

__Action  :__   Get Wallet Info

__Method  :__   GET

__URL     :__   https://epotli-wallet.herokuapp.com/getInfo
  

### Response

#### Case 1 : If there is a “jwt” token stored as cookie (When successful login), it will return all the account information.

    xyz


#### Case 2 : If the token is not stored (i.e. the user is not logged in) then it will return 

    xyz


#### Case 3 : If there is some server side error it will return 

    xyz


## Get Price Index for last 10 days relative to Re.1

### Request

__Action    :__     Get Price Index for last 10 days relative to Re.1

__Method    :__     GET

__URL       :__     https://epotli-wallet.herokuapp.com/prices 
    

### Response

    xyz


