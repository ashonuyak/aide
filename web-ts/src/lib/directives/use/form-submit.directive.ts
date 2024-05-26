export function formSubmit(node: HTMLFormElement, action: Function, actionData: any) {
    node.addEventListener('submit', (event) => {
        event.preventDefault();

        action(actionData);
    })
}