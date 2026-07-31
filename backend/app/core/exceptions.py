class UserAlreadyExistsError(Exception):
    """Raised when a user with the given email or username already exists."""


class InvalidCredentialsError(Exception):
    """Raised when login credentials are invalid."""

class InvalidFileTypeError(Exception):
    """Raised when an uploaded file type is not supported."""


class FileTooLargeError(Exception):
    """Raised when an uploaded file exceeds the maximum allowed size."""