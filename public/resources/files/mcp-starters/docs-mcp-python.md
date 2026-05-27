# Docs MCP (Python) — Starter

```python
from mcp.server import Server

app = Server("orbitx-docs")
ALLOWED = Path("runbooks").resolve()

@app.tool()
async def get_runbook(slug: str) -> str:
    path = (ALLOWED / f"{slug}.md").resolve()
    if not str(path).startswith(str(ALLOWED)):
        raise ValueError("Invalid path")
    return path.read_text(encoding="utf-8")
```

## Checklist
- [ ] Bind localhost in dev
- [ ] Scoped API token per server
- [ ] Log tool name + latency
