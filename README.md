All route-specific code is inside of the app folder, in components.

This project is structured in the following way:

- utils contains utility functions, seperated into client and server-friendly execution environments
- prefer server components over client components whenever possible
- useSWR in order to fetch on client side

Server actions are stored alongside the files in which they are used, not in the utilities folder.
Server actions are named according to their function.

Use default classname sets in order to style typography. Modify if needed for effect.
Use Framer motion to animate everything needed. Stick to the following principles:

- Animation duration should not be more than 200ms for interactions to feel immediate
- Animation values should be proportional to the trigger size:
- Actions that are frequent and low in novelty should avoid extraneous animations: 2
- Looping animations should pause when not visible on the screen to offload CPU and GPU usage
- Use scroll-behavior: smooth for navigating to in-page anchors, with an appropriate offset

When fetching data:

- Optimistically update data locally and roll back on server error with feedback
- Inputs should be wrapped with a <form> to submit by pressing Enter
- Inputs should disable spellcheck and autocomplete attributes most of the time
- Toggles should immediately take effect, not require confirmation
- Decorative elements (glows, gradients) should disable pointer-events to not hijack events
- Interactive elements in a vertical or horizontal list should have no dead areas between each element, instead, increase their padding
