# Taxtds


## Config vars (Environment ariables) needed/used/required in the project

<br>

| Name | | Description |
| :---: | :---: | :---: |
| GMAIL_PASSWORD | : | (Taxtds gmail's password to send automated emails) |
| GMAIL_USERNAME | : | (Taxtds gmail's username to send automated emails) |

{ Suppose the gmail address is &nbsp; "abc123@gmail.com", &nbsp; then the username is &nbsp; "abc123" &nbsp; (that is everything except the &nbsp; @gmail.com &nbsp;) }


<br>

|  | |   |
| :---: | :---: |:---: |
| SESSION_SECRET | : | (A long random string to be set as a session secret for persistent login) |

<br>
<br>


```
The below credentials belong to the mongodb database, these credentials would be found while setting a cluster in the mongodb database
```

|  | |   |
| :---: | :---: |:---: |
| DB_USERNAME | : | (Username of the admin of the database) |
| DB_PASSWORD | : | (Password of the admin of the database) | 
| DATABASE | : | (Name of the database) |


<br>
<br>

```
The below data belong to owner of the Taxtds (and should be kept secret)
```


|  | |   |
| :---: | :---: |:---: |
| ADMIN_EMAIL | : | (Personal (and working) email address of taxtds in which he/she will get quotes emails) |
| ADMIN_USERNAME | : | (Username for admin to login in the taxtds website) | 
| ADMIN_PASSWORD | : | (Password for admin to login in the taxtds website) |

<br>
<br>

```
The below data is for uploading the compressed images to cloudinary for easier and bulk storage. All of it would be found in the (https://cloudinary.com/)[https://cloudinary.com/] dashboard after making an account there.
```

|  | |   |
| :---: | :---: |:---: |
| CLOUDINARY_CLOUD_NAME | : | (cloudinary cloud name) |
| CLOUDINARY_API_KEY | : | (Cloudinary api key) |
| CLOUDINARY_API_SECRET | : | (cloudinary api secret) |

<br>

```
#Read the lines 33 - 38 in the file 'routes/forgotPassword.js' 
and update the link using the instructions given there. 

This is an important step and if not done correctly, 
users would not be able to get their reset link 
in case they forget the password.
```
