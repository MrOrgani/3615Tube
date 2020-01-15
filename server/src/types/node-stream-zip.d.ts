declare class StreamZip{
    constructor(obj: any)
    public static entries(): any;
    public static entriesCount: any;
}

declare module 'node-stream-zip'{
    export = StreamZip;
}