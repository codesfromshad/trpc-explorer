![tRPC Explorer Banner](https://github.com/codesfromshad/trpc-explorer/assets/92628452/59a17b02-c5bd-4c2c-b0e7-dc744214df07)

# tRPC Explorer 🔧

**tRPC Explorer** is a lightweight tool for manually testing your tRPC backend. It provides an intuitive interface for interacting with your tRPC endpoints, making development and debugging easier.

## Features

- 🌟 **Intuitive Interface:** User-friendly interface for testing tRPC endpoints.
- 🚀 **Fast and Lightweight:** Optimized for performance and ease of use.
- 🛠️ **Customizable:** Easily configure and extend to fit your development needs.
- 🔄 **Real-time Updates:** Instant feedback on your tRPC requests and responses.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

You can install tRPC Explorer via npm:

```bash
npm install trpc-explorer
```

Or with yarn:

```bash
yarn add trpc-explorer
```

### Usage

To use tRPC Explorer in your project, follow these steps:

1. **Import and Initialize:**

    ```javascript
    import { createTRPCExplorer } from 'trpc-explorer';

    const explorer = createTRPCExplorer({
      url: 'http://localhost:3000/trpc',
    });

    explorer.init();
    ```

2. **Open in Browser:**

    Once initialized, open `http://localhost:3000/trpc-explorer` in your browser to start testing your tRPC endpoints.

## Configuration

tRPC Explorer supports various configuration options to customize its behavior. You can pass these options when initializing:

```javascript
const explorer = createTRPCExplorer({
  url: 'http://localhost:3000/trpc',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN',
  },
  theme: 'dark', // or 'light'
});

explorer.init();
```

### Available Options

- `url`: The URL of your tRPC backend.
- `headers`: Additional headers to include in your requests.
- `theme`: UI theme, either 'light' or 'dark'.

## Contributing

We welcome contributions to improve tRPC Explorer! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [tRPC](https://trpc.io) - The fantastic framework that makes this tool possible.

---

Enjoy using tRPC Explorer! 🚀

---

Feel free to customize this README to fit any additional features or specific details about your project.
