import { Reporter, TestCase, TestResult } from '@playwright/test/reporter'

class TagFilterRepoter implements Reporter {
    constructor(private opts: { currentTag: string }){
        
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        const filteredTags = test.tags.filter(tag => tag === this.opts.currentTag);
        Object.defineProperty(test, 'tags', {
            value: filteredTags,
            writable: true,
            configurable: true,
        });
    }
}

export default TagFilterRepoter;