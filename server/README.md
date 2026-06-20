# Tony's Workbench Server

This folder contains the Node.js server for Tony's Workbench.

The server exposes same-origin `/api/...` routes for the Angular client, validates browser requests, shapes browser-facing responses, maps safe errors, and owns direct SQL Server-backed data access. Java services are no longer the default API or data-access path.

Use Java services only when a feature needs a durable domain service, transaction boundary, persistence workflow, event consumer/producer, or background job that belongs outside the web/API edge.

Keep SQL out of Express route handlers. Use this flow instead:

```text
routes -> handlers/use cases -> repositories/query modules -> SQL Server
```

Useful commands:

```bash
npm run dev
npm run dev:server
npm run build:server
npm --workspace server run dev
npm --workspace server run test
npm --workspace server run check
npm --workspace server run build
```

Use `npm run dev` from the repository root when you want the Angular client and Node.js server on one local URL. It starts Angular on an internal dev port, waits for that port, then starts the Node.js server on `http://localhost:8080/`.

After `npm run build`, use `npm start` from the repository root to run the compiled Node.js server on `http://localhost:8080/` and serve the built Angular app from `client/dist/`.
