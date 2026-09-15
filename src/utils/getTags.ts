import { TAGS } from 'src/constants/tags.constant';


export const getTags = () => {
    console.log("TEST_TYPE", process.env.TEST_TYPE);
    const result = TAGS.filter(tag => tag === process.env.TEST_TYPE)
    console.log('LIST OF TAGS!', result);
    return result;
}