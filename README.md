# jvertswag

To install dependencies:

```bash
bun install
```

To convert json file to swagger schema:

```bash
bun run start -f [path to json file] [-g] [gap value]
```

call an api to swagger schema:

```bash
bun run start -X [method] -R [api root url] -P [api path] -p [params] -q [query] -H [headers] [-g] [gap value]
```

To build executable:

```bash
bun build ./src/index.ts --compile --outfile ./dist/jvertswag
```




