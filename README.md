# Blog app microservices 

This is a small application in microservices.

Initial goal is create the logic of microservices and after host in Kubernetes.

## STRUCTURE

```bash
blog-microservices/
├── client/
├── nginx/
├── comments/
├── posts/
├── query-posts-service/
├── kafka/
├── .env
└── README.md
```

For every service created a specific image in docker hub. Expect **nginx**.
There is a ```.env``` file where exist all configuration for ports, hosts etc. Use your specific values or let defaults.

## API structure

#### Frontend
**client/**

Client is the frontend application in which user can  
1. Create Posts
2. Display Posts
3. Comment in Posts
4. Display Post with comments


***API***

Action | HTTP request | URI | Folder/file
--- | --- | ---
*Create Posts* | `POST` | `posts` | **/src/api/posts-api.js**
*Get Posts* | `POST` | | **/src/api/posts-api.js**
*Create Comments* | `POST` | | **/src/api/posts-api.js**
*Get Comments* | `POST` | | **/src/api/posts-api.js**
*Get Posts & Comments* | `POST` | | **/src/api/posts-api.js**

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

_api:_

```http
POST http://localhost:5000/posts/:post_id/comments

GET http://localhost:5000/posts/:post_id/comments
```

_request structure:_

```js
/*
    When someone Create a comment the structure is the Following (Example)
*/
{
    id: j23, //commentId
    comment: 'My first Comment' //here there is the comment
}
```

_database:_

| ID               | Comment          |
| -----------------| -----------------|
| j23              | My first Comment |

**posts/**

_api:_

```http
POST http://localhost:4000/posts

GET http://localhost:4000/posts
```

_request structure:_

```js
/*
    When someone Create a comment the structure is the Following (Example)
*/
{
    id: 123,  //Post Id
    title: 'FirstTitle' //The Title of Post
}
```

_database:_

| ID         | Title      |
| -----------| -----------|
| 123        | FirstTitle |

**Apache Kafka**

Apache Kafka have 2 Topis:

PostCreated_topic && CommentCreated_topic

```js
When a `post/` creates the Producer sends to PostCreated_topic the following info : 

    {
        id: 123, //Post Id
        title: 'FirstTitle' //The Title of Post
    }

When a `comment/` creates the Producer sends to CommentCreated_topic the following info :

    {
        id: j23, //commentId
        comment: 'My first Comment'
        postId: 123 //Post Id
    }
```

**query-posts-service/**

When we want to fetch a post with all of its comments we query for the post in **query-posts-service/** Service.

This service accepts from Kafka topics (PostCreated, CommentCreated)

Consumers of Apache Kafka receive all the messages from Topics PostCreated && CommentCreated. So, the table for its database looks like:

_database:_

| Post_ID    | Title      | Comments                               |    
| -----------| -----------|----------------------------------------|
| 123        | FirstTitle | {id: j23, comment: 'My first Comment'} |

_api:_

```http
GET http://localhost:6000/posts
```

