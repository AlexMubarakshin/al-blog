export function makeActionCreator(type: string, ...argNames: any[]) {
    return (...args: any[]) => {
        let action: any = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}

interface IRequestType {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
}


export function createRequestTypes(base: string): IRequestType {
    return {
        REQUEST: `${base}_REQUEST`,
        SUCCESS: `${base}_SUCCESS`,
        FAILURE: `${base}_FAILURE`
    } as IRequestType;
}
