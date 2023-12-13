# API Documentation

## Vans Controller

### List All Vans (No Authentication)

- **Endpoint**: `/vans/all`
- **Method**: `GET`
- **Query Parameters**:
  - `take` (optional): Number of vans to take.
  - `skip` (optional): Number of vans to skip.
- **Response**: Array of `VanResponse` objects.

### Get Van by ID (Authentication Required)

- **Endpoint**: `/vans/van/:vanId`
- **Method**: `GET`
- **Authentication**: User must have the role of `CONSUMER` or `HOST`.
- **Guards**: `UserGuard`
- **Interceptors**: `TokenInterceptor`
- **Parameters**:
  - `vanId`: ID of the van.
- **Response**: Van details.

### Rent a Van (Consumer Only)

- **Endpoint**: `/vans/van/rent/:vanId`
- **Method**: `PUT`
- **Authentication**: User must have the role of `CONSUMER`.
- **Guards**: `UserGuard`
- **Parameters**:
  - `vanId`: ID of the van.
- **Response**: No content.

### Release a Van (Host Only)

- **Endpoint**: `/vans/van/release/:vanId`
- **Method**: `PUT`
- **Authentication**: User must have the role of `HOST`.
- **Guards**: `UserGuard`
- **Interceptors**: `TokenInterceptor`
- **Parameters**:
  - `vanId`: ID of the van.
- **Response**: No content.

### List Host Vans (Host Only)

- **Endpoint**: `/vans/host-vans`
- **Method**: `GET`
- **Authentication**: User must have the role of `HOST`.
- **Guards**: `UserGuard`
- **Interceptors**: `TokenInterceptor`
- **Response**: Array of `Van` objects.

### Add a Van (Host Only)

- **Endpoint**: `/vans/add`
- **Method**: `POST`
- **Authentication**: User must have the role of `HOST`.
- **Guards**: `UserGuard`
- **Interceptors**: `TokenInterceptor`
- **Body**: `AddVanDto` object.
- **Response**: Van details.

### Update a Van (Host Only)

- **Endpoint**: `/vans/update/:vanId`
- **Method**: `PUT`
- **Authentication**: User must have the role of `HOST`.
- **Guards**: `UserGuard`
- **Interceptors**: `TokenInterceptor`
- **Parameters**:
  - `vanId`: ID of the van.
- **Body**: `UpdateVanDto` object.
- **Response**: Updated van details.

### Delete a Van (Host Only)

- **Endpoint**: `/vans/delete/:vanId`
- **Method**: `DELETE`
- **Authentication**: User must have the role of `HOST`.
- **Guards**: `UserGuard`
- **Interceptors**: `TokenInterceptor`
- **Parameters**:
  - `vanId`: ID of the van.
- **Response**: `true` if deletion is successful, `false` otherwise.

## User Controller

### Signup User (No Authentication)

- **Endpoint**: `/user/signup`
- **Method**: `POST`
- **Body**: `UserSignupDto` object.
- **Response**: User details.

### Signin User (No Authentication)

- **Endpoint**: `/user/signin`
- **Method**: `POST`
- **Body**: `UserSigninDto` object.
- **Response**: Token.

### Get User Information (Authentication Required)

- **Endpoint**: `/user/info`
- **Method**: `GET`
- **Authentication**: User must have the role of `CONSUMER` or `HOST`.
- **Guards**: `UserGuard`
- **Interceptors**: `TokenInterceptor`
- **Response**: User details.
