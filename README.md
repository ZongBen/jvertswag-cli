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
example:

```bash
bun run start -R http://localhost:80 -P /api/book/{bookId} -H Content-Type=application/json -X PUT -c "\*" -d %reqBodyPath% -p bookId=1
```

To build executable:

```bash
bun build ./src/index.ts --compile --outfile ./dist/jvertswag
```




