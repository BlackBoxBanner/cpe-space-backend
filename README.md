# cpe-space-backend

## API Route Design

### Authentication

- **Signin**:
  - `POST /auth/signin`
- **Signout**:
  - `POST /auth/signout`
- **Register**:
  - `POST /auth/register`
- **Change Password**:
  - `POST /auth/change-password`

### User Management

- **Get User**:
  - `GET /users/:id`
- **Update User**:
  - `PATCH /users/:id`
- **Delete User**:
  - `DELETE /users/:id`

### Announcement Management

- **Get Announcement**:
  - `GET /announcements/:id`
- **Create Announcement**:
  - `POST /announcements`
- **Update Announcement**:
  - `PATCH /announcements/:id`
- **Delete Announcement**:
  - `DELETE /announcements/:id`

### Event Management

- **Get Event**:
  - `GET /events/:id`
- **Create Event**:
  - `POST /events`
- **Update Event**:
  - `PATCH /events/:id`
- **Delete Event**:
  - `DELETE /events/:id`

### Event Participants

- **Get Event Participants**:
  - `GET /events/:id/participants`
- **Add Event Participant**:
  - `POST /events/:id/participants`
- **Remove Event Participant**:
  - `DELETE /events/:id/participants/:participantId`
