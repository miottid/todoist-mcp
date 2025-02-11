# Todoist MCP

Connect this [Model Context Protocol](https://modelcontextprotocol.io/introduction) server to your LLM to interact with Todoist.

### Setup

**Build the server app:**

```
npm install
npm run build
```

**Configure Claude:**

You must install the [Claude](https://claude.ai/) desktop app which supports MCP.

Create a `.env` file in the root of the repo with the following:

```
TODOIST_API_KEY=your_todoist_api_key
```

You can get your Todoist API key from [Todoist > Settings > Integrations](https://todoist.com/app/settings/integrations) > Developer.

Then, in your `claude_desktop_config.json`, add a new MCP server:

```
{
    "mcpServers": {
        "todoist-mcp": {
            "command": "node",
            "args": ["--env-file=/path/to/repo/.env", "/path/to/repo/build/index.js"]
        }
    }
}
```

You can now launch Claude desktop app and ask to update Todoist.
