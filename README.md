# Back-End

API for Use My Tech Stuff

# Endpoints

## Register

`/api/auth/register`

**Type of Request:** POST

## All fields are required: `first_name, last_name, email, password, renter (boolean), owner(boolean)`

## Login

`/api/auth/login`

**Type of Request:** POST

email and password required to login

returns `JSON Web Token`. This will need to be sent with all requests (except registering and login)

## Get Logged In User's Info

`/api/users/`

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

`api/users/id`

**Type of Request:** PUT

_all fields of object will be required like when registering (excluding password), even if unchanged._
