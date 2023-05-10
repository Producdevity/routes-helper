
Helper function for building URLs in a React TypeScript application.

This module exports two main components: `ROUTE_PATHS` and `buildUrl`. `ROUTE_PATHS` is an object containing route templates with placeholders for parameters, while `buildUrl` is a function that takes a route template and optionally an object with parameters, and returns a complete URL with the parameters inserted.

The `route` function is a simple utility to prepend a base URL to a given path. It is used internally in this module and not exported.

The `RouteOptionsMap` type is a helper type that defines the structure of the route parameters object for each route in the application.

## Usage example

```typescript
import { ROUTE_PATHS, buildUrl } from './pathBuilder';

// To get a URL template without parameters
const invoiceUrlTemplate = ROUTE_PATHS.invoices;

// To get a complete URL with parameters
const invoiceUrl = buildUrl('invoices', {
  id: '123',
  product: 'product1',
  schadeclaimnummer: 'SCN001',
});
```

### route

- **Parameter**: `{string} path` - The path to append to the base URL.
- **Returns**: `{string}` The complete URL with the base URL prepended.

### RouteOptionsMap

- **Type**: `{Object}` A mapping of route names to their respective parameter objects.

### ROUTE_PATHS

- **Type**: `{Record<keyof RouteOptionsMap, string>}` An object containing the route templates with placeholders for parameters.

### buildUrl

- **Type Parameter**: `T extends keyof RouteOptionsMap` - A generic type that represents a key from the RouteOptionsMap.
- **Parameter**: `{T} baseUrl` - The key of the route template from `ROUTE_PATHS`.
- **Parameter**: `{Object} params` - An optional object containing the route parameters.
  - **Property**: `{Record<string, string | number>} params.pathParams` - An optional object containing the path parameters.
  - **Property**: `{Object} params.options` - An optional object containing additional options.
- **Returns**: `{string}` The complete URL with the parameters inserted.

By utilizing this helper function, you can maintain a clean and well-organized approach to managing URLs and route parameters in your React TypeScript application.
