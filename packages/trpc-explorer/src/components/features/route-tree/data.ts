import type { TreeNode } from ".";

const data: TreeNode[] = [
  {
    id: "a3c5bfa0-d416-4f44-bb43-1eac9fa2a002",
    name: "api",
    isDisabled: false,
    path: ["api"],
    type: "route",
    children: [
      {
        id: "6de1a1f9-8e91-44a2-a0ec-e8c5ec5f0f01",
        name: "auth",
        isDisabled: false,
        path: ["api", "auth"],
        type: "route",
        children: [
          {
            id: "d2b74e15-fda7-4e32-aed0-3f60c9d2153e",
            name: "login",
            isDisabled: false,
            path: ["api", "auth", "login"],
            type: "procedure",
            procedureType: "mutation",
          },
          {
            id: "a4a4fce9-4193-4653-9840-6f4f502fcdd6",
            name: "logout",
            isDisabled: false,
            path: ["api", "auth", "logout"],
            type: "procedure",
            procedureType: "mutation",
          },
          {
            id: "a4a4fce9-4193-4653-9840-6f4f502fcdd7",
            name: "logout",
            isDisabled: false,
            path: ["api", "auth", "logout"],
            type: "route",
            children: [
              {
                id: "a4a4fce9-4193-4653-9840-6f4f502fcdd8",
                name: "superlogout",
                isDisabled: false,
                path: ["api", "auth", "logout", "superlogout"],
                type: "procedure",
                procedureType: "mutation",
              },
            ]
          },
           {
            id: "a4a4fce9-4193-4653-9840-6f4f502fcdd3",
            name: "logout",
            isDisabled: false,
            path: ["api", "auth", "logout"],
            type: "route",
            children: [
              {
                id: "a4a4fce9-4193-4653-9840-6f4f502fcdd4",
                name: "superlogout",
                isDisabled: false,
                path: ["api", "auth", "logout", "superlogout"],
                type: "procedure",
                procedureType: "mutation",
              },
            ]
          },
        ],
      },
      {
        id: "2f46a2db-744d-44b3-a9a3-9e620943844b",
        name: "user",
        isDisabled: false,
        path: ["api", "user"],
        type: "route",
        children: [
          {
            id: "0a2ea43f-56ec-4879-9a62-9b4d51cc9f1b",
            name: "getUserById",
            isDisabled: false,
            path: ["api", "user", "getUserById"],
            type: "procedure",
            procedureType: "query",
          },
          {
            id: "1df62f7f-c665-4381-a778-3e59e22f1c60",
            name: "updateProfile",
            isDisabled: false,
            path: ["api", "user", "updateProfile"],
            type: "procedure",
            procedureType: "mutation",
          },
        ],
      },
      {
        id: "06a8a725-8b0e-4c3a-961e-2d1e0f1cfcba",
        name: "realtime",
        isDisabled: false,
        path: ["api", "realtime"],
        type: "route",
        children: [
          {
            id: "77f85de2-1a04-4f5d-b350-ecae25c207df",
            name: "onMessage",
            isDisabled: false,
            path: ["api", "realtime", "onMessage"],
            type: "procedure",
            procedureType: "subscription",
          },
        ],
      },
    ],
  },
];

export default data;

const flattenedData = {
  "a3c5bfa0-d416-4f44-bb43-1eac9fa2a002": {
    name: "api",
    isDisabled: false,
    type: "route",
    children: [
      "6de1a1f9-8e91-44a2-a0ec-e8c5ec5f0f01",
      "2f46a2db-744d-44b3-a9a3-9e620943844b",
      "06a8a725-8b0e-4c3a-961e-2d1e0f1cfcba",
    ],
  },
  "6de1a1f9-8e91-44a2-a0ec-e8c5ec5f0f01": {
    name: "auth",
    isDisabled: false,
    type: "route",
    children: [
      "d2b74e15-fda7-4e32-aed0-3f60c9d2153e",
      "a4a4fce9-4193-4653-9840-6f4f502fcdd6",
    ],
  },
  "d2b74e15-fda7-4e32-aed0-3f60c9d2153e": {
    name: "login",
    isDisabled: false,
    type: "procedure",
    procedureType: "mutation",
  },
  "a4a4fce9-4193-4653-9840-6f4f502fcdd6": {
    name: "logout",
    isDisabled: false,
    type: "procedure",
    procedureType: "mutation",
  },
  "2f46a2db-744d-44b3-a9a3-9e620943844b": {
    name: "user",
    isDisabled: false,
    type: "route",
    children: [
      "0a2ea43f-56ec-4879-9a62-9b4d51cc9f1b",
      "1df62f7f-c665-4381-a778-3e59e22f1c60",
    ],
  },
  "0a2ea43f-56ec-4879-9a62-9b4d51cc9f1b": {
    name: "getUserById",
    isDisabled: false,
    type: "procedure",
    procedureType: "query",
  },
  "1df62f7f-c665-4381-a778-3e59e22f1c60": {
    name: "updateProfile",
    isDisabled: false,
    type: "procedure",
    procedureType: "mutation",
  },
  "06a8a725-8b0e-4c3a-961e-2d1e0f1cfcba": {
    name: "realtime",
    isDisabled: false,
    type: "route",
    children: ["77f85de2-1a04-4f5d-b350-ecae25c207df"],
  },
  "77f85de2-1a04-4f5d-b350-ecae25c207df": {
    name: "onMessage",
    isDisabled: false,
    type: "procedure",
    procedureType: "subscription",
  },
};
