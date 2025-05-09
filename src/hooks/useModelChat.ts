export const useModelChat = (appId: string) => {
    const source = new EventSource('https://open.bigmodel.cn/api/llm-application/open/model-api/1919369230273437696/sse-invoke');
    source.onmessage = (event) => {
        handleMessage(event);
    }

    const handleMessage = (event: any) => {
        console.log('New message:', event.data);
    }

    return {
        handleMessage
    }
}