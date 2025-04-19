import type { TodoistApi } from '@doist/todoist-api-typescript'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const nonEmptyString = z.string().transform((str) => (str.trim() === '' ? undefined : str))

export function registerAddTask(server: McpServer, api: TodoistApi) {
    server.tool(
        'add-task',
        'Add a task to Todoist',
        {
            content: z.string(),
            description: nonEmptyString.optional(),
            projectId: nonEmptyString.optional().describe('The ID of a project to add the task to'),
            assigneeId: nonEmptyString
                .optional()
                .describe('The ID of a project collaborator to assign the task to'),
            priority: z
                .number()
                .min(1)
                .max(4)
                .optional()
                .describe('Task priority from 1 (normal) to 4 (urgent)'),
            labels: z.array(z.string()).optional(),
            parentId: nonEmptyString.optional().describe('The ID of a parent task'),
            deadlineDate: nonEmptyString
                .optional()
                .describe("Specific date in YYYY-MM-DD format relative to user's timezone."),
            deadlineLang: nonEmptyString
                .optional()
                .describe('2-letter code specifying language of deadline.'),
        },
        async ({
            content,
            description,
            projectId,
            parentId,
            assigneeId,
            priority,
            labels,
            deadlineDate,
            deadlineLang,
        }) => {
            const task = await api.addTask({
                content,
                description,
                projectId,
                parentId,
                assigneeId,
                priority,
                labels,
                deadlineDate,
                deadlineLang,
            })
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(task, null, 2),
                    },
                ],
            }
        },
    )
}
