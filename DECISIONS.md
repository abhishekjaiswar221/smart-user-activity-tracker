# Technical Decisions

This document explains the technical decisions and implementation strategies used in the Smart User Activity Tracker System.

---

# 1. Why MongoDB?

MongoDB was chosen because:

- Flexible schema for activity logs
- Easy storage of dynamic metadata objects
- Strong aggregation framework
- Fast prototyping for analytics systems

The `meta` field allows storing custom action-related data without changing the schema frequently.

---

# 2. Why JWT Authentication?

JWT authentication was selected because:

- Stateless authentication
- Easy frontend integration
- Suitable for REST APIs
- Scalable for distributed systems

JWT tokens are verified through middleware for protected routes.

---

# 3. Activity Logging Design

Each activity stores:

- userId
- action
- metadata
- IP address
- timestamp

This structure enables:

- analytics
- auditing
- suspicious activity detection
- replay attack prevention

---

# 4. Replay Protection Strategy

Replay protection was implemented using two checks:

## Time Difference Validation

Reject requests if:

```txt
|clientTime - serverTime| > 30 seconds
```

This prevents delayed or manipulated requests.

---

## Duplicate Action Validation

Reject requests if the same user performs the same action within 3 seconds.

This prevents:

- spam requests
- duplicate submissions
- replay attacks

---

# 5. Custom Rate Limiting Logic

Instead of using external libraries, custom MongoDB queries were implemented.

Rule:

```txt
Reject if more than 5 actions occur within 10 seconds
```

This demonstrates backend logic implementation and aggregation understanding.

---

# 6. Suspicious Activity Detection

Two detection strategies were implemented:

## High Frequency Detection

Users sending:

```txt
> 20 actions in 1 minute
```

are flagged.

---

## Multiple IP Detection

Users using:

```txt
> 2 IP addresses in 5 minutes
```

are flagged.

This helps detect:

- bot activity
- account sharing
- automated abuse

---

# 7. Analytics API Design

MongoDB aggregation pipelines were used for:

- total actions
- most common action
- actions per minute
- most active user

Aggregation was chosen because:

- efficient server-side computation
- reduced frontend processing
- scalable analytics handling

---

# 8. Frontend Architecture

React was selected because:

- component reusability
- fast UI updates
- easy API integration
- modern ecosystem

Frontend is divided into:

- pages
- api layer
- reusable components

---

# 9. Styling Decisions

Tailwind CSS was used because:

- rapid UI development
- responsive utilities
- consistent styling
- reduced CSS boilerplate

---

# 10. Security Considerations

Implemented:

- JWT validation
- replay protection
- custom rate limiting
- IP tracking
