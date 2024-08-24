# V/H/S -> Very Hip/Hot/Healthy Search

We old folks know about Blockbuster and Hollywood videos.....

## Development server

Run `npm run start:dev` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build / Publishing

Run `npm run build` or `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Highlight(s)
1. Inspecting the API, it appears there was no way to obtain all movie information in one request. This inspired the `SearchService` to the wrapping of the Movie API's endpoints for enriching the initial query with full movie details.
    - After figuring out and some refactoring, it made the `app-component` pretty minimal
    - I think the Graph API may be better suited to reduce the chattiness going on. I almost ran this path, but have not worked with it before so did not want to go down an unknown path.
2. SVG's are the best. They're beautiful, easy to work with, and manipulate with CSS.


## Pleased
- I did not know prior to this project that there was an ISO 8601 representation for duration. I'm pleased with the `DurationPipe` to handle making this more human readable. 
- Proud of the static background loading indication... It just feels good instead of some kind of spinner

## More time please
- Likely rework to use GraphAPI to reduce the number of network requests currently needed with the REST approach
- "Pre-recording" features where there would be groups of movies by a theme. When a user clicks, they are presented similar to the search but only for those movies. Think a "Arnold" pre-recording, where it's a handful of Arnold Schwarzenegger movies, like Predator, The Running Man, Terminator, etc
- With location permission, display movies popular in your country
