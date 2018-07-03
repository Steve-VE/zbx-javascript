# zbx-javascript

Some Javascript functions and class I share between my differents projects. Feel free to use it too !

## Getting Started

### Prerequisites

You need [`npm`](https://www.npmjs.com/get-npm) to install it.

### Installing

Just get the package

```
npm install -S zbx-javascript
```

You'll get the files into `node_modules/zbx-javascript`.

### Functions

#### Mathematical functions
```javascript
radians( value ) : return the value from degrees to radians

constrain( value, min, max ) : return the value, but never lower than min and never higher than max

random( min, max, integer? ) : return a random number between the min and max. If integer is true, the returned number will be a int
```

#### User functions
```javascript
defineNavigator() : return a string (Edge, Chrome or Firefox) or undefined
```
### Class
#### HaloContainer
Make moving some halo in the background of a HTMLElement.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **[Steve Van Essche](https://github.com/Steve-VE)**



