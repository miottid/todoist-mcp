import type { TodoistApi } from '@doist/todoist-api-typescript'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export function registerUpdateLabel(server: McpServer, api: TodoistApi) {
    server.tool(
        'update-label',
        'Update a label in Todoist',
        {
            labelId: z.string(),
            name: z.string(),
            color: z
                .enum([
                    'berry_red',
                    'light_blue',
                    'red',
                    'blue',
                    'orange',
                    'grape',
                    'yellow',
                    'violet',
                    'olive_green',
                    'lavender',
                    'lime_green',
                    'magenta',
                    'green',
                    'salmon',
                    'mint_green',
                    'charcoal',
                    'teal',
                    'grey',
                    'sky_blue',
                ])
                .optional(),
            isFavorite: z.boolean().optional(),
            order: z.number().optional(),
        },
        async ({ labelId, name, color, isFavorite, order }) => {
            const success = await api.updateLabel(labelId, { name, color, isFavorite, order })
            return {
                content: [
                    {
                        type: 'text',
                        text: success
                            ? `Label ${labelId} updated to ${name}`
                            : `Failed to update label ${labelId} to ${name}`,
                    },
                ],
            }
        },
    )
}
