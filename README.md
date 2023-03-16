# Blog app microservices 

This is a small application in microservices.

Initial goal is create the logic of microservices.

There are 3 services. Structure of folders.

```bash
microservices-apps/
├── client/
├── comments/
├── posts/
└── README.md
```
## API structure

#### Frontend
**client/**

actions -> 
    Create a Post
    Display Post
    Comment a Post
    Display a Post

/api
    Here exists api for all

/reducers
    fetch_reducer = for handle the state

/tree for (jsx)
    PostList
        BlogCard
            CreateCommentCard

#### Backend
**comments/**

**posts/**

