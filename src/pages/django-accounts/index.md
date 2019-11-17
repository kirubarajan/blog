---
path: "/blog/django-accounts"
date: "2019-11-16"
title: "Django Accounts Tutorial"
tags: ['web development', 'dev']
excerpt: "Learning to Use Django's Account System"
---

# Django Accounts
> Material written for CIS 192: Python Programming at the University of Pennsylvania.

In this lecture, we dive deeper into the functionality of Django by building a simple note-taking application. However, using our knowledge from last week, this shouldn’t be too difficult. What makes this section interesting are two things:

1. Using form data to accept user input
2. Using Django’s authentication system to implement user accounts

These notes include the code (available on the course website) for you to replicate by following along these notes. 

## Project Initialization
We install Django through pip by using `pip install django`. Then, we can create a new Django project by running `django-admin startproject notes`. We can then `cd` into the folder and run `python manage.py runserver` to view a cute splash screen at `localhost:8000`, confirming our project works. Next, we can create an app named `core` that contains all the features for our app using `python manage.py`. The flat app architecture is sometimes favored in the community and is used by organizations such as DoorDash. For educational purposes, it’s useful to simplify all the Django boilerplate this way. Let’s add this app to our `INSTALLED_APPS` in `notes/settings.py` by adding an element to the array named  `'core'`.

## Basic Views and Templates
Let’s get a basic “hello world” page running. First, we must consider what URL route we want our page to be displayed on. Then, we must create a *view* function that is invoked when the route is accessed which renders some HTML file. Finally, we must create the HTML template itself. Let’s implement these in reverse order to gain a better understanding.

Let’s first create a splash page for our restaurant. Create a folder named `templates` in our `core` folder. Create a file called `splash.html` in `core/templates` containing:

```python
<h1> My Notes </h1>

{% for note in notes %}
    <p>{{note.title}}</p>
    <p>{{note.body}}</p>
{% endfor %}
```

Feel free to open up the file in your favourite web browser to see how the page looks. Next, let’s define a *view* in `core/views.py`. Add the following code to `view.py`:

```python
def splash(request):
    return render(request, "splash.html", {})
```

Assign a route to this view by opening `notes/urls.py` and importing the view we wrote by adding `from core.views imoprt splash` to the top of the file. Also import the `path` module from Django (so we don’t have to write any regular expressions) using `from django.urls import path`. Finally, we specify the route by appending the route, view and name to the `urlpatterns` list the route specification:

```python
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('', splash, name='splash'),
]
```
  
Finally, if we open our browser to `localhost:8000`, we should see our splash page!

## Defining and Querying Notes
Let’s define a simple notes model in `core/models.py`.

```python

max_length = 200

class Note(models.Model):
    title = models.CharField(max_length=max_length)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
```

The only particularly interesting thing model field about this `Note` model is the `ForeignKey` field. A *foreign key* in a relational database is a link from one model (or /table/) to another. This structures the data in a relational way so that querying each note won’t just return an author id, but the author object itself. This is one of the benefits of using a relationship database: simple querying of multiple models that have relations. 

Note that this foreign key makes a reference to the User object (predefined by Django) and as such we have to import it by adding `from django.contrib.auth.models import User` to the top of the models file. In our views file, let’s query this model as before by importing the model using `from core.models import Note`. Then, let’s get all the instances in the `splash` view by using `Note.objects.all()`. We pass all the notes through to the view as usual. Add this model to our admin page in `admin.py` and create a superuser using `python manage.py createsuperuser`. Create a few notes at `localhost:8000/admin` and make sure they show up on our `splash` view for a quick sanity check.

Our app is now in a similar state of functionality to our previous restaurant app. However, it would be nice to incorporate some sense of identity using accounts. In the following sections, we’ll extend this application to work with user input to create accounts and new notes.

