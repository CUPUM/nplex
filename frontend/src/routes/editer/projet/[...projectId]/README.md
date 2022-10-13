# Project editing form

The form used to submit and edit Nplex projects is organized in form groups. For consistency, each field must implement:

1- A `save()` method.
2- A `reset()` method.
3- A `checkDirtiness()` method.
4- A valid HTML input with a name attribute for compatibility with `formactions` and the use of `formData`.
