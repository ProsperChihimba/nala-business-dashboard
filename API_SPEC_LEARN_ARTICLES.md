# 📚 Learn Articles API Specification

## Endpoint: Create Learn Article

### **POST** `/api/learn/articles/` (or `/api/articles/` - confirm with backend)

---

## 📋 Request Body Structure

### **Required Fields:**
- `title` (string) - Article title
- `description` (string) - Brief description/summary of the article
- `content` (string) - Full article content
- `author` or `doctor` (integer) - Doctor/author ID who created the article

### **Optional Fields:**
- `tags` (array of strings) - Array of tag names
- `image_url` or `imageUrl` (string) - URL to article image

---

## 📝 Example Request Body

### **Basic Request (Minimum Required Fields):**
```json
{
  "title": "Why Vegetarians Will Live Longer?",
  "description": "Lower risk of chronic diseases, Healthier body weight, Lower intake of saturated fat...",
  "content": "Full article content here with detailed information about vegetarian diets and their health benefits...",
  "doctor": 7
}
```

### **Complete Request (With All Optional Fields):**
```json
{
  "title": "Why Vegetarians Will Live Longer?",
  "description": "Lower risk of chronic diseases, Healthier body weight, Lower intake of saturated fat, Lower risk of chronic diseases, Healthier body weight, Lower intake of saturated fat......",
  "content": "Full article content here with detailed information about vegetarian diets and their health benefits. This article explores the scientific evidence behind vegetarian diets and longevity...",
  "doctor": 7,
  "tags": ["Disease", "Vegetarians", "Health", "Nutrition"],
  "image_url": "https://example.com/images/vegetarian-article.jpg"
}
```

---

## 🔄 Expected Response

### **Success Response (201 Created):**
```json
{
  "id": 1,
  "title": "Why Vegetarians Will Live Longer?",
  "description": "Lower risk of chronic diseases...",
  "content": "Full article content here...",
  "tags": ["Disease", "Vegetarians"],
  "image_url": "https://example.com/images/vegetarian-article.jpg",
  "author": {
    "id": 7,
    "first_name": "Dr. John",
    "last_name": "Smith",
    "specialization": "Cardiology"
  },
  "created_at": "2025-01-15T10:30:00.000000Z",
  "updated_at": "2025-01-15T10:30:00.000000Z",
  "is_published": true
}
```

### **Error Response (400 Bad Request):**
```json
{
  "error": "Validation Error",
  "message": "Title, description, and content are required fields",
  "errors": {
    "title": ["This field is required."],
    "description": ["This field is required."],
    "content": ["This field is required."]
  }
}
```

---

## 📊 Field Details

| Field | Type | Required | Description | Max Length |
|-------|------|----------|-------------|------------|
| `title` | string | ✅ Yes | Article title | 200 characters |
| `description` | string | ✅ Yes | Article description/summary | 500 characters |
| `content` | string | ✅ Yes | Full article content | 50000 characters |
| `doctor` | integer | ✅ Yes | Doctor/author ID | - |
| `tags` | array[string] | ❌ No | Array of tag strings | - |
| `image_url` | string | ❌ No | URL to article image | - |

---

## 🔐 Authentication

- **Required**: Yes
- **Method**: Token Authentication
- **Header**: `Authorization: Token <token>`
- **Content-Type**: `application/json`

---

## 📥 Frontend Implementation

The frontend will send this data structure:

```typescript
{
  title: string,        // Required
  description: string,  // Required
  content: string,      // Required
  tags: string[],      // Optional (empty array if none)
  imageUrl: string,     // Optional (empty string if none)
  doctor: number       // Will be added from auth context
}
```

**Note**: The `doctor` field will be automatically added from the authenticated doctor's ID in the frontend before sending the request.

---

## 🎯 Additional Endpoints Needed

### **1. Get All Articles**
```
GET /api/learn/articles/
GET /api/learn/articles/?doctor=7
GET /api/learn/articles/?tags=Disease,Vegetarians
```

**Response:**
```json
{
  "count": 10,
  "next": "http://api.example.com/api/learn/articles/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Why Vegetarians Will Live Longer?",
      "description": "...",
      "content": "...",
      "tags": ["Disease", "Vegetarians"],
      "image_url": "...",
      "author": {...},
      "created_at": "2025-01-15T10:30:00.000000Z"
    }
  ]
}
```

### **2. Get Single Article**
```
GET /api/learn/articles/{id}/
```

### **3. Update Article**
```
PUT /api/learn/articles/{id}/
PATCH /api/learn/articles/{id}/
```

### **4. Delete Article**
```
DELETE /api/learn/articles/{id}/
```

---

## ✅ Validation Rules

1. **Title**: Required, max 200 characters
2. **Description**: Required, max 500 characters
3. **Content**: Required, max 50000 characters
4. **Tags**: Optional array, each tag should be a string
5. **Image URL**: Optional, should be a valid URL format
6. **Doctor**: Required, must be a valid doctor ID

---

## 🔗 Base URL
```
https://levelsprotech3.pythonanywhere.com/api/learn/articles/
```

