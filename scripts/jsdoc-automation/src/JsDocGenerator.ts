import { AIService } from './AIService.js';
import { ASTQueueItem } from './types/index.js';
import { JsDocCleaner } from './JsDocCleaner.js';

/**
 * A class that generates JSDoc comments for code snippets and classes.
 */
export class JsDocGenerator {
    /**
     * Constructor for a class that takes in an AIService instance.
     * @param {AIService} aiService - The AIService instance to be injected into the class.
     */
    constructor(public aiService: AIService) {}

    /**
     * Generates a comment based on the given ASTQueueItem.
     * 
     * @param {ASTQueueItem} queueItem - The ASTQueueItem object to generate comment for.
     * @returns {Promise<string>} The generated comment.
     */
    public async generateComment(queueItem: ASTQueueItem): Promise<string> {
        const prompt = this.buildPrompt(queueItem);
        const comment = await this.aiService.generateComment(prompt);
        return JsDocCleaner.clean(comment);
    }

    /**
     * Generates a comment for a class based on the given ASTQueueItem.
     * 
     * @param {ASTQueueItem} queueItem - The ASTQueueItem to generate the comment for.
     * @returns {Promise<string>} The generated comment for the class.
     */
    public async generateClassComment(queueItem: ASTQueueItem): Promise<string> {
        const prompt = this.buildClassPrompt(queueItem);
        const comment = await this.aiService.generateComment(prompt);
        return JsDocCleaner.clean(comment);
    }

    private buildPrompt(queueItem: ASTQueueItem): string {
        return `Generate JSDoc comment for the following code:

        \`\`\`typescript
        ${queueItem.code}
        \`\`\`
        
        Only return the JSDoc comment with proper formatting, not the code itself.
        `;
    }

    private buildClassPrompt(
        queueItem: ASTQueueItem,
    ): string {
        return `Generate JSDoc comment for the following Class:
        Class name: ${queueItem.code.match(/class (\w+)/)?.[1]}

        Only return the JSDoc for the Class itself, not the methods or anything in the class.
        
        Only return the JSDoc comment for the class, no other text or code.

        Example:
        \`\`\`
        /**
         * This is a class that does something. It has a method that does something.
         */
        \`\`\`
        `;
    }
}
