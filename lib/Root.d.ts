import React from "react";
interface State {
    visible: boolean;
}
export declare class Root extends React.Component<{}, State> {
    state: {
        visible: boolean;
    };
    private remount;
    componentWillMount(): void;
    render(): JSX.Element;
}
export {};
