export default {
  openapi: "3.0.0",
  servers: [
    {
      url: "http://localhost:3021/api",
      description: "Docker",
    },
    {
      url: "http://localhost:3020/api",
      description: "Local",
    },
  ],
  info: {
    version: "v1.0",
    title: "real-estate-app",
    description:
      "Node.js + Typescrypt + MongoDB Real Estate API as a proof of concept.",
  },
  paths: {
    "/users/register": {
      post: {
        summary: "Sign Up as new user",
        description: "Register a user",
        operationId: "register",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    name: {
                      type: "string",
                    },
                    first_name: {
                      type: "string",
                    },
                    last_name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    token: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  first_name: {
                    type: "string",
                  },
                  last_name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  first_name: "Jean",
                  last_name: "Calderon",
                  email: "jancaldron@gmail.com",
                  password: "123456",
                },
              },
            },
          },
        },
        tags: ["User"],
      },
    },
    "/users/authenticate": {
      post: {
        summary: "Log in with existing account",
        description: "Login a user, please copy the returned token to the bearer value in 'Authorize 🔓'",
        operationId: "authenticate",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    name: {
                      type: "string",
                    },
                    first_name: {
                      type: "string",
                    },
                    last_name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    token: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  email: "jancaldron@gmail.com",
                  password: "123456",
                },
              },
            },
          },
        },
        tags: ["User"],
      },
    },
    "/apartments": {
      post: {
        summary: "Create a new apartment",
        description: "Create an apartment",
        operationId: "create",
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    apartment: {
                      $ref: "#/components/schemas/apartment",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Not authenticated",
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  price: {
                    type: "number",
                  },
                  address: {
                    type: "string",
                  },
                  city: {
                    type: "string",
                  },
                  country: {
                    type: "string",
                  },
                  rooms: {
                    type: "number",
                  },
                  location: {
                    type: "object",
                    properties: {
                      coordinates: {
                        type: "array",
                        items: {
                          type: "number",
                          description: "[longitude,latitude]",
                        },
                        minItems: 2,
                        maxItems: 2,
                      },
                    },
                  },
                },
                example: {
                  name: "test name",
                  description: "test description",
                  price: 1500,
                  address: "test address",
                  city: "Madrid",
                  country: "Spain",
                  rooms: 2,
                  location: {
                    coordinates: [-69.96230242857646, 18.448300190649707],
                  },
                },
              },
            },
          },
        },
        tags: ["Apartment"],
      },
      get: {
        summary: "Search apartments",
        description: "Search apartments with filters",
        operationId: "search",
        parameters: [
          {
            $ref: "#/components/parameters/city",
          },
          {
            $ref: "#/components/parameters/country",
          },
          {
            $ref: "#/components/parameters/rooms",
          },
          {
            $ref: "#/components/parameters/price",
          },
          {
            $ref: "#/components/parameters/nearest",
          },
          {
            $ref: "#/components/parameters/longitude",
          },
          {
            $ref: "#/components/parameters/latitude",
          },
        ],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    apartments: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/apartment",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: ["Apartment"],
      },
    },
    "/apartments/{apartment_id}": {
      get: {
        summary: "Find an apartment by his ID",
        description: "Find apartment by ID",
        operationId: "search/id",
        parameters: [
          {
            $ref: "#/components/parameters/apartment_id",
          },
        ],
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    apartment: {
                      $ref: "#/components/schemas/apartment",
                    },
                  },
                },
              },
            },
          },
        },
        tags: ["Apartment"],
      },
      put: {
        summary: "Update an apartment by his ID",
        description: "Update an apartment",
        operationId: "update/id",
        parameters: [
          {
            $ref: "#/components/parameters/apartment_id",
          },
        ],
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    apartment: {
                      $ref: "#/components/schemas/apartment",
                    },
                  },
                },
              },
            },
          },
        },
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  price: {
                    type: "number",
                  },
                  address: {
                    type: "string",
                  },
                  city: {
                    type: "string",
                  },
                  country: {
                    type: "string",
                  },
                  rooms: {
                    type: "number",
                  },
                  location: {
                    type: "object",
                    properties: {
                      coordinates: {
                        type: "array",
                        items: {
                          type: "number",
                          description: "[longitude,latitude]",
                        },
                        minItems: 2,
                        maxItems: 2,
                      },
                    },
                  },
                },
                example: {
                  name: "test name",
                  description: "test description",
                  price: 1500,
                  address: "test address",
                  city: "Madrid",
                  country: "Spain",
                  rooms: 2,
                  location: {
                    coordinates: [-69.96230242857646, 18.448300190649707],
                  },
                },
              },
            },
          },
        },
        tags: ["Apartment"],
      },
      delete: {
        summary: "Delete an apartment by his ID",
        description: "Delete an apartment",
        operationId: "deletech/id",
        parameters: [
          {
            $ref: "#/components/parameters/apartment_id",
          },
        ],
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Not authenticated",
          },
        },
        tags: ["Apartment"],
      },
    },
    "/favorites{apartment_id}": {
      post: {
        summary: "Mark an apartment as favorite by his ID",
        description: "Mark an apartment as favorite",
        operationId: "mark/id",
        parameters: [
          {
            $ref: "#/components/parameters/apartment_id",
          },
        ],
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Not authenticated",
          },
        },
        tags: ["Favorite"],
      },
    },
    "/favorites": {
      get: {
        summary: "List all the favorites apartments",
        description: "Returns all the favorites apartments of the current user",
        operationId: "list",
        parameters: [],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    favorites: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/apartment",
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Not authenticated",
          },
        },
        tags: ["Favorite"],
      },
    },
  },
  components: {
    schemas: {
      apartment: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          price: {
            type: "number",
          },
          address: {
            type: "string",
          },
          city: {
            type: "string",
          },
          country: {
            type: "string",
          },
          rooms: {
            type: "number",
          },
          createdBy: {
            type: "string",
          },
          createdAt: {
            type: "string",
            format: "date",
          },
          updatedAt: {
            type: "string",
            format: "date",
          },
          location: {
            type: "object",
            properties: {
              coordinates: {
                type: "array",
                items: {
                  type: "number",
                  description: "[longitude,latitude]",
                },
                minItems: 2,
                maxItems: 2,
              },
            },
          },
        },
      },
    },
    parameters: {
      city: {
        name: "city",
        in: "query",
        style: "form",
        schema: {
          type: "string",
          example: "Madrid",
        },
        description: "City where is located",
      },
      country: {
        name: "country",
        in: "query",
        style: "form",
        schema: {
          type: "string",
          example: "Spain",
        },
        description: "Country where is located",
      },
      rooms: {
        name: "rooms",
        in: "query",
        style: "form",
        schema: {
          type: "number",
        },
        description: "The minimum number of rooms",
      },
      price: {
        name: "price",
        in: "query",
        style: "form",
        schema: {
          type: "number",
        },
        description: "Rental price in euros",
      },
      nearest: {
        name: "nearest",
        in: "query",
        style: "form",
        schema: {
          type: "number",
        },
        description: "Maximum distance in KM",
      },
      longitude: {
        name: "longitude",
        in: "query",
        style: "form",
        schema: {
          type: "number",
        },
        description: "Longitude of reference for nearest distance",
      },
      latitude: {
        name: "latitude",
        in: "query",
        style: "form",
        schema: {
          type: "number",
        },
        description: "Latitude of reference for nearest distance",
      },
      apartment_id: {
        name: "apartment_id",
        in: "path",
        required: true,
        style: "simple",
        schema: {
          type: "string",
          example: "apartment_id",
        },
      },
    },
    securitySchemes: {
      bearer: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  security: [
    {
      bearer: [],
    },
  ],
};
