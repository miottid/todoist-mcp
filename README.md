# Todoist MCP

Connect this [Model Context Protocol](https://modelcontextprotocol.io/introduction) server to your LLM to interact with Todoist.

It supports all the APIs available from the [Todoist TypeScript Client](https://doist.github.io/todoist-api-typescript/api/classes/TodoistApi/).

### Setup

**Build the server app:**

```
npm install
npm run build
```

**Configure Claude:**

You must install the [Claude](https://claude.ai/) desktop app which supports MCP.

You can get your Todoist API key from [Todoist > Settings > Integrations > Developer](https://app.todoist.com/app/settings/integrations/developer).

Then, in your `claude_desktop_config.json`, add a new MCP server:

```
{
    "mcpServers": {
        "todoist-mcp": {
            "command": "node",
            "args": ["/path/to/repo/build/index.js"],
            "env": {
                "TODOIST_API_KEY": "your_todoist_api_key"
            }
        }
    }
}
```

You can now launch Claude desktop app and ask to update Todoist.

## Distribution

### Smithery

[![smithery badge](https://smithery.ai/badge/@miottid/todoist-mcp)](https://smithery.ai/server/@miottid/todoist-mcp)

Install Todoist MCP on Claude Desktop using [Smithery](https://smithery.ai/server/@miottid/todoist-mcp):

```bash
npx -y @smithery/cli install @miottid/todoist-mcp --client claude
```

### Glama

<a href="https://glama.ai/mcp/servers/2010u29g1w">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/2010u29g1w/badge" alt="Todoist MCP server" />
</a>
