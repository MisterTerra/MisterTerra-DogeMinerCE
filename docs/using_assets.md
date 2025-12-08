### Using assets in Dogeminer CE

### How:

All assets must be registered in /play/js/assets/asset-loaders.js by creating asset loaders. Assets can be an image, a video or an audio file.

There are three types of loaders:
1. Asset loader  
These loaders only contain a single file
2. Bundle loader  
A bundle loader contains a set of related assets
3. Level group loader 
A level group is a set of bundles, where each bundle represents all assets used for a specific planet.  

#### The loader interface:

Bundle loaders and asset loaders provide two functions:  
- preload()  
By calling this function, all assets tied to this loader will be sent through a preloading step, which (as well as possible) garuantees that  assets are loaded before returning.  
- get()  
This function returns the tied assets. In the case of a level loader, a level name must be provided (e.g. 'earth', 'mars' etc...).

Additionally, level loaders provide an additional two functions:  
- getAll
- getCombined


### Why:

All assets need to be explicitly imported for Vite to statically determine their usage, otherwise they won't be included during build-time. We encourage the use of loaders since they provide a common interface for interacting with assets, as well as garuanteeing their inclusion in the build.