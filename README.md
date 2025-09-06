Custom Events in JavaScript
What Are Custom Events?

Custom events are events that you define yourself (not the standard ones like click, submit, etc.). You can use them to signal that something has happened in your app.

🔧 Key Functions Involved

new CustomEvent(eventName, options)
Creates a new custom event.

element.dispatchEvent(event)
Dispatches (fires) the event.

element.addEventListener(eventName, handler)
Listens for the custom event.

Real-Life Examples

Toast Notification for Editing User Profile

Suppose you want to notify users with a toast (notification popup) whenever they update their profile information (e.g. name, email, or password).

You can trigger a custom event like show-toast with a success or error message after the form submission, and a centralized toast handler will listen for this event and display the message on screen.