## Working with Form Data
Let’s start by adding a way for us to accept user input to create new notes (without authentication required). To do this, let’s add a form to our splash page in `splash.html` that looks like this:

```python
<form method="POST" action="/">
    {% csrf_token %}
    <p>Create Note</p>
    <input name="title" placeholder="title" />
    <input name="body" placeholder="body" />
    <input type="submit" value="Create"/>
</form>
```

A form in HTML is a way to obtain user input. It operates by defining fields with unique names (that will eventually correspond to variable names in Python) and a submit field that will make either a GET or POST request to a specific route defined using the `method` and `action` parameters.

Note that in this case, we’re making a POST request to the `/` route, which we already use to render a template, accepting a GET request by default. Let’s edit our splash view to handle a possible POST request before rendering a template. We can do this by checking if `request.method` is equal to `“POST”` before handling our associated post logic. In particular, we can retrieve our POST request parameters by using the dictionary `request.POST`. Let’s print out the note title and body as following in our `splash` view:

```python
if request.method == "POST":
    print(request.POST["title"], request.POST["body"])
```

Now that we have the POST parameters, we can create a new note as following:

```python
title = request.POST["title"]
body = request.POST["body"]
Note.objects.create(title=title, body=body, author=request.user)
```

We finally redirect the user after creating a new note. It’s important that we are logged in through the admin page in order to have a logged in user to set the foreign key of each note.

## Logging in and Logging out
We are finally able to accept user input to use Django’s robust authentication system. We’ll want to create a view that handles both rendering the login/signup forms as well as process their inputs. First, we will create a template containing:

```python
<h1>Sign Up</h1>
<form method="POST" action="/signup">
    {% csrf_token %}
    <input name="username" placeholder="username" />
    <input name="email" placeholder="email" />
    <input name="password" placeholder="password" type="password" />
    <input type="submit" />
</form>

<h1>Log In</h1>
<form method="POST" action="/login">
    {% csrf_token %}
    <input name="username" placeholder="username" />
    <input name="password" placeholder="password" type="password" />
    <input type="submit" />
</form>
```

It’s important to notice the `name` attribute on each input as this is what serves as the key to index into the `request.POST` dictionary.

Next, We’ll import the `authenticate` and `login` functions from Django with `from django.contrib.auth import authenticate, login`. Then we’ll create a view named `login_` (notice the underscore due to the `login` function existing) containing:

```python
def login_(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
    return render(request, 'signin.html', {})
```

If the method is `POST`, then we know we need to be logging in the user after a form submission. Thus, we take the variables for `username` and `password` (which is all Django needs to verify a user) and pass them to the `authenticate` function. This function returns a user object if the username/password combination was valid and `None` otherwise. If the username/password was valid, then we actually log the user in and redirect them home. (It’s good practice to display some error back to the user!) If the request is a `GET` method, we just render the HTML template. 

Logout is a very simple view, where we use the `logout` function which we imported from `django.contrib.auth`. We make sure to redirect back to the login page after a successful logout.

```python
def logout_(request):
    logout(request)
    return redirect("/login")
```

We can test these views out (after creating their corresponding URLs) with our admin user!

## Signup and Registration
Now, we need to give users the ability to create their own users, instead of relying on the `createsuperuser` command. To do this, we import the `User` model from Django’s core library with `from django.contrib.auth.models import User` and call `create_user` on the supplied arguments. This is implemented as follows:

```python
def signup_(request):
    if request.method == "POST":
        user = User.objects.create_user(username=request.POST['username'],
									email=request.POST['email'],
									password=request.POST['password'])
        login(request, user)
        return redirect('/')
    return render(request, 'signin.html', {})
```

Essentially, we just create the user and log them in, same as in our `login_` view. Notice that `create_user` actually returns the user for us to login. In fact, all `create` functions from Django’s ORM will return the created object. This is useful for adding the object as a foreign key after instantiation, for example.

And that is all! This is how simple Django authentication with a relational database system can be.