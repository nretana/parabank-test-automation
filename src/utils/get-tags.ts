import { TAGS } from '@constants/tags.constant';

export const getTags = () => {
    const result = TAGS.filter(tag => tag === process.env.TEST_TYPE)
    return result;
}