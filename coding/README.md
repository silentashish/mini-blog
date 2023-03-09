# Coding

## Proposal for the architecture

I have built the system using the following techstack.

### Frontend:

- Programming Language: JavaScript (ES6+)
- Framework: React
- Libraries: react-query, axios, chakra-ui

### Backend:

- Programming Language: Python
- Framework: Django
- Libraries: django-rest-framework

### Database:

- Database Management System: PostgreSQL
- Library: psycopg2-binary

### Authentication:

- Library: Django Rest Framework Simple JWT

### Docker:

- Containerization: Docker
- Containerization Orchestration: Docker Compose

Explanation of the system used is as below

### Frontend:

- React is the frontend framework used to build the user interface of the mini-blog app.
- react-query is a library used for data fetching and caching. It provides hooks to manage the state of asynchronous data in the application.
- axios is a library used for making HTTP requests to the backend API.
- chakra-ui is a library used for building the UI components of the application.

### Backend:

- Django is the backend framework used to build the API endpoints and handle server-side logic.
- django-rest-framework is a library used to build RESTful APIs in Django. It provides features like serialization, authentication, and pagination.
- PostgreSQL is the database used to store the application's data.
- psycopg2-binary is a PostgreSQL database adapter for Python.
- django-redis is a library used to integrate Redis with Django.
- Django Rest Framework Simple JWT is used for authentication in the API.

## Boilerplate code

Link to boilerplate code is [here] (https://github.com/silentashish/mini-blog/tree/boilerplate)

## Development Process

- Managing Repositories:
  Using Git as the version control system and GitHub as the repository management platform is a popular and effective approach. GitHub provides features such as pull requests, code reviews, and branching strategies that can help the team manage the codebase effectively. The team should establish guidelines for creating branches, submitting pull requests, and merging changes, and ensure that everyone follows them.

- Managing the Review Process:
  GitHub's pull request feature allows for efficient code review and feedback. The team can set up guidelines for code review, such as assigning reviewers, using a checklist, and providing constructive feedback. GitHub also supports automated testing and continuous integration tools that can help ensure that the codebase is of high quality and always in a working state.

- Keeping the Quality of the Code and System:
  The team can establish coding standards and best practices and enforce them using GitHub's code analysis tools, such as GitHub Actions or third-party integrations. GitHub also provides features such as security scanning and vulnerability alerts to help ensure that the system is secure. Additionally, GitHub Projects can be used as a project management tool to track the status of tasks and issues, ensuring that the team is on track and that the system is well-architected, scalable, and of high quality.

- Keeping the Schedule on Time:
  GitHub Projects can be used as a project management tool to help the team stay on schedule. The team can break down the project into smaller, manageable tasks, establish deadlines for each task, and track progress using the Kanban board. The team can also use GitHub's built-in features such as issue tracking and milestones to ensure that the project stays on track and that any roadblocks or issues are identified and addressed promptly.
