# TravelersDream
ReactJS+PHP
# Preview
![](https://i.imgur.com/jHmc8K9.png)
# Backend API
## • login
  ### Parameters
  | Name | Type |
  | - | - |
  | login | string |
  | password | string |
  ### Returns
  | Name | Type |
  | - | - |
  | success | bool |
  | data | json |
## • isUser
  ### Parameters
  | Name | Type |
  | - | - |
  | token | string |
  ### Returns
  | Name | Type |
  | - | - |
  | success | bool |
## • getUserName
  ### Parameters
  | Name | Type |
  | - | - |
  | token | string |
  ### Returns
  | Name | Type |
  | - | - |
  | success | bool |
  | username | string |
## • getUserType
  ### Parameters
  | Name | Type |
  | - | - |
  | token | string |
  ### Returns
  | Name | Type |
  | - | - |
  | success | bool |
  | type | int |
## • getUserInfo
  ### Parameters
  | Name | Type | Description |
  | - | - | - |
  | token | string |  |
  | keys | array | Keys: "id", "token", "name", "login", "password", "type", "picture" |
  ### Returns
  | Name | Type |
  | - | - |
  | success | bool |
  | data | json |
## • getEmployees
  ### Parameters
  | Name | Type |
  | - | - |
  | token | string |
  ### Returns
  | Name | Type | Description |
  | - | - | - |
  | success | bool |  |
  | data | json | users: {id: int, name: string, type: int, picture: string} |
## • getTypes
  ### Parameters
  | Name | Type |
  | - | - |
  | token | string |
  ### Returns
  | Name | Type | Description |
  | - | - | - |
  | success | bool |  |
  | data | json | types: [str] |
# Frontend API
## • request
  ### Parameters
  | Name | Type |
  | - | - |
  | method | string |
  | data | json |
  ### Returns
  | Name | Type | Description |
  | - | - | - |
  | success | bool |  |
  | data | json | {success: true, data: {}} or {success: false, error: true, err} |
