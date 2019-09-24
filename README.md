# Back-End

API for Use My Tech Stuff

# Endpoints

## Register

`https://tech-stuff.herokuapp.com/api/auth/register`

**Type of Request:** POST

## All fields are required: `first_name, last_name, email, password, renter (boolean), owner(boolean)`

## Login

`https://tech-stuff.herokuapp.com/api/auth/login`

**Type of Request:** POST

email and password required to login

returns `JSON Web Token`. This will need to be sent with all requests (except registering and login)

## Get Logged In User's Info

`https://tech-stuff.herokuapp.com/api/users/`

**Type of Request:** GET

return example:

```javascript
{
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'test@test.com',
  renter: 1,
  owner: 0
}
```

## Update User

`https://tech-stuff.herokuapp.com/api/users/id`

**Type of Request:** PUT

_all fields of object will be required like when registering (excluding password), even if unchanged._

## Get Ads By User

`https://tech-stuff.herokuapp.com/api/users/id/ads`

**Type of Request:** GET

provide the user id in your request where url contains `id`.

ex: `https://tech-stuff.herokuapp.com/api/users/3/ads` ... will request all ads for user with id of 3

returns a list of ads created by that user

## GET all Ads

**Type of Request:** GET

`https://tech-stuff.herokuapp.com/api/ads`

## GET Ad by Ad ID

**Type of Request:** GET

`https://tech-stuff.herokuapp.com/api/ads/1`

## POST Ad by USER ID

**Type of Request:** POST

`https://tech-stuff.herokuapp.com/api/ads/user/1`

## Update Ad by USER ID and Ad ID

**Type of Request:** PUT

`https://tech-stuff.herokuapp.com/api/ads/user/1/update/1`

## Delete Ad by USER ID and Ad ID

**Type of Request:** DELETE

`https://tech-stuff.herokuapp.com/api/ads/user/1/delete/1`
